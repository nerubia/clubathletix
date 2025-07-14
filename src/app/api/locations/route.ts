import { getLocations } from "@/services/locations";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const params = req.nextUrl.pathname;
    const id = params.split('/').pop() || '';
    const records = await getLocations();
    return NextResponse.json(
        records,
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );
}
