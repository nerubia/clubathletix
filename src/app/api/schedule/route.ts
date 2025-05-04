import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'
import { URLSearchParams } from 'url';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)


export async function GET(request: NextRequest) {
    const params = new URLSearchParams(request.nextUrl.search)
    const organization_id = Number(params.get('organization_id'))
    let { data: schedules, error } = await supabase
    .from('schedules')
    .select(`
        name,
        locations (id, name, street_1, street_2, city_town, postal_zip_code, state_province),
        programs (id, name, description, min_age, max_age, coaches),
        starts_at, ends_at, mondays, tuesdays, wednesdays, thursdays, fridays, saturdays, sundays, is_active`)
    .eq('organization_id', organization_id)
    try {
        return NextResponse.json(schedules, { status: 200 });
    } catch (err) {
        return NextResponse.json({ err, error }, { status: 500 });
    }
}