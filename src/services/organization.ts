import { createClient } from '@supabase/supabase-js'

/**
 * Retrieves organization details by domain name.
 *
 * This function queries the `domains` table for the provided domain (hostname),
 * then fetches the associated organization's details and its media components.
 * The result includes organization metadata and a mapping of media segment names to their URLs.
 *
 * @param domain - The domain string to look up (may include port, which will be stripped).
 * @returns A promise resolving to an object containing organization details and media,
 *          or an error message if the lookup fails.
 *
 * @remarks
 * - Uses Supabase client with service role key for database access.
 * - The `media` property is a record mapping segment names to arrays of URLs.
 * - If no organization is found, returns an object with an `error` property.
 *
 * @example
 * ```typescript
 * const org = await getOrganizationByDomain('example.com');
 * if (org.error) {
 *   // handle error
 * } else {
 *   // use org data
 * }
 * ```
 */
// Split the domain to extract the hostname (ignore port if present)
// Query the 'domains' table for the hostname and select related organization fields
// Extract the organization data from the query result
// If organization data exists:
//   - Query 'media_components' for media related to the organization
//   - Sort components by segment_name in descending order
//   - Build a media record mapping segment names to arrays of URLs
//   - Return the organization data along with the media mapping
// If no organization is found, return an error object
export async function getOrganizationByDomain(domain: string): Promise<{
            id?: number;
            name?: string;
            short_name?: string;
            logo_url?: string;
            media?: Record<string, string[]>
            bgColours?: string[]
            textColours?: string[]
            error?: string
        }> {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const [host, port] = (domain || '').split(':')
    const { data, error } = await supabase.from('domains').select('id, name, organizations (id, name, short_name, logo_url, colours)').eq('name', host).single()
    
    if (data?.organizations) {
        const o = data.organizations as unknown as {
            [k: string]: string
        } & {
            media: string[]
        }
        const { data: components } = await supabase.from('media_components').select('*').eq('organization_id', o.id)
        let media: Record<string, string[]> = {}
        const textColours = (o.colours || '').split(',').filter(w => w.startsWith('text-'))
        const bgColours = (o.colours || '').split(',').filter(w => w.startsWith('bg-'))
        ;(components || []).sort((a, b) => {
            if (a.segment_name > b.segment_name) return -1
            if (a.segment_name < b.segment_name) return 1
            return 0
        })
        for (const comp of (components || [])) {
            media = {
                ...media,
                [comp.segment_name]: [...media[comp.segment_name] || [], comp.url]
            }
        }
        return {
            ...o,
            media,
            textColours,
            bgColours,
        }
    }
    return {
        error: JSON.stringify(error)
    }
}