import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.formData()
    console.log(JSON.stringify(Object.fromEntries(data), null, 2));

    return NextResponse.json({
        message: "Slack integration is not available yet.",
    })
}