import { getOrganizationByDomain } from '@/services/organization'
import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'



export async function generateMetadata(): Promise<Metadata> {
    const hdr = await headers()
    const host = hdr.get('host') || 'localhost'
    const organization = await getOrganizationByDomain(host)
    const { name } = organization as unknown as { id?: number; name?: string }
  return {
    title: name || 'ClubAthletix',
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const hdr = await headers()
    const host = hdr.get('host') || 'localhost'
    const organization = await getOrganizationByDomain(host)
    const { logo } = organization as unknown as { id?: number; logo?: string }
  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="icon" href={logo || '/clubs/pfa/logo.png'} />
        <link rel="apple-touch-icon" href={logo || '/clubs/pfa/logo.png'} />
      </head>
      <body>{children}</body>
    </html>
  )
}
