import { createClient } from '@supabase/supabase-js'

export async function createEvent({
    organization_id,
    event_type,
    location,
    starts_at,
    ends_at,
}: {
    organization_id: number;
    event_type: 'match' | 'training' | 'tournament';
    location: string,
    starts_at: Date,
    ends_at?: Date,
}): Promise<{
        id: number;
        name: string;
        short_name?: string;
        logo_url?: string;
        media?: Record<string, string[]>
        bgColours?: string[]
        textColours?: string[]
        error?: string
    } | null> {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)
    const { data, error } = await supabase.from('organization_events')
        .insert({
            organization_id,
            event_type,
            location,
            starts_at: starts_at.toISOString(),
            ends_at: ends_at ? ends_at.toISOString() : null,
        }).select('id, name, short_name, logo_url, colours').single()
    
        if (error) console.warn('Error fetching organization:', error)

    return data
}