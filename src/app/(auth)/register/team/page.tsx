import { Heading, Subheading } from '@/components/heading';
import RegistrationForm from '@/components/sign-up-sections/registration-form';
import { getOrganizationByDomain } from '@/services/organization';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import Image from 'next/image';

export const metadata: Metadata = {
	title: 'Team Registration Form',
};

export default async function TeamRegistrationPage() {
	const hdr = await headers();
	const host = hdr.get('host') || 'localhost';
	const organization = await getOrganizationByDomain(host);
	return (
		<div className="grid w-full max-w-sm grid-cols-1 gap-2">
			<div className="flex w-full flex-col items-center justify-center">
				<Image src={organization.logo_url || ''} height={68} width={68} title="PF Football Academy" alt="PF Logo" />
				<Heading>Team Registration</Heading>
				<Subheading>Registration Form</Subheading>
			</div>
			<RegistrationForm />
		</div>
	);
}
