import { getOrganizationByDomain } from '@/services/organization';
import { NextRequest, NextResponse } from 'next/server';
export async function GET(request: NextRequest) {
	try {
		const domain = await getOrganizationByDomain(request.nextUrl.hostname);

		return NextResponse.json(domain, { status: 200 });
	} catch (err) {
		return NextResponse.json({ err }, { status: 500 });
	}
}
