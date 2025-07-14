'use client'
import { useCallback, useEffect, useState } from "react"
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heading } from "../heading"

const navigation = [
  { name: 'Parents', href: '/parental-expectations' },
  // { name: 'Management', href: '#' },
]

export default function Navigation({
    backgroundColour,
    'data-org': organization
}: {
    backgroundColour?: string;
    'data-org': {
        [k: string]: string | number
    }
}) {
    const path = usePathname()
    const textColours = (organization.textColours || []) as string[]
    if (organization.id === 1 && navigation.filter(n => n.name === 'Summer League').length === 0) {
        navigation.unshift({ name: 'Summer League', href: '/competitions/pfsummer' })
    }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return path.startsWith('/d/') || path.endsWith('/d') ? <></> : <header className={`absolute inset-x-0 top-0 z-50 ${backgroundColour || ''}`.trim()}>
    <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 px-8 xl:px-0">
      <div className="flex lg:flex-1 items-center">
        <Link href="/" className="-m-1.5 p-1.5">
          {organization?.logo_url && <img
            alt=""
            src={`${organization?.logo_url}` || "/logo.png"}
            className="h-6 w-auto"
          />}
        </Link>
        <Heading force={`uppercase font-bold ml-1 tracking-widest text-sm! ${textColours?.length ? textColours[0] : 'text-white'}`}>{`${organization.name || ''}`.split('-').at(0)}</Heading>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-x-4">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href} className={`text-sm/6 font-semibold ${path.startsWith('/videos') ? 'text-gray-white' : 'text-gray-900'}`}>
            {item.name}
          </Link>
        ))}
        <Link href="/#signup-form" className={`text-sm/6 font-semibold ${path.startsWith('/videos') ? 'text-gray-white' : 'text-gray-900'}`}>
          Sign up <span aria-hidden="true">&darr;</span>
        </Link>

        <Link href="/login" className={`text-sm/6 font-semibold ${path.startsWith('/videos') ? 'text-gray-white' : 'text-gray-900'}`}>
          Log in <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </nav>
    <Dialog open={mobileMenuOpen} onClose={() => {setMobileMenuOpen(false)}} className="lg:hidden">
      <div className="fixed inset-0 z-50" />
      <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="flex items-center justify-between">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{`${organization?.name}` || "ClubAthletix"}</span>
            <img
            alt=""
            src={`${organization?.logo_url}` || "/logo.png"}
            className="h-12 w-auto"
          />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="-m-2.5 rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="py-6">
                
              <Link
                href="#signup-form"
                className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
}