import { getPrograms } from '@/services/program';
import { NextRequest, NextResponse } from 'next/server';
import { URLSearchParams } from 'url';

export async function GET(request: NextRequest) {
	const params = Object.fromEntries(new URLSearchParams(request.nextUrl.search));

	try {
		let { data: schedules, error } = await getPrograms(params.organization_id);

		return NextResponse.json(
			(schedules || []).sort((a, b) => {
				if (a.starts_at < b.starts_at) return -1;
				if (a.starts_at > b.starts_at) return 1;
				return 0;
			}),
			{ status: 200 }
		);
	} catch (err) {
		return NextResponse.json({ err }, { status: 500 });
	}
}
