import Footer from '@/components/footer'
import HomePageHeader from '@/components/headers'
import SummerSignupSection from '@/components/sign-up-sections/summer'
import Sponsors from '@/components/sponsors'
import Testimonials from '@/components/testimonials'

const navigation = [
  { name: 'Programs', href: '#' },
  { name: 'Coaches', href: '#' },
  { name: 'Management', href: '#' },
]

export default function Page() {

  return (
    <>
      <HomePageHeader />
      <Testimonials />
      <SummerSignupSection />
      <Sponsors />
      <Footer />
    </>
    
  )
}
