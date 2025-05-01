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
    try {
        const {phone, cfname, clname, fname, date_of_birth, lname, street_1, street_2, city_town, state_province, postal_zip_code, email, signed_agreement, media_release, country } = await request.json()

        if (!phone || !email || !cfname || !clname || !lname || !date_of_birth || !signed_agreement || !country)
            return NextResponse.json({ message: 'Required fields must be filled' }, { status: 400 });

        const full_name = [lname, fname].join(', ');
        let { data: customers, error } = await supabase
            .from('customers')
            .upsert({
                street_1,
                street_2, 
                city_town,
                state_province,
                postal_zip_code,
                country,
                full_name,
                email,
                phone,
            }, {
                onConflict: 'email',
                ignoreDuplicates: false
            }).select('id')
        if (customers?.[0]?.id) {
            const full_name = [clname, cfname].join(', ')
            let { data: existing } = await supabase
                .from('athletes')
                .select('id, full_name, date_of_birth')
                .eq('customer_id', customers?.[0]?.id)

            const found = (existing || []).find(a => 
                (a.full_name === full_name && a.date_of_birth === date_of_birth)
            )
            if (!found) {
                let { data: athletes, ...error } = await supabase
                    .from('athletes')
                    .insert({
                        full_name,
                        date_of_birth,
                        customer_id: customers?.[0]?.id,
                        media_release,
                    }).select()
                return NextResponse.json({parent: customers.pop(), ...(athletes || []).pop(), error: error || undefined}, { status: 200 });
            } else {
                let { data: athletes, ...error } = await supabase
                    .from('athletes')
                    .update({
                        full_name,
                        date_of_birth,
                        media_release,
                    }).eq('id', found.id).select()
                return NextResponse.json({parent: customers.pop(), ...found, error: error || undefined, found: true}, { status: 200 });
            }
        }
        return NextResponse.json({customers, error}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}