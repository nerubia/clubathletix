import Link from 'next/link';

export default function HomePageHeader({ media = [] }: { media: string[] }) {
	const sources: {
		type: 'video' | 'image';
		url: string;
	}[] = [
		{
			type: 'image',
			url: '/pf/photo-1.jpg',
		},
		{
			type: 'image',
			url: '/pf/video.mp4',
		},
		{
			type: 'image',
			url: '/pf/girl-juggle.jpg',
		},
		{
			type: 'image',
			url: '/pf/warmup.jpg',
		},
		{
			type: 'image',
			url: '/pf/girls-ball.jpg',
		},
	];

	for (const item of media) {
		let type: 'video' | 'image' = 'image';
		if (item.toLowerCase().endsWith('.mp4')) {
			type = 'video';
		}
		sources.shift();
		sources.push({
			type,
			url: item,
		});
	}

	return (
		<div className="bg-white">
			<main>
				<div className="relative isolate">
					<svg
						aria-hidden="true"
						className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)] stroke-gray-200"
					>
						<defs>
							<pattern
								x="50%"
								y={-1}
								id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
								width={200}
								height={200}
								patternUnits="userSpaceOnUse"
							>
								<path d="M.5 200V.5H200" fill="none" />
							</pattern>
						</defs>
						<svg x="50%" y={-1} className="overflow-visible fill-gray-50">
							<path
								d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
								strokeWidth={0}
							/>
						</svg>
						<rect fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" width="100%" height="100%" strokeWidth={0} />
					</svg>
					<div
						aria-hidden="true"
						className="absolute top-0 right-0 left-1/2 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
					>
						<div
							style={{
								clipPath:
									'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
							}}
							className="aspect-801/1036 w-[50.0625rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
						/>
					</div>
					<div className="overflow-hidden">
						<div className="mx-auto max-w-7xl px-6 pt-36 pb-32 sm:pt-30 lg:px-8 lg:pt-32">
							<div className="mx-auto max-w-2xl gap-x-14 md:max-w-none lg:mx-0 lg:flex lg:items-center">
								<div className="relative w-full lg:max-w-lg lg:shrink-0 xl:max-w-xl">
									<h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900">
										Developing players who think fast, move faster, & own the ball.
									</h1>
									<p className="mt-8 pr-4 font-medium text-pretty text-gray-500 sm:max-w-md lg:max-w-none lg:text-xl/8">
										Led by a seasoned professional athlete with extensive international training and pro sports
										experience, our dynamic program offers a holistic approach to skill enhancement, fitness
										development, and mental resilience. Through personalized coaching, tailored workouts, and
										mentorship, participants will gain invaluable insights, honing their athletic prowess while
										cultivating essential life skills for success both on and off the field. Prepare to unleash your
										potential and elevate your game.
									</p>
									<div className="mt-10 flex max-w-xs flex-col gap-x-6 gap-y-4 lg:flex-row lg:items-center">
										<Link
											href="/#signup-form"
											className="max-w-60 rounded-md bg-red-800 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
										>
											Sign up
										</Link>
										<Link href="/#signup" className="text-gray-900 md:text-base/6 md:font-semibold">
											Learn more <span aria-hidden="true">→</span>
										</Link>
									</div>
								</div>
								<div className="mt-14 flex justify-end gap-8 sm:-mt-72 sm:justify-start sm:pl-60 lg:mt-0 lg:pl-0">
									<div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
										<div className="relative">
											{sources[0].type === 'image' && (
												<img
													alt=""
													src={sources[0].url}
													className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
												/>
											)}
											{sources[0].type === 'video' && (
												<div className="relative">
													<video
														width="100%"
														autoPlay
														loop
														playsInline
														muted
														className="-mt-48 overflow-hidden rounded-2xl"
													>
														<source src={sources[0].url} type="video/mp4" height="240" />
														Your browser does not support the video tag.
													</video>
													<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
												</div>
											)}
											<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
										</div>
									</div>
									<div className="mr-auto w-44 flex-none space-y-8 pt-40 sm:mr-0 sm:pt-52 lg:pt-36">
										<div className="relative">
											{sources[1].type === 'video' && (<video
												width="100%"
												autoPlay
												loop
												playsInline
												muted
												className="-mt-48 overflow-hidden rounded-2xl"
											>
												<source src={sources[1].url} type="video/mp4" height="240" />
												Your browser does not support the video tag.
											</video>
											)}
                                            {sources[1].type === 'image' && (
												<img
													alt=""
													src={sources[1].url}
													className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
												/>
											)}
											<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
										</div>
										<div className="relative">
                                            {sources[2].type === 'video' && (<video
												width="100%"
												autoPlay
												loop
												playsInline
												muted
												className="overflow-hidden rounded-2xl"
											>
												<source src={sources[2].url} type="video/mp4" height="240" />
												Your browser does not support the video tag.
											</video>
											)}
                                            {sources[2].type === 'image' && (
												<img
													alt=""
													src={sources[2].url}
													className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
												/>
											)}
											<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
										</div>
									</div>
									<div className="hidden w-44 flex-none space-y-8 pt-32 sm:pt-0 lg:block">
										<div className="relative">
                                            {sources[3].type === 'video' && (<video
												width="100%"
												autoPlay
												loop
												playsInline
												muted
												className="overflow-hidden rounded-2xl"
											>
												<source src={sources[3].url} type="video/mp4" height="240" />
												Your browser does not support the video tag.
											</video>
											)}
                                            {sources[3].type === 'image' && (
												<img
													alt=""
													src={sources[3].url}
													className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
												/>
											)}
											<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
										</div>
										<div className="relative">
                                            {sources[4].type === 'video' && (<video
												width="100%"
												autoPlay
												loop
												playsInline
												muted
												className="overflow-hidden rounded-2xl"
											>
												<source src={sources[4].url} type="video/mp4" height="240" />
												Your browser does not support the video tag.
											</video>
											)}
                                            {sources[4].type === 'image' && (
												<img
													alt=""
													src={sources[4].url}
													className="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
												/>
											)}
											<div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
