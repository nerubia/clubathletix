import { createClient } from '@supabase/supabase-js'

export async function getLocations() {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const { data: records, error } = await supabase.from('locations').select('id, name, street_1, city_town, state_province, postal_zip_code')
    if (error) {
        console.error('Error fetching locations:', error)
        return []
    }
    return records || []
}