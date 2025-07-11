import { Checkbox, CheckboxField } from '@/components/checkbox';
import { Description, Label } from '@/components/fieldset';
import { Heading } from '@/components/heading';
import { Text } from '@/components/text';
import { getCompetitionBySlug } from '@/services/competition';
import { getCompetitionDivision } from '@/services/division';
import { notFound } from 'next/navigation';
import { submitAction } from './actions';
import FormContainer from './form-container';

export default async function CompetitionRegistrationPage(props: { params: Promise<{ slug: string; division: string }> }) {
    const params = await props.params
    if (isNaN(Number(params.division))) {
        notFound();
    }
    const [division, competition] = await Promise.all([
        getCompetitionDivision(Number(params.division)),
        getCompetitionBySlug(params.slug)
    ]);
  return (
    <div className="relative isolate bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
              >
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect fill="white" width="100%" height="100%" strokeWidth={0} />
                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
              </svg>
            </div>
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              {division?.name} Division Registration
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              Limited spots available! Register now to secure your place in the {division?.name} division of the competition.
            </p>
            {Boolean(division) && <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Entry fee</span>
                  🎫
                </dt>
                <dd>
                  {division?.currency_code}{division?.fee}
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Format</span>
                  ⚖️
                </dt>
                <dd>
                  {division?.game_format}
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Halves</span>
                  ⏲️
                </dt>
                <dd>
                  {division?.half_time_length} halves
                </dd>
              </div>
            </dl>}
          </div>
        </div>
        <form action={submitAction} method="POST" className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48">
        {Boolean(competition) && 
          <FormContainer competition={competition as any} />
        }
        </form>
      </div>
    </div>
  )
}
