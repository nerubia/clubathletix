import { NextRequest, NextResponse } from 'next/server';
import { URLSearchParams } from 'url';
import { getOrganizationTestimonials } from './service';

export async function GET(request: NextRequest) {
    const params = new URLSearchParams(request.nextUrl.search)
    const organization = params.get('organization')
    if (!organization) return NextResponse.json({ message: 'Organization is required' }, { status: 400 });
    try {
        const records = await getOrganizationTestimonials(organization)
        return NextResponse.json({organization, records}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}