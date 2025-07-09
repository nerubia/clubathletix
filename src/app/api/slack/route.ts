import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.formData()
    const { payload } = Object.fromEntries(data);
    const {
        user,
        actions,
    } = JSON.parse(payload as unknown as string) as unknown as {
        user: {
            id: string;
            username: string;
            name: string;
        },
        actions: {
            action_id: string;
            text: {
                value: string;
            };
        }[]
    }
    console.log(JSON.stringify({
        user: user.name,
        answer: actions.pop()?.text?.value || "No answer provided",
    }, null, 2));

    return NextResponse.json({
        message: "Slack integration is not available yet.",
    })
}