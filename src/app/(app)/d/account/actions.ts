'use server'
import { createClient } from '@/utils/supabase/server';
import { Database } from '@/database.types';
import { QueryData } from '@supabase/supabase-js';
import { headers } from 'next/headers';
import { getApiRequest, postApiRequest } from '@/utils/http';

export async function getAccount(): Promise<{
    email?: string;
    error?: string;
    customer?: Record<string, string>
}> {
    const h = await headers();
    try {
        const supabase = await createClient()
        const { data } = await supabase.auth.getUser()
        let email = data.user?.email
        if (email) {
            let { origin } = new URL(h.get('origin') || h.get('referer') || 'http://localhost')
            
            const url = `${origin}/api/customer`
            
            return await getApiRequest(url, {email})
        }
        return { email }
    }  catch (error) {
        console.error('Error during fetching account:', error);
        return { error: 'An error occurred while fetching account.' };
    }
}

export async function updateAccount(formData: FormData) {
    const h = await headers();
    const url = `${h.get('origin')}/api/customer`
    
    const customer = await postApiRequest(url, Object.fromEntries(formData.entries()))

    console.log(customer)
}