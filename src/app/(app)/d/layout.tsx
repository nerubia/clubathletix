import { Account } from '@/app.types';
import { getEvents } from '@/data';
import { ApplicationLayout } from '../application-layout';
import { getAccount } from './account/actions';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	let events = await getEvents();
	const user = await getAccount();

	return (
		<ApplicationLayout events={events} account={user.customer as unknown as Account}>
			{children}
		</ApplicationLayout>
	);
}
