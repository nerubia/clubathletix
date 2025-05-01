
import { Button } from '@/components/button'
import { Checkbox, CheckboxField } from '@/components/checkbox'
import { Divider } from '@/components/divider'
import { Label } from '@/components/fieldset'
import { Heading, Subheading } from '@/components/heading'
import { Input } from '@/components/input'
import { Select } from '@/components/select'
import { Text } from '@/components/text'
import { Textarea } from '@/components/textarea'
import type { Metadata } from 'next'
import { Address } from './address'
import { getAccount, updateAccount } from './actions'


export const metadata: Metadata = {
  title: 'Account',
}

export default async function Settings() {
    const account = await getAccount()
  return (
    <form action={updateAccount} className="mx-auto max-w-4xl">
      <input type='hidden' name='id' value={account.customer?.id || ''} />
      <Heading>Account</Heading>
      <Divider className="my-10 mt-6" />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Email</Subheading>
        </div>
        <div className="space-y-4">
          <Input type="email" aria-label="Organization Email" name="email" defaultValue={account?.email} />
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Your legal name</Subheading>
        </div>
        <div className='gap-6 flex sm:flex-row flex-col'>
          <Input aria-label="First name" name="fname" placeholder='First name' defaultValue={account?.customer?.first_name || ''} />
          <Input aria-label="Last name" name="lname" placeholder='Last name' defaultValue={account?.customer?.last_name || ''} />
        </div>
      </section>

      <Divider className="my-10" soft />

      <section className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="space-y-1">
          <Subheading>Address</Subheading>
          <Text>This is where your organization is registered.</Text>
        </div>
        <Address {...account.customer as unknown as Address} />
      </section>

      <Divider className="my-10" soft />

      <div className="flex justify-end gap-4">
        <Button type="reset" plain>
          Reset
        </Button>
        <Button type="submit">Save changes</Button>
      </div>
    </form>
  )
}
