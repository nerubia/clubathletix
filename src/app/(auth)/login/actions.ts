'use server';
import { createClient } from '@supabase/supabase-js';

import { redirect } from 'next/navigation';
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function login(formData: FormData) {
	const data = Object.fromEntries(formData.entries());
	const { email } = data as unknown as { [k: string]: string };
	if (email) {
		const { error, data: records } = await supabase.from('members').select('id, email, role').eq('email', email);
		if (!records?.length) {
			const { error, data: customers } = await supabase
				.from('customers')
				.select('id, full_name, street_1, street_2, city_town, postal_zip_code, country, state_province')
				.eq('email', email);
			if (customers?.length) {
				const customer = customers.pop();
			}
		} else {
			console.log({ data, records, error });
		}
	}
}

export async function signOut() {
	// const supabase = await createClient()
	// const { error } = await supabase.auth.signOut()
	// if (error) {
	//     redirect('/error')
	//   }
	redirect('/');
}
