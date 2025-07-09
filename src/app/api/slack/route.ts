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
        const answer = action.value;
        const timestamp = new Date(action.action_ts * 1000);
        await fetch(response_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: `Thanks for your answer, @${user.username}!`,
                response_type: 'in_channel',
                replace_original: "false",
                thread_ts, 
            }),
        });
        console.log(JSON.stringify({
            user: user.name,
            user_id: user.id,
            answer,
            timestamp,
        }, null, 2));
    }

    return NextResponse.json({
        message: "Slack integration is not available yet.",
    })
}