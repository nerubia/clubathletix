import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'
import { URLSearchParams } from 'url';
import { filterByOrganization } from './service';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)


export async function GET(request: NextRequest) {
    const params = new URLSearchParams(request.nextUrl.search)
    const organization = params.get('organization')
    if (!organization) return NextResponse.json({ message: 'Organization is required' }, { status: 400 });
    try {
        const records = await filterByOrganization(organization)
        return NextResponse.json({organization, records}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}