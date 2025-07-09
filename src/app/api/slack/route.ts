import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.formData()
    const { payload } = Object.fromEntries(data);
    const {
        user,
        actions,
        ...rest
    } = JSON.parse(payload as unknown as string) as unknown as {
        user: {
            id: string;
            username: string;
            name: string;
        },
        actions: {
            action_id: string;
            value: string;
            action_ts: number;
        }[]
    }
    console.log(rest)
    const action = actions.pop();
    if (action) {
        const answer = action.value;
        const timestamp = new Date(action.action_ts * 1000);
        console.log(JSON.stringify({
            user: user.name,
            answer,
            timestamp,
        }, null, 2));
    }

    return NextResponse.json({
        message: "Slack integration is not available yet.",
    })
}