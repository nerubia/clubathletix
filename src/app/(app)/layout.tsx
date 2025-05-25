import { headers } from 'next/headers'
import Footer from "@/components/footer";
import Navigation from "@/components/headers/navigation";
import Sponsors from "@/components/sponsors";
import { getOrganizationByDomain } from '@/services/organization'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const hdr = await headers()
    const host = hdr.get('host') || 'localhost'
    const organization = await getOrganizationByDomain(host)
  return <div className="bg-white flex flex-col min-h-screen overflow-x-hidden">
        <Navigation data-org={organization as unknown as { [k: string]: number | string } || {}} />
        
        <div className="mx-auto w-screen">
            {children}
        </div>
        <div className="flex-1" />
        {organization?.name?.startsWith('PF') && <Sponsors />}
        <Footer data-org={organization as unknown as { [k: string]: number | string } || {}} />
  </div>
}
