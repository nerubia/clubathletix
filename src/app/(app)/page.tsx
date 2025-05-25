import HomePageHeader from '@/components/headers'
import SignupSection from '@/components/sign-up-sections/summer'
import TestimonialGrid from '@/components/testimonials/grid'
import { getOrganizationTestimonials } from '../api/testimonial/service'
import { headers } from 'next/headers'
import VideosPage from './videos/page'

export default async function Page() {
    const hdr = await headers()
    if(hdr.get('host') === 'clubathletix.com') return <VideosPage />
  function getAddress() {
    let address = 'Cambridge Soccer Park - 6067 - 150 Street, Surrey BC'
    if (new Date().getMonth() < 7) address = 'Goldstone Park'
    return address
  }

  const testimonials = await getOrganizationTestimonials('1')
  return (
    <>
      <HomePageHeader />
      <TestimonialGrid items={testimonials || []} />
      <SignupSection address={getAddress()} />
    </>
    
  )
}
