import { getEvents } from '@/data'
import { ApplicationLayout } from '../application-layout'
import { getAccount } from './account/actions'
import { createClient } from '@/utils/supabase/server'
import { Account } from '@/app.types'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let events = await getEvents()
  const user = await getAccount();


  return <ApplicationLayout events={events} account={user.customer as unknown as Account}>{children}</ApplicationLayout>
}
