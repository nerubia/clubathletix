import { getAthleteViaEmail, getAthleteViaSlack } from "@/services/athletes";
import { getCustomerByEmail } from "@/services/customer";
import { getSlackChannels, getSlackUserProfile } from "@/services/schedule";
import { a, tr } from "framer-motion/client";
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
    const replyInChannel = channels.find(c => c.id === channel_id || c.name === channel.name);
    const slackUser = await getSlackUserProfile(user.id);
    if (action) {
        const answer = action.value;
        const { user: { profile } } = slackUser || { user: { profile: { email: '' } }};
        if (profile.email && replyInChannel) {
            const customer = await getAthleteViaEmail(profile.email)
            const { athletes, email, phone, full_name, ...record } = customer || { athletes: [] };
            const [from, to] = replyInChannel.name.split('-').map(s => Number(s.trim())).filter(Boolean);
            let applicablePlayers: string[] = (!from ? athletes.map(athlete => athlete.full_name.split(',').pop()?.trim() || '') : []).filter(Boolean);
            if (from && to) {
                applicablePlayers = athletes.filter(athlete => {
                    const [year] = athlete.date_of_birth.split('-').map(Number);
                    return year >= from && year <= to;
                }).map(athlete => athlete.full_name.split(',').pop()?.trim() || '');
            }

            if (applicablePlayers && applicablePlayers.length) {
                await fetch(response_url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        text: applicablePlayers.map(name => `:${answer === 'yes' ? 'white_check_mark' : 'x'}: *${name}*`).join('\n'),
                        response_type: 'in_channel',
                        replace_original: false,
                        thread_ts, 
                        mrkdwn: true,
                        name: "heart"
                    }),
                });
            }
            return NextResponse.json({slackUser})
        }
        return NextResponse.json({ message: "No email found in Slack user profile." });
    }
        // const athletes = await getCustomerByEmail(email);
        // console.log(JSON.stringify({athletes}, null, 2))

        // const applicablePlayers = athletes?.filter(athlete => {
        //     const [year] = athlete.date_of_birth.split('-').map(Number);
        //     return year >= from && year <= to;
        // });
 
        // console.log(JSON.stringify({
        //     channel_id,
        //     from,
        //     to,
        //     user,
        //     applicablePlayers,
        //     channels,
        //     rest
        // }, null, 2));
        // await fetch(response_url, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         text: `:${answer === 'yes' ? 'white_check_mark' : 'x'}: *${names}*`,
        //         response_type: 'in_channel',
        //         replace_original: false,
        //         thread_ts, 
        //         mrkdwn: true,
        //         name: "heart"
        //     }),
        // });

        // return NextResponse.json(applicablePlayers);
    

    return NextResponse.json({
        message: "Slack integration is not available yet.",
    })
}