import { getCompetitionBySlug } from '@/services/competition';
import { notFound } from 'next/navigation';
import CTA from './cta';
import { stringFromBase64URL } from '@supabase/ssr';
import { Heading, Subheading } from '@/components/heading';
import { Text } from '@/components/text';
import DivisionsCTA from './divisions-cta';

function Backdrop() {
	return (
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
	);
}
export default async function CompetitionPage(props: { params: Promise<{ slug: string }>, searchParams: Promise<{ team?: string }> }) {
	const params = await props.params;
	const search = await props.searchParams;

    try {
        const images = [
            'https://viplaril6wogm0dr.public.blob.vercel-storage.com/clubathletix/pfa/uploads/competitions/u15.jpg',
            'https://viplaril6wogm0dr.public.blob.vercel-storage.com/clubathletix/pfa/uploads/competitions/u12.jpg',
            'https://viplaril6wogm0dr.public.blob.vercel-storage.com/clubathletix/pfa/uploads/competitions/u8.jpg',
        ]
        if (params.slug) {
            const competition = await getCompetitionBySlug(params.slug);
            
            if (competition) {
                return (
                    <div className="w-screen" id="top">
                        <div className='sm:hidden w-full h-18' />
                        <div className="relative isolate overflow-hidden sm:py-20 lg:overflow-visible">
                            <div className="mx-auto max-w-7xl">
                                <div className="overflow-hidden py-1 px-1 sm:rounded-3xl bg-slate-900 sm:w-[calc(100%-6rem)] mx-auto">
                                    <div className="relative isolate">
                                        <div className="sm:rounded-3xl">
                                            <div className="mx-auto w-full bg-white/[0.03] px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:py-20 xl:gap-x-20 xl:px-20">
                                                {competition.organizations.logo_url && <img
                                                    alt={competition.organizations.name}
                                                    src={competition.organizations.logo_url}
                                                    className="h-auto w-24 object-cover mx-auto mb-6"
                                                />}
                                                <div className="w-full flex-auto">
                                                    <h2 className="text-4xl font-semibold tracking-tight text-center text-pretty text-white sm:text-5xl">{competition.name}</h2>

                                                    <p className="mt-2 text-center text-lg/8 text-pretty text-gray-400">
                                                        {competition.description}
                                                    </p>
                                                    <Heading force="text-white text-center">📆 {competition.start_date && new Date(competition.start_date).toDateString()} - {competition.end_date && new Date(competition.end_date).toDateString()}</Heading>
                                                    {search.team ? <>
                                                        <h2 className="text-2xl font-semibold tracking-tight text-center text-pretty text-white sm:text-3xl my-4">🎉 Thanks for signing {stringFromBase64URL(search.team) || ''} up 🎉</h2>
                                                        <p className="mt-2 text-center text-lg/8 text-pretty text-gray-400">
                                                            We&rsquo;ve sent you a confirmation email with the details to your registration. <br />Please check your inbox and spam folder for the confirmation email.<br />
                                                            We&rsquo;ll be in touch with more details after receiving your registration fee!
                                                        </p>
                                                    </> : <div className='mt-6 text-center'>
                                                        {/* <Heading force="text-white text-center">Each team plays each other once</Heading>
                                                        <Heading force="text-white text-center">Top 2 teams advance to the finals</Heading> */}
                                                    </div>
                                                    }
                                                </div>
                                            </div>
                                            </div>
                                            <div
                                            aria-hidden="true"
                                            className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
                                            >
                                                <div
                                                    style={{
                                                    clipPath:
                                                        'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                                                    }}
                                                    className="aspect-1318/752 w-329.5 flex-none bg-linear-to-r from-[#80caff] to-[#4f46e5] opacity-20"
                                                />
                                            </div>
                                    </div>
                                    </div>
                            </div>
                        </div>

                        <section className='flex flex-col gap-6 mb-6'>
                            <DivisionsCTA items={competition.divisions} data={{
                                ...competition,
                                divisions: undefined,
                            } as Record<string, any>} />
                        </section>
                    </div>
                );
            }
        }
    } catch (error) {
        notFound();
    }

	notFound();
}
