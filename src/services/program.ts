import { Database } from '@/database.types'
import { addDays, isBefore } from '@/utils/calendar/date-helpers'
import { formatDate, getDayOfWeek } from '@/utils/calendar/date-formatter'
import { createClient } from '@supabase/supabase-js'

type Schedule = Database['public']['Tables']['schedules']['Row'] & {
    locations: Database['public']['Tables']['locations']['Row']
    programs: Database['public']['Tables']['programs']['Row']
}
export async function getPrograms(organization_id: string) {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    try {

        const { data, error } =  await supabase
        .from('schedules')
        .select(`
            name,
            locations (id, name, street_1, street_2, city_town, postal_zip_code, state_province),
            programs (id, name, description, min_age, max_age, coaches, image_url),
            starts_at, ends_at, mondays, tuesdays, wednesdays, thursdays, fridays, saturdays, sundays, is_active`)
        .eq('organization_id', organization_id)
        .is('is_active', true)

        if (error) throw error
        return {data}
    } catch (e) {
        return {
            error: e,
        }
    }
}