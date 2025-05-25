import HomePageHeader from '@/components/headers'
import SignupSection from '@/components/sign-up-sections/summer'
import TestimonialGrid from '@/components/testimonials/grid'
import { getOrganizationTestimonials } from '../api/testimonial/service'
import { headers } from 'next/headers'
import VideosPage from './videos/page'
import { getOrganizationByDomain } from '@/services/organization'

export default async function Page() {
    const hdr = await headers()
    const host = hdr.get('host') || 'localhost'
    const organization = await getOrganizationByDomain(host)
    
    if((organization as unknown as { id: number} )?.id === 3) return <VideosPage />
  function getAddress() {
    let address = 'Cambridge Soccer Park - 6067 - 150 Street, Surrey BC'
    if (new Date().getMonth() < 7) address = 'Goldstone Park'
    return address
  }

  const testimonials = await getOrganizationTestimonials('1')
  return (
    <>
      <HomePageHeader media={(organization as unknown as { media?: { hero?: string[] } })?.media?.hero || []}/>
      <TestimonialGrid items={testimonials || []} />
      <SignupSection address={getAddress()} />
    </>
    
  )
}
