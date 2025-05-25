import { updateOrInsertMembership } from '@/services/member'
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { URLSearchParams } from 'url'

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
    return NextResponse.json(
      {
        email,
        customer: {
          ...customer,
          email,
          last_name: full_name.pop(),
          first_name: full_name.pop(),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}


export async function POST(request: NextRequest) {
  try {
    const {
      plan: code,
      phone,
      cfname,
      clname,
      fname,
      date_of_birth,
      lname,
      street_1,
      street_2,
      city_town,
      state_province,
      postal_zip_code,
      email,
      signed_agreement,
      media_release,
      country,
      wants_kit,
    } = await request.json()
    let price = 350
    let organization_id = 1

    const full_name = [lname, fname].join(', ')
    if (!phone || !email || !cfname || !clname || !lname || !date_of_birth || !signed_agreement || !country) {
      console.log({
        signed_agreement,
        date_of_birth,
        cfname,
        clname,
        street_1,
        street_2,
        city_town,
        state_province,
        postal_zip_code,
        country,
        full_name,
        email,
        phone,
      })
      return NextResponse.json({ message: 'Required fields must be filled' }, { status: 400 })
    }

    let { data: customers, error } = await supabase
      .from('customers')
      .upsert(
        {
          street_1,
          street_2,
          city_town,
          state_province,
          postal_zip_code,
          country,
          full_name,
          email,
          phone,
        },
        {
          onConflict: 'email',
          ignoreDuplicates: false,
        }
      )
      .select('id')
    if (customers?.[0]?.id) {
      const membershipResults = await updateOrInsertMembership({
        email,
        organization_id,
        role: 'parent',
      })

      const full_name = [clname, cfname].join(', ')
      let { data: existing } = await supabase
        .from('athletes')
        .select('id, full_name, date_of_birth, subscription_code')
        .eq('customer_id', customers?.[0]?.id)

      const found = (existing || []).find((a) => a.full_name === full_name && a.date_of_birth === date_of_birth)
      let athlete: unknown = undefined
      if (!found) {
        let { data: athletes, ...error } = await supabase
          .from('athletes')
          .insert({
            full_name,
            date_of_birth,
            customer_id: customers?.[0]?.id,
            media_release,
            subscription_code: code,
            wants_kit,
          })
          .select()

        athlete = {
          parent: customers.pop(),
          ...(athletes || []).pop(),
          error: error || undefined,
        }
      } else {
        let { data: athletes, ...error } = await supabase
          .from('athletes')
          .update({
            full_name,
            date_of_birth,
            media_release,
            wants_kit,
            subscription_code: found.subscription_code || code,
          })
          .eq('id', found.id)
          .select()

        athlete = {
          parent: customers.pop(),
          ...(athletes || []).pop(),
          error: error || undefined,
        }
      }

      if (code === 'compete') price = 400

      const { id: athlete_id } = athlete as { id: number }
      const subscription = await supabase
        .from('subscriptions')
        .select('id')
        .eq('organization_id', organization_id)
        .eq('athlete_id', athlete_id)
      if (subscription.status === 200) {
        if (subscription.data?.length) {
          const [s] = subscription.data
          await supabase
            .from('subscriptions')
            .update({
              code,
              price,
            })
            .eq('id', s.id)
        } else {
          await supabase.from('subscriptions').insert({
            organization_id,
            athlete_id,
            code,
            price,
          })
        }
      }

      await fetch(process.env.SLACK_APP_URL!, {
        method: 'POST',
        headers: {
          contentType: 'application/json',
        },
        body: JSON.stringify({
          blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `You have a new signup:\n*<tel:${phone}|${phone} - ${fname} ${lname}>*`,
              },
            },
            {
              type: 'section',
              fields: [
                {
                  type: 'mrkdwn',
                  text: `*Name:* ${[clname, cfname].join(', ')}`,
                },
                {
                  type: 'mrkdwn',
                  text: `*Date of birth:* ${date_of_birth}`,
                },
                {
                  type: 'mrkdwn',
                  text: `*Plan:* ${code || 'Training only'} ${price}`,
                },
                {
                  type: 'mrkdwn',
                  text: `*When:*  ${new Date().toISOString()}`,
                },
              ],
            },
          ],
        }),
      })
      return NextResponse.json(
        {
          ...(athlete as Record<string, unknown>),
          subscription: {
            code,
            price,
          },
        },
        { status: 200 }
      )
    }
    return NextResponse.json({ customers, error }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
