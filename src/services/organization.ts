import { createClient } from '@supabase/supabase-js'

export async function getOrganizationByDomain(domain: string): Promise<{
            id?: number;
            name?: string;
            short_name?: string;
            logo_url?: string;
            media?: Record<string, string[]>
            error?: string
        }> {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const [hostname] = domain.split(':')
    
    const { data: records, error } = await supabase.from('domains').select('id, name, organizations (id, name, short_name, logo_url)').eq('name', hostname)
    
    const data = records?.pop()?.organizations
    
    if (data) {
        const o = data as unknown as {
            [k: string]: string
        } & {
            media: string[]
        }
        const { data: components } = await supabase.from('media_components').select('*').eq('organization_id', o.id)
        let media: Record<string, string[]> = {}
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
            media
        }
    }
    return {
        error: JSON.stringify(error)
    }
}