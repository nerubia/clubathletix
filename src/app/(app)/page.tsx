import CenteredContentSection from '@/components/content-sections/centered';
import HomePageHeader from '@/components/headers';
import HomeHeroSection from '@/components/heroes/clubathletix';
import PricingSection from '@/components/pricing/pricing-section-alpha';
import PricingSectionSimple from '@/components/pricing/pricing-section-simple';
import SignupSection from '@/components/sign-up-sections/summer';
import TestimonialGrid from '@/components/testimonials/grid';
import { getOrganizationByDomain } from '@/services/organization';
import { headers } from 'next/headers';
import { getOrganizationTestimonials } from '../api/testimonial/service';

export default async function Page() {
	const hdr = await headers();
	const host = hdr.get('host') || 'localhost';
	const organization = await getOrganizationByDomain(host);

	if ((organization as unknown as { id: number })?.id === 3)
		return (
			<>
				<HomeHeroSection {...organization} />
				<PricingSection />
				<CenteredContentSection />
			</>
		);
	function getAddress() {
		let address = 'Cambridge Soccer Park - 6067 - 150 Street, Surrey BC';
		if (new Date().getMonth() < 7) address = 'Goldstone Park';
		return address;
	}

	const testimonials = await getOrganizationTestimonials('1');
	return (
		<>
			<HomePageHeader media={(organization as unknown as { media?: { hero?: string[] } })?.media?.hero || []} />
			<TestimonialGrid items={testimonials || []} />
			<PricingSectionSimple />
			<SignupSection address={getAddress()} />
		</>
	);
}
