import { getAthleteUrl } from '@/services/athletes';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const params = req.nextUrl.pathname;
	const id = params.split('/').pop() || '';

	const data = await getAthleteUrl(id);

	return NextResponse.json(data, {
		headers: { 'Content-Type': 'application/json' },
	});
}
