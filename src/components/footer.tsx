import { InstagramIcon, YouTubeIcon } from "./icons/social-media"

const navigation = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/progressfooty',
    icon: InstagramIcon,
  },
  {
    name: 'YouTube',
    href: '#',
    icon: YouTubeIcon,
  },
]

export default function Footer({'data-org': organization}: {
    'data-org': {
        [k: string]: string | number
    }}) {
    
  return (
    <footer className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center gap-x-6 md:order-2">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">{item.name}</span>
              <item.icon aria-hidden="true" className="size-6" />
            </a>
          ))}
          <p className="mt-8 text-center text-sm/6 text-gray-400 md:order-1 md:mt-0">
          Powered by ClubAthletix</p>
        </div>
        <p className="mt-8 text-center text-sm/6 text-gray-400 md:order-1 md:mt-0">
          &copy; {new Date().getFullYear()} {organization.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
