import { Database } from "@/database.types"
import { createClient } from "@supabase/supabase-js"

export async function getCompetitionBySlug(slug: string): Promise<Database['public']['Tables']['competitions']['Row'] & {
    organizations: Database['public']['Tables']['organizations']['Row'],
    divisions: Database['public']['Tables']['divisions']['Row'][]
} | undefined> {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    try {
        const { data, error } =  await supabase
            .from('competitions')
            .select('*, organizations (name, logo_url, short_name, colours), divisions (*)')
            .eq('slug', slug).single()

        if (!error) return data

        console.warn(error)
    } catch (e) {
        console.warn(e)
    }
}