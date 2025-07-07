import { createClient } from '@supabase/supabase-js'
import { Database } from '@/database.types'

type Season = Database['public']['Tables']['seasons']['Row'] & {
    organizations: Database['public']['Tables']['organizations']['Row']
    
}

export async function getCurrentSeason(organization_id: number): Promise<Season | undefined> {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    try {
        const { data: season, error } = await supabase
            .from('seasons')
            .select(`
                id,
                name,
                start_date,
                end_date,
                description,
                is_active,
                organization_id
            `)
            .eq('organization_id', organization_id)
            .lte('start_date', 'NOW()')
            .gte('end_date', 'NOW()')
            .eq('is_active', true)
            .order('start_date')
            .single()

        if (error) {
            console.error('Error fetching current season:', error)
            return undefined
        }

        if (!season) {
            console.warn('No active season found for organization:', organization_id)
            return undefined
        }

        return season as unknown as Season
    } catch (err) {
        console.error('Unexpected error:', err)
        return undefined
    }
}