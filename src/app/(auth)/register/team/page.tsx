import { Button } from '@/components/button'
import { headers } from 'next/headers'
import { Field, Label } from '@/components/fieldset'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Strong, Text, TextLink } from '@/components/text'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getOrganizationByDomain } from '@/services/organization'
import { signUp } from '@/components/sign-up-sections/actions'
import RegistrationForm from '@/components/sign-up-sections/registration-form'

export const metadata: Metadata = {
  title: 'Team Registration Form',
}

export default async function TeamRegistrationPage() {
    const hdr = await headers()
    const host = hdr.get('host') || 'localhost'
    const organization = await getOrganizationByDomain(host)
  return (
    <div className="grid w-full max-w-sm grid-cols-1 gap-2">
        <div className='w-full flex items-center justify-center flex-col'>
            <Image src={organization.logo_url || ''} height={68} width={68} title="PF Football Academy" alt="PF Logo" />
            <Heading>Team Registration</Heading>
            <Subheading>Registration Form</Subheading>
        </div>
        <RegistrationForm />
    </div>
  )
}
