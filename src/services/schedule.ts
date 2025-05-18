import { Database } from '@/database.types'
import { addDays, isBefore } from '@/utils/calendar/date-helpers'
import { formatDate, getDayOfWeek } from '@/utils/calendar/date-formatter'
import { createClient } from '@supabase/supabase-js'

type Schedule = Database['public']['Tables']['schedules']['Row'] & {
    locations: Database['public']['Tables']['locations']['Row']
    programs: Database['public']['Tables']['programs']['Row']
}
export async function getSchedule(params: Record<string, string>) {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    let { data: schedules, error } = await supabase
    .from('schedules')
    .select(`
        name,
        locations (id, name, street_1, street_2, city_town, postal_zip_code, state_province),
        programs (id, name, description, min_age, max_age, coaches, image_url),
        starts_at, ends_at, mondays, tuesdays, wednesdays, thursdays, fridays, saturdays, sundays, is_active`)
    .eq('organization_id', params.organization_id)
    .or(`starts_at.gte.${params.from},starts_at.lte.${params.to}`, )
    try {
        if (schedules && params.to) {
            return expandRecurringSchedules(schedules as unknown as Schedule[], new Date(params.to))
        }
        return schedules || undefined
    } catch (err) {
        console.error(err)
    }
}


/**
 * Retrieves the schedule(s) for a specific organization on a given date.
 *
 * @param organization_id - The unique identifier of the organization whose schedules are to be fetched.
 * @param date - The date for which the schedules should be retrieved.
 * @returns A promise that resolves to an array of schedule objects for the specified date, or undefined if an error occurs.
 *
 * @remarks
 * - This function queries the 'schedules' table in the Supabase database, filtering by organization ID and the provided date.
 * - The returned schedules include related location and program details.
 * - Errors encountered during the query are logged to the console.
 */
export async function getScheduleForDate(
    organization_id: string,
    range: {
        from: string;
        to: string;
    }
): Promise<any[] | undefined> {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    try {
        let { data: schedules, error } = await supabase
            .from('schedules')
            .select(`
                name,
                locations (id, name, street_1, street_2, city_town, postal_zip_code, state_province),
                programs (id, name, description, min_age, max_age, coaches, image_url),
                starts_at, ends_at, mondays, tuesdays, wednesdays, thursdays, fridays, saturdays, sundays, is_active`)
            .eq('organization_id', organization_id)
            .lte('starts_at', range.from)
            .gt('ends_at', range.to)
        if (error) console.error(error)
        else return schedules as any
    } catch (err) {
        console.error(err)
    }
}


/**
 * Expands recurring schedules into individual day records between starts_at and ends_at.
 * Each record represents a single occurrence on a specific day of the week.
 *
 * @param schedules - Array of schedule objects with recurrence by weekday.
 * @returns Array of expanded schedule records, one per active weekday occurrence.
 */

function expandRecurringSchedules(schedules: Schedule[], until: Date): any[] {
    const daysOfWeek = [
        { key: 'sundays', index: 0 },
        { key: 'mondays', index: 1 },
        { key: 'tuesdays', index: 2 },
        { key: 'wednesdays', index: 3 },
        { key: 'thursdays', index: 4 },
        { key: 'fridays', index: 5 },
        { key: 'saturdays', index: 6 },
    ]

    const expanded: any[] = []

    for (const schedule of schedules) {
        const start = new Date(schedule.starts_at)
        const end: Date | null = schedule.ends_at ? new Date(schedule.ends_at) : null
        for (let d = start; isBefore(d, end ? addDays(end || start, 1) : until); d = addDays(d, 1)) {
            const weekday = d.getDay()
            const dayConfig = daysOfWeek.find(day => day.index === weekday)
            if (!dayConfig) continue

            const { [dayConfig.key]: time } = schedule as unknown as { [k: string]: string }
            if (time) {
                expanded.push({
                    name: schedule.name,
                    location: `${schedule.locations.name}, ${schedule.locations.street_1}`,
                    programs: schedule.programs,
                    date: formatDate(d),
                    day: getDayOfWeek(d),
                    time,
                })
            }
        }
    }

    return expanded
}
