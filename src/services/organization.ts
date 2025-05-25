import { createClient } from '@supabase/supabase-js'

export async function getOrganizationByDomain(domain: string) {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const [hostname] = domain.split(':')
    
    const { data: records, error } = await supabase.from('domains').select('id, name, organizations (id, name, short_name, logo_url)').eq('name', domain.split(':')[0])
    
    const data = records?.pop()?.organizations
    if (data) {
        return data as unknown as Record<string, string>
    }
    return {
        error: JSON.stringify(error)
    }
}