import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.formData()
    const { payload } = Object.fromEntries(data);
    console.log(JSON.stringify(payload, null, 2));

    return NextResponse.json({
        message: "Slack integration is not available yet.",
    })
}