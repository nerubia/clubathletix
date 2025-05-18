import Footer from '@/components/footer'
import HomePageHeader from '@/components/headers'
import SignupSection from '@/components/sign-up-sections/summer'
import Sponsors from '@/components/sponsors'
import Testimonials from '@/components/testimonials'
import TestimonialGrid from '@/components/testimonials/grid'
import { getOrganizationTestimonials } from '../api/testimonial/service'

export default async function Page() {
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
