import { LockClosedIcon, UserGroupIcon, UsersIcon } from '@heroicons/react/20/solid';

export default function ParentalExpectationsPage() {
	return (
		<section className="relative mx-auto max-w-7xl">
			<div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
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

				<div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 md:max-w-none lg:mx-0 lg:max-w-7xl lg:grid-cols-2 lg:items-start lg:gap-y-10">
					<div className="lg:col-span-1 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:w-full lg:gap-x-8 lg:px-8">
						<div className="lg:pr-4">
							<p className="text-base/7 font-semibold text-red-600">A guide to a better development experience</p>

							<h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
								Parental Expectations
							</h1>

							<p className="mt-6 text-xl/8 text-gray-700">
								In order to obtain optimal success, it is necessary for the coaching staff to be in complete control of
								the athlete’s performance. In order to do so, we need the full cooperation and support from the parents.
								We are dealing with your child and the team on a daily basis and hold them accountable in each and every
								soccer situation.
							</p>
						</div>
					</div>
					<div className="-mt-12 text-zinc-700 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden lg:px-12 lg:py-12">
						<img
							alt=""
							src="/clubs/pfa/jeffrey-f-lin-ru9BnqtG1q0-unsplash.jpg"
							className="w-full max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10"
						/>

						<p className="pt-16">
							Unfortunately, addressing individual concerns is sometimes at the expense of the entire team. Please put
							the team and the coach first by setting an appointment 24 hours after the event.
						</p>

						<p className="mt-6">
							Following these simple suggestions will help give your child a better and more meaningful experience in
							the game. College coaches who are looking for players for their programs tell us regularly that they are
							observing your character and behavior during games and after. They consider it a major part of the
							decision-making process in choosing one player over another if they feel they will have to “deal” with
							that parent for 4 years. So like your sons/daughters everyone is being watched even when you don’t think
							so.
						</p>
					</div>
					<div className="grid-cols-2 space-y-8 lg:col-span-1 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:grid-cols-1 lg:gap-x-8 lg:gap-y-8 lg:px-8">
						<div className="text-base/7 text-gray-700 lg:pr-4">
							<ul role="list" className="space-y-8 text-gray-600">
								<li className="flex gap-x-3">
									<UsersIcon aria-hidden="true" className="mt-1 size-5 flex-none text-red-600" />

									<p>
										<strong className="font-semibold text-gray-900">Allow your child to play on their own.</strong>{' '}
										Please encourage your child to take responsibility for their own actions, rather than intervening
										yourself. Ask your child to address his/her concerns directly with the coaching staff. This develops
										them as individuals, holds them accountable for their own actions, and promotes maturity.
									</p>
								</li>
								<li className="flex gap-x-3">
									<UserGroupIcon aria-hidden="true" className="mt-1 size-5 flex-none text-red-600" />
									<span>
										<strong className="font-semibold text-gray-900">Respect the team.</strong> At no time is it
										appropriate to discuss other players’ performance to other players or parents on the team. Your own
										expectations and goals may differ from that of your child, please keep this in mind.
									</span>
								</li>
							</ul>
						</div>
						<div className="text-base/7 text-gray-700 lg:pr-4">
							<ul role="list" className="space-y-8 text-gray-600">
								<li className="flex gap-x-3">
									<LockClosedIcon aria-hidden="true" className="mt-1 size-5 flex-none text-red-600" />
									<p>
										<strong className="font-semibold text-gray-900">24-hour cool down period.</strong> If you feel the
										need to intervene, please allow <strong className="font-semibold text-red-700">24 hours</strong>{' '}
										after a match before approaching a staff coach to discuss your child’s performance. The coaches are
										the most invested people in the matches and this is an emotional time for everyone. We find that 24
										hours allows for cooler heads to prevail and promotes a more productive dialog. This applies to
										tournaments when coaches are inundated with logistical demands of scouting, prepping for next match
										and dealing with meals and other administrative concerns.
									</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
