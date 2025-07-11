import Footer from '@/components/footer';
import Navigation from '@/components/headers/navigation';
import Sponsors from '@/components/sponsors';
import { getOrganizationByDomain } from '@/services/organization';
import { headers } from 'next/headers';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const hdr = await headers();
	const host = hdr.get('host') || 'localhost';
	const organization = await getOrganizationByDomain(host);
	return (
		<div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
			<Navigation data-org={(organization as unknown as { [k: string]: number | string }) || {}} />

			<div className="mx-auto w-screen">{children}</div>
			<div className="flex-1" />
			{organization?.name?.startsWith('PF') && <Sponsors />}
			<Footer data-org={(organization as unknown as { [k: string]: number | string }) || {}} />
		</div>
	);
}
