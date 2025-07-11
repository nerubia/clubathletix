import { NextRequest, NextResponse } from 'next/server';
import { URLSearchParams } from 'url';
import { getSchedule } from '@/services/schedule';
import { addDays } from '@/utils/calendar/date-helpers';
import { formatDate } from '@/utils/calendar/date-formatter';
import { getSlackEventNotification } from '@/utils/http/slack';
import { submitSlackRequest } from '@/services/http';

export async function GET(request: NextRequest) {
    const params = Object.fromEntries(new URLSearchParams(request.nextUrl.search))

    try {
        let schedules: any[] | undefined = await getSchedule({
            ...params,
            to: params.to || formatDate(addDays(new Date(), 60)),
        });

        return NextResponse.json((schedules || []).sort((a, b) => {
            if  (a.isOnce || b.isOnce) return -1
            if (a.date < b.date) return -1
            if (a.date > b.date) return 1
            return 0
        }), { status: 200 });
    } catch (err) {
        return NextResponse.json({ err }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    const params = await request.json();
    // C095BDNLRD2
    const response = await submitSlackRequest('conversations.list', {name: params.name.toLowerCase().replace(/\s+/g, '-'), is_private: false})
    const conversations = response.channels as { name: string; id: string }[];
    const conversation = conversations.find(conv => conv.name === params.name.toLowerCase().replace(/\s+/g, '-'))
    if (conversation) {
        const { payload } = getSlackEventNotification(params)
        const message = await submitSlackRequest('chat.postMessage', {
            ...payload,
            channel: conversation.id,
        });
        return NextResponse.json({
            conversation,
            message,
        });
    }
    
    return NextResponse.json({
        message: `Channel ${params.name} not found`,
    
    }, {
        status: 404,
        statusText: `Channel ${params.name} not found`,
    });
}

export async function POST(request: NextRequest) {
    const {
        event_type,
        name,
        opponent,
        time,
        location,
        coaches,
        years,
    } = await request.json();

    const params = {
        event_type,
        name,
        opponent,
        time,
        location,
        coaches,
        years,
    } as {
        event_type: 'training' | 'game';
        name: string;
        opponent?: {
            name: string;
            logo_url?: string;
        };
        time: string;
        location: string;
        coaches: string;
        years: number[];
    };
    const slackChannels = await fetch('https://slack.com/api/conversations.list', {
        headers: {
            authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
        }
    })
    if (!slackChannels.ok) {
        return NextResponse.json(
            slackChannels, {
                status: slackChannels.status,
                statusText: slackChannels.statusText,
            }
        )
    }

    const {channels} = await slackChannels.json();

    const {
        payload,
    } = getSlackEventNotification(params)

    const applicableChannels: {
        id: string;
        name: string;
    }[] = []
    for (const channel of channels as { name: string; id: string }[]) {
        if (channel.name === 'nothing-here') {
            applicableChannels.push({
                id: channel.id,
                name: channel.name,
            })
            continue;
        }
        for (const y of channel.name.split('-').map(s => Number(s.trim())).filter(Boolean)) {
            if (params.years.includes(y) && applicableChannels.filter(a => a.name === channel.name).length === 0) {
                applicableChannels.push({
                    id: channel.id,
                    name: channel.name,
                })
            }
        }
    }
    const q = applicableChannels.map(c => {
        const conf = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
            },
            body: JSON.stringify({
                ...payload,
                channel: c.id,
            }, null, 2),
        }
        return fetch('https://slack.com/api/chat.postMessage', conf)
    })

    const results = await Promise.all(q);
    console.log('Results:', results.map(r => r.ok ? 'OK' : r.statusText));
    
    return NextResponse.json(
        { applicableChannels, params, payload }
    )       
}