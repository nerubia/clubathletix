import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js'
import { URLSearchParams } from 'url';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)


export async function GET(request: NextRequest) {
    const params = new URLSearchParams(request.nextUrl.search)
    const email = params.get('email')
    let { data: customers, error } = await supabase
    .from('customers')
    .select('id, full_name, street_1, street_2, city_town, postal_zip_code, country, state_province')
    .eq('email', email)
    try {
        const customer = customers?.pop()
        let full_name: string[] = []
        if (customer?.full_name) {
            full_name = customer.full_name.split(',').map((w: string) => w.trim())
        }
        return NextResponse.json({email, customer: {
            ...customer,
            email,
            last_name: full_name.pop(),
            first_name: full_name.pop()
        }}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const {id, fname, lname, street_1, street_2, city_town, state_province, postal_zip_code, email } = await request.json()
    const full_name = [lname, fname].join(', ');
    let { data: customers } = await supabase
    .from('customers')
    .update({
        street_1,
        street_2, 
        city_town,
        state_province,
        postal_zip_code,
        full_name,
        email,
    }).eq('id', id)
    try {
        return NextResponse.json({id, 
            street_1, street_2, city_town, state_province, postal_zip_code,
            full_name , customers}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}