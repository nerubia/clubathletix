import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    return NextResponse.json({
        message: "Slack integration is not available yet.",
    })
}