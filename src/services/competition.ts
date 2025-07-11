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
            .select('*, organizations (name, phone, email, logo_url, short_name, colours), divisions (*)')
            .eq('slug', slug).single()

        if (!error) return data

        console.warn(error)
    } catch (e) {
        console.warn(e)
    }
}

export async function joinCompetition(submission: {
    competition_id: number;
    division_id: number;
    team_name: string;
    first_name: string;
    last_name: string;
    email_address: string;
    phone_number: string;
    waiver_signed_at: Date;
    description: string;
}): Promise<Database['public']['Tables']['competition_registrations']['Row'] | undefined> {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    try {
        // Insert a new credentials record
        const { data, error } = await supabase
            .from('competition_registrations')
            .insert(submission)
            .select().single()

        if (!error) return data

        console.warn(error)
    } catch (e) {
        console.warn(e)
    }
}