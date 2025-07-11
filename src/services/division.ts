import { Database } from "@/database.types"
import { createClient } from "@supabase/supabase-js"

export async function getCompetitionDivision(id: number): Promise<Database['public']['Tables']['divisions']['Row'] & {
    organizations: Database['public']['Tables']['organizations']['Row']
} | undefined> {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    try {
        const { data, error } =  await supabase
            .from('divisions')
            .select('*, organizations (name, logo_url, short_name, colours)')
            .eq('id', id).single()

        if (!error) return data

        console.warn(error)
    } catch (e) {
        console.warn(e)
    }
}