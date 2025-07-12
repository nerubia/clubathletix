import { FixtureCard } from '@/components/cards/fixture';
import { stringToBase64URL } from '@supabase/ssr';

export default async function SchedulePage() {
	const Authorization = await stringToBase64URL(
		`${process.env.CALENDLY_CLIENT_ID || ''}:${process.env.CALENDLY_CLIENT_SECRET || ''}`
	);
	const tokenXhr = await fetch(`${process.env.CALENDLY_AUTH_TOKEN_HOST || 'https://api.calendly.com'}`, {
		method: 'POST',
		body: JSON.stringify({
			grant_type: 'authorization_code',
			redirect_uri: process.env.CALENDLY_REDIRECT_URI || 'http://localhost:3001',
		}),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Basic ${Authorization}`,
		},
	});
	return (
		<div className="w-screen">
			<div className="relative isolate overflow-hidden px-6 py-24 sm:py-20 lg:overflow-visible lg:px-0">
				<div className="absolute inset-0 -z-10 overflow-hidden">
					<svg
						aria-hidden="true"
						className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200"
					>
						<defs>
							<pattern
								x="50%"
								y={-1}
								id="e813992c-7d03-4cc4-a2bd-151760b470a0"
								width={200}
								height={200}
								patternUnits="userSpaceOnUse"
							>
								<path d="M100 200V.5M.5 .5H200" fill="none" />
							</pattern>
						</defs>
						<svg x="50%" y={-1} className="overflow-visible fill-gray-50">
							<path
								d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
								strokeWidth={0}
							/>
						</svg>
						<rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
					</svg>
				</div>

				<div className="mx-auto">
					<FixtureCard
						data={{
							id: 1,
							name: 'Training Schedule',
							starts_at: new Date().toISOString(),
							ends_at: new Date(new Date().setHours(new Date().getHours() + 2)).toISOString(),
							mondays: '6:00 PM - 8:00 PM',
							tuesdays: '6:00 PM - 8:00 PM',
							wednesdays: '6:00 PM - 8:00 PM',
							thursdays: '6:00 PM - 8:00 PM',
							fridays: '6:00 PM - 8:00 PM',
							saturdays: '10:00 AM - 12:00 PM',
							sundays: '10:00 AM - 12:00 PM',
							is_active: true,
							locations: {
								name: 'Main Training Ground',
								city_town: 'City Center',
							},
							programs: [],
						}}
					/>
				</div>
			</div>
		</div>
	);
}
