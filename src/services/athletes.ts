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
type AthleteRecord = Database['public']['Tables']['athletes']['Row'] & {
    parent: Database['public']['Tables']['customers']['Row']
}

export async function getAthlete(id: number): Promise<AthleteRecord | undefined> {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    try {

        const { data, error } =  await supabase
            .from('athletes')
            .select('*, customers (full_name, email, phone, first_name, last_name)')
            .eq('id', id).single()

        if (!error) return {
            ...data,
            parent: data.customers
        }

        console.error(error)
    } catch (e) {
        console.error(e)
    }
}
export async function getAthleteViaEmail(email: string): Promise<Database['public']['Tables']['customers']['Row'] & {
    athletes: Database['public']['Tables']['athletes']['Row'][]
} | undefined> {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    try {

        const { data, error } =  await supabase
            .from('customers')
            .select('*, athletes (*)')
            .eq('email', email).single()

        if (!error) return data

        console.error(error)
    } catch (e) {
        console.error(e)
    }
}

export async function getAthleteViaYear(year: number): Promise<AthleteRecord[]> {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    let results: AthleteRecord[]  = []
    try {

        const { data, error } =  await supabase
            .from('athletes')
            .select('*, customers (full_name, first_name, last_name, email, phone)')
            .ilike('date_of_birth', `${year}-%`)

        if (error)
        console.warn(error)
        else results = data.map((athlete) => ({
            ...athlete,
            parent: athlete.customers
        }))

    } catch (e) {
        console.error(e)
    }

    return results
}