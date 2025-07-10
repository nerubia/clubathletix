import { getAthleteViaSlack } from "@/services/athletes";
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
    }
    const thread_ts = message.ts;
    const action = actions.pop();
    if (action) {
        const answer = action.value;
        const names = user.name.split('_').join(' / ');
        const athletes = await getAthleteViaSlack(user.id);
        const [from, to] = channel.name.split('-').map(s => Number(s.trim())).filter(Boolean);

        const applicablePlayers = athletes?.filter(athlete => {
            const [year] = athlete.date_of_birth.split('-').map(Number);
            return year >= from && year <= to;
        });
        console.log(JSON.stringify({applicablePlayers}, null, 2));
 
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
        console.log(JSON.stringify(rest, null, 2));

        return NextResponse.json(applicablePlayers);
    }

    return NextResponse.json({
        message: "Slack integration is not available yet.",
    })
}