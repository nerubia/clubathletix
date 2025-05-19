import { createClient } from '@supabase/supabase-js'

export async function updateOrInsertMembership({
  email,
  organization_id,
  ...data
}: {
  email: string
  organization_id: number
  role: string
}) {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
  const { data: records } = await supabase.from('members').select('id, email, role').ilike('email', email)

  if (records?.length) {
    await supabase.from('members').update(data).eq('id', records[0].id)
  } else {
    await supabase.from('members').insert({
      email,
      organization_id,
      ...data,
    })
  }
}