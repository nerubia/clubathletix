import { getTeams } from "@/services/teams";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const params = req.nextUrl.pathname;
    const records = await getTeams();
    return NextResponse.json(
        records,
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );
}
