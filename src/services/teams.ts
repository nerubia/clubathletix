import { Database } from '@/database.types'
import { createClient } from '@supabase/supabase-js'

export type Organization = Database['public']['Tables']['organizations']['Row']
export type Team = Database['public']['Tables']['teams']['Row'] & {
    organization: Organization
}

export async function getTeams(): Promise<Team[]> {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const { data, error } = await supabase.from('teams').select('id, name, gender, logo_url, organizations (id, short_name, logo_url)')
    const records: Team[] = (data || []).map(team => ({
        ...team,
        organization: team.organizations as unknown as Organization
    } as unknown as Team))
    if (error) {
        console.error('Error fetching locations:', error)
        return []
    }
    return records || []
}