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