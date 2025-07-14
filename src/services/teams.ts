import { createClient } from '@supabase/supabase-js'

export async function getTeams() {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const { data: records, error } = await supabase.from('teams').select('id, name, gender, logo_url, organizations (id, short_name, logo_url)')
    if (error) {
        console.error('Error fetching locations:', error)
        return []
    }
    return records || []
}