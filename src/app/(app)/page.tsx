import Footer from '@/components/footer'
import HomePageHeader from '@/components/headers'
import LeadershipSection from '@/components/leadership'
import SummerSignupSection from '@/components/sign-up-sections/summer'
import Testimonials from '@/components/testimonials'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Programs', href: '#' },
  { name: 'Coaches', href: '#' },
  { name: 'Management', href: '#' },
]

export default function Page() {

  return (
    <>
      <HomePageHeader />
      <div className='w-full'>
      </div>
      <Testimonials />
      <SummerSignupSection />
      <Footer />
    </>
    
  )
}
