import { createClient } from '@supabase/supabase-js';
import { Customer, Organization } from '../customer/types';
import { Testimonial } from './types';
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function getOrganizationTestimonials(organization: string) {
	const { data, error } = await supabase
		.from('testimonials')
		.select('id, customers (full_name), organizations (name), body, author_description, feature')
		.eq('organization_id', organization);

	if (error) console.error(error);

	return data?.map((d) => {
		return {
			...d,
			customer: d.customers as unknown as Customer,
			organization: d.organizations as unknown as Organization,
			organizations: undefined,
			customers: undefined,
		} as Testimonial;
	});
}
