import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Simulate fetching competitions data
        const competitions = [
            { id: 1, name: 'Competition A', date: '2023-10-01' },
            { id: 2, name: 'Competition B', date: '2023-11-15' },
        ];

        return NextResponse.json(competitions, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch competitions' }, { status: 500 });
    }
}