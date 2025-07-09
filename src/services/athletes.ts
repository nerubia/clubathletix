import { createClient } from '@supabase/supabase-js'
import { Database } from '@/database.types'

export async function getAthleteUrl(id: string): Promise<Database['public']['Tables']['profiles']['Row'] | undefined> {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    try {

        const { data, error } =  await supabase
            .from('profiles')
            .select(`
                id,
                url`)
            .eq('id', id)

        if (error) throw error
        const profile = data.pop()
        if (profile) {
            return profile as unknown as Database['public']['Tables']['profiles']['Row']
        } else {
            console.warn(`No profile found for ID: ${id}`)
            return undefined
        }
    } catch (e) {
        console.error(e)
    }
}
type ExtendedSlackUser = Database['public']['Tables']['slack_users']['Row'] & {
    athletes: Database['public']['Tables']['athletes']['Row']
}
export async function getAthleteViaSlack(username: string): Promise<Database['public']['Tables']['athletes']['Row'][]
 | undefined> {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    try {

        const { data, error } =  await supabase
            .from('slack_users')
            .select(`athlete_id`)
            .eq('username', username)

        if (error) throw error
        
        if (data) {
            const athlete_ids: number[] = []
            for (const record of data) {
                if (record.athlete_id) athlete_ids.push(record.athlete_id)

                    
                    
                }
            const { data: athletes, error: athleteError } = await supabase
                .from('athletes')
                .select('*')
                .in('id', athlete_ids)
            return athletes as unknown as Database['public']['Tables']['athletes']['Row'][]
        } else {
            console.warn(`No Slack record found for ID: ${username}`)
            return undefined
        }
    } catch (e) {
        console.error(e)
    }
}