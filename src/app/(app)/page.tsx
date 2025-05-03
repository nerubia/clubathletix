import Footer from '@/components/footer'
import HomePageHeader from '@/components/headers'
import SignupSection from '@/components/sign-up-sections/summer'
import Sponsors from '@/components/sponsors'
import Testimonials from '@/components/testimonials'

const navigation = [
  { name: 'Programs', href: '#' },
  { name: 'Coaches', href: '#' },
  { name: 'Management', href: '#' },
]

export default function Page() {
  function getAddress() {
    let address = 'Cambridge Soccer Park - 6067 - 150 Street, Surrey BC'
    if (new Date().getMonth() < 7) address = 'Goldstone Park'
    return address
  }
  return (
    <>
      <HomePageHeader />
      <Testimonials />
      <SignupSection address={getAddress()} />
      <Sponsors />
      <Footer />
    </>
    
  )
}
