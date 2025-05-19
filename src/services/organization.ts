import { createClient } from '@supabase/supabase-js'

export async function getOrganizationByDomain(domain: string) {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const { data: records, error } = await supabase.from('domains').select('id, name, organizations (id, name, short_name, logo_url)').eq('name', domain)
    return error || records.pop()
}