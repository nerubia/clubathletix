import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.formData()
    
    console.log(data.get('user'));
    console.log(data.get('actions'));

    return NextResponse.json({
        message: "Slack integration is not available yet.",
    })
}