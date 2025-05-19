import { createClient } from '@supabase/supabase-js'
import { hashEmail, hashToPassword } from './credentials'
import { Database } from '@/database.types'

export async function getCustomerByEmail(email: string): Promise<Database['public']['Tables']['credentials']['Row'] | undefined> {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    try {

        const { data, error } =  await supabase
            .from('credentials')
            .select(`
                email_hash, 
                password_hash,
                customers (id, phone, full_name)`)
            .eq('email_hash', hashEmail(email))

        if (error) throw error
        const credentials = data.pop()
        if (credentials) {
            const { customers, ...record } = credentials
            return {
                ...record,
                ...customers,
            } as unknown as Database['public']['Tables']['credentials']['Row']
        } else {
            const { data, error } = await supabase
                .from('customers')
                .select('id, full_name')
                .eq('email', email)
            if (error) throw error
            const customer = data?.pop();
            if (customer) {
                const email_hash = hashEmail(email)
                const password_hash = hashToPassword(email_hash.split('').reverse().join(''))
                
                const results: any = await updateOrInsertCredentials({
                    email_hash,
                    password_hash,
                    email
                })

                if (results?.email) return results
            }
        }
    } catch (e) {
        console.error(e)
    }
}


/**
 * Updates the password_hash for an existing credentials record,
 * or inserts a new credentials record if one does not exist.
 * 
 * @param params - Object containing email, email_hash, and password_hash
 * @returns The updated/inserted credentials object or an error object
 */
export async function updateOrInsertCredentials({
    email,
    email_hash,
    password_hash,
}: {
    email: string
    email_hash: string
    password_hash: string
}): Promise<
    | { email: string; email_hash: string; password_hash: string }
    | { message: string; details?: any }
    | null
> {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    // Check if a credentials record with the given email_hash exists
    const { data: records } = await supabase
        .from('credentials')
        .select('email_hash, password_hash, role, customers (id, full_name)')
        .eq('email_hash', email_hash)

    if (records?.length) {
        // Update the password_hash for the existing record
        const { error } = await supabase
            .from('credentials')
            .update({ password_hash })
            .eq('email_hash', email_hash)
        if (error) return { message: 'Failed to update credentials', details: error }
    } else {
        // Insert a new credentials record
        const { error } = await supabase
            .from('credentials')
            .insert({
                email,
                email_hash,
                password_hash,
            })
        if (error) return { message: 'Failed to insert credentials', details: error }
    }

    // Return the credentials object on success
    return {
        email,
        email_hash,
        password_hash,
    }
}