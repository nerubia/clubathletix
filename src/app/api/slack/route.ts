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
        }
    }
    const thread_ts = message.ts;
    const action = actions.pop();
    if (action) {
        console.log(JSON.stringify(user, null, 2));
        const answer = action.value;
        const names = user.name.split('_').join(' / ');
        const slack_user = await getAthleteViaSlack(user.id);

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
        console.log(JSON.stringify(slack_user, null, 2));

        return NextResponse.json({slack_user})
    }

    return NextResponse.json({
        message: "Slack integration is not available yet.",
    })
}