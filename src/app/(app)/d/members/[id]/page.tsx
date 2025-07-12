import { Avatar } from '@/components/avatar';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import { DescriptionDetails, DescriptionList, DescriptionTerm } from '@/components/description-list';
import { Divider } from '@/components/divider';
import { Heading, Subheading } from '@/components/heading';
import { Link } from '@/components/link';
import { getMember } from '@/data';
import { BanknotesIcon, CalendarIcon, ChevronLeftIcon, CreditCardIcon } from '@heroicons/react/16/solid';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RefundMember } from './refund';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
	const { id } = await params;
	let member = await getMember(id);

	return {
		title: member && `Member #${member.id}`,
	};
}

export default async function Member({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	let member = await getMember(id);

	if (!member) {
		notFound();
	}

	return (
		<>
			<div className="max-lg:hidden">
				<Link href="/members" className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400">
					<ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
					Members
				</Link>
			</div>
			<div className="mt-4 lg:mt-8">
				<div className="flex items-center gap-4">
					<Heading>Member #{member.id}</Heading>
					<Badge color="lime">Successful</Badge>
				</div>
				<div className="isolate mt-2.5 flex flex-wrap justify-between gap-x-6 gap-y-4">
					<div className="flex flex-wrap gap-x-10 gap-y-4 py-1.5">
						<span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
							<BanknotesIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
							<span>US{member.amount.usd}</span>
						</span>
						<span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
							<CreditCardIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
							<span className="inline-flex gap-3">
								{member.payment.card.type}{' '}
								<span>
									<span aria-hidden="true">••••</span> {member.payment.card.number}
								</span>
							</span>
						</span>
						<span className="flex items-center gap-3 text-base/6 text-zinc-950 sm:text-sm/6 dark:text-white">
							<CalendarIcon className="size-4 shrink-0 fill-zinc-400 dark:fill-zinc-500" />
							<span>{member.date}</span>
						</span>
					</div>
					<div className="flex gap-4">
						<RefundMember outline amount={member.amount.usd}>
							Refund
						</RefundMember>
						<Button>Resend Invoice</Button>
					</div>
				</div>
			</div>
			<div className="mt-12">
				<Subheading>Summary</Subheading>
				<Divider className="mt-4" />
				<DescriptionList>
					<DescriptionTerm>Customer</DescriptionTerm>
					<DescriptionDetails>{member.customer.name}</DescriptionDetails>
					<DescriptionTerm>Event</DescriptionTerm>
					<DescriptionDetails>
						<Link href={member.event.url} className="flex items-center gap-2">
							<Avatar src={member.event.thumbUrl} className="size-6" />
							<span>{member.event.name}</span>
						</Link>
					</DescriptionDetails>
					<DescriptionTerm>Amount</DescriptionTerm>
					<DescriptionDetails>US{member.amount.usd}</DescriptionDetails>
					<DescriptionTerm>Amount after exchange rate</DescriptionTerm>
					<DescriptionDetails>
						US{member.amount.usd} &rarr; CA{member.amount.cad}
					</DescriptionDetails>
					<DescriptionTerm>Fee</DescriptionTerm>
					<DescriptionDetails>CA{member.amount.fee}</DescriptionDetails>
					<DescriptionTerm>Net</DescriptionTerm>
					<DescriptionDetails>CA{member.amount.net}</DescriptionDetails>
				</DescriptionList>
			</div>
			<div className="mt-12">
				<Subheading>Payment method</Subheading>
				<Divider className="mt-4" />
				<DescriptionList>
					<DescriptionTerm>Transaction ID</DescriptionTerm>
					<DescriptionDetails>{member.payment.transactionId}</DescriptionDetails>
					<DescriptionTerm>Card number</DescriptionTerm>
					<DescriptionDetails>•••• {member.payment.card.number}</DescriptionDetails>
					<DescriptionTerm>Card type</DescriptionTerm>
					<DescriptionDetails>{member.payment.card.type}</DescriptionDetails>
					<DescriptionTerm>Card expiry</DescriptionTerm>
					<DescriptionDetails>{member.payment.card.expiry}</DescriptionDetails>
					<DescriptionTerm>Owner</DescriptionTerm>
					<DescriptionDetails>{member.customer.name}</DescriptionDetails>
					<DescriptionTerm>Email address</DescriptionTerm>
					<DescriptionDetails>{member.customer.email}</DescriptionDetails>
					<DescriptionTerm>Address</DescriptionTerm>
					<DescriptionDetails>{member.customer.address}</DescriptionDetails>
					<DescriptionTerm>Country</DescriptionTerm>
					<DescriptionDetails>
						<span className="inline-flex gap-3">
							<img src={member.customer.countryFlagUrl} alt={member.customer.country} />
							{member.customer.country}
						</span>
					</DescriptionDetails>
					<DescriptionTerm>CVC</DescriptionTerm>
					<DescriptionDetails>
						<Badge color="lime">Passed successfully</Badge>
					</DescriptionDetails>
				</DescriptionList>
			</div>
		</>
	);
}
