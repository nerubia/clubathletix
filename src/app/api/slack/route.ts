import { getAthleteViaSlack } from "@/services/athletes";
import { getSlackChannels, getSlackUserProfile } from "@/services/schedule";
import { tr } from "framer-motion/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.formData()
    const { payload } = Object.fromEntries(data);
    const {
        user,
        actions,
        response_url,
        message,
        channel,
        container: {
            channel_id
        },
        ...rest
    } = JSON.parse(payload as unknown as string) as unknown as {
        response_url: string;
        user: {
            id: string;
            username: string;
            name: string;
        },
        actions: {
            action_id: string;
            value: string;
            action_ts: number;
        }[],
        message: {
            ts: number;
        },
        channel: {
            id: string;
            name: string;
        },
        container: {
            channel_id: string;
        },
    }
    const thread_ts = message.ts;
    const action = actions.pop();
    const channels = await getSlackChannels();

    if (action) {
        const answer = action.value;
        const slackUser = await getSlackUserProfile(user.id);
        console.log(JSON.stringify({slackUser}, null, 2))
        const names = user.name.split('_').join(' / ');
        const athletes = await getAthleteViaSlack(user.id);
        const [from, to] = channel.name.split('-').map(s => Number(s.trim())).filter(Boolean);

        const applicablePlayers = athletes?.filter(athlete => {
            const [year] = athlete.date_of_birth.split('-').map(Number);
            return year >= from && year <= to;
        });
 
        console.log(JSON.stringify({
            channel_id,
            from,
            to,
            user,
            applicablePlayers,
            channels,
            rest
        }, null, 2));
        await fetch(response_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: `:${answer === 'yes' ? 'white_check_mark' : 'x'}: *${names}*`,
                response_type: 'in_channel',
                replace_original: false,
                thread_ts, 
                mrkdwn: true,
                name: "heart"
            }),
        });

        return NextResponse.json(applicablePlayers);
    }

    return NextResponse.json({
        message: "Slack integration is not available yet.",
    })
}