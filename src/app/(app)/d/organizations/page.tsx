import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { DialogTrigger } from '@/components/dialog';
import { Heading } from '@/components/heading';
import { Input, InputGroup } from '@/components/input';
import { Select } from '@/components/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { getOrganizations } from '@/services/organization';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Organizations',
};

export default async function Organizations() {
    let organizations = await getOrganizations();

	return (
		<>
			<div className="flex items-end justify-between gap-4">
				<Heading>{`${metadata.title || ''}`}</Heading>
			</div>
			<div className="flex flex-wrap items-end justify-between gap-4">
				<div className="max-sm:w-full sm:flex-1">
					<div className="mt-4 flex max-w-xl gap-4">
						<div className="flex-1">
							<InputGroup>
								<MagnifyingGlassIcon />
								<Input name="search" placeholder={`Search ${metadata.title || ''}`} />
							</InputGroup>
						</div>
						<div>
							<Select name="sort_by">
								<option value="name">Sort by name</option>
								<option value="date">Sort by date registered</option>
								<option value="status">Sort by short name</option>
							</Select>
						</div>
					</div>
				</div>
				<DialogTrigger title="New Organization" button-label="Add organization" size="xl">
                    <span>test</span>
				</DialogTrigger>
			</div>
			<Table className="mt-8 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
				<TableHead>
					<TableRow>
						<TableHeader>Reg. Date</TableHeader>
						<TableHeader>Name</TableHeader>
						<TableHeader>Short Name</TableHeader>
						<TableHeader className="text-right">Amount</TableHeader>
					</TableRow>
				</TableHead>
				<TableBody>
					{organizations?.map((record) => (
						<TableRow key={record.id} href={`members/${record.id}`} title={`Record #${record.id}`}>
							<TableCell className="text-zinc-500">{new Date(record.created_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}</TableCell>
							<TableCell>
								<div className="flex items-center gap-2">
									<Avatar src={record.logo_url} className="size-6" />
									<span>{record.name}</span>
								</div>
                            </TableCell>
							<TableCell>
                                {record.short_name}
							</TableCell>
							<TableCell className="text-right">{record.subdomain}.clubathletix.com</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}
