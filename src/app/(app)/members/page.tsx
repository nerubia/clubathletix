import { Avatar } from '@/components/avatar'
import { Button } from '@/components/button'
import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getMembers } from '@/data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Members',
}

export default async function Members() {
  let members = await getMembers()

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Members</Heading>
        <Button className="-my-0.5">Add member</Button>
      </div>
      <Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Player ID</TableHeader>
            <TableHeader>Reg. Date</TableHeader>
            <TableHeader>Player</TableHeader>
            <TableHeader>Guardian / Player</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id} href={member.url} title={`Order #${member.id}`}>
              <TableCell>{member.id}</TableCell>
              <TableCell className="text-zinc-500">{member.date}</TableCell>
              <TableCell>{member.customer.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar src={member.event.thumbUrl} className="size-6" />
                  <span>{member.event.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">CA{member.amount.cad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
