import { CheckIcon } from '@heroicons/react/20/solid'

const tiers = [
  {
    name: 'Record',
    id: 'record',
    href: 'whatsapp:+12367771283',
    price: 'CA$79',
    unit: '/match',
    description: 'HD-quality footage using professional AI-assisted cameras, with elevated tripod for maximum coverage.',
    features: ['Full shareable link', 'Event Tagging & Match Highlights' , 'View your video 6 - 12 hours after the match.'],
  },
  {
    name: 'Evo+',
    id: 'evolutionplus',
    href: 'whatsapp:+12367771283',
    price: 'CA$129',
    unit: '/match',
    description: 'Get the full match plus a curated team highlight reel.',
    features: [
      'Everything in the "Record" package',
      'Team highlight reels',
      'Analytics (possession ratio, passing rate, etc.)',
      'Get a shareable highlight reel posted into Instagram for your team',
      'Downloadable highlight reel',
    ],
  },
  {
    name: 'Player Evo+',
    id: 'playerevoplus',
    href: 'whatsapp:+12367771283',
    price: 'CA$99',
    unit: '/season',
    description: 'Get the full match plus a curated team highlight reel.',
    features: [
      'Everything in the "Record" package',
      'Player Evolution Highlight Reel (45 seconds)',
      'Get a highlight reel posted into Instagram for you to easily share',
      'Downloadable highlight reel',
    ],
  },
]

export default function Example() {
  return (
    <div className="isolate overflow-hidden bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-96 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-base/7 font-semibold text-red-400">Record Your Matches</h2>
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl">
            Capture Every Moment. Elevate Every Player.
          </p>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-2xl text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Professional Match Recording & Highlight Services for Youth Soccer. 
          </p>
          <svg
            viewBox="0 0 1208 1024"
            className="absolute -top-10 left-1/2 -z-10 h-256 -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:-top-12 md:-top-20 lg:-top-12 xl:top-0"
          >
            <ellipse cx={604} cy={512} rx={604} ry={512} fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)" />
            <defs>
              <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                <stop stopColor="#D67775" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div className="flow-root bg-white pb-24 sm:pb-32">
        <div className="-mt-80">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`flex justify-between rounded-3xl bg-white shadow-xl ring-1 ring-gray-900/10  ${tier.id === 'playerevoplus' ? 'col-span-2' : 'flex-col p-8 sm:p-10'}`}
                >
                  <div className={`${tier.id === 'playerevoplus' ? 'p-8 ' : ''} flex flex-col`}>
                    <h3 id={tier.id} className="text-base/7 font-semibold text-red-600">
                      {tier.name}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-x-2">
                      <span className="text-5xl font-semibold tracking-tight text-gray-900">{tier.price}</span>
                      <span className="text-base/7 font-semibold text-gray-600">{tier.unit}</span>
                    </div>
                    <p className="mt-6 text-base/7 text-gray-600">{tier.description}</p>
                    <ul role="list" className="mt-10 space-y-4 text-sm/6 text-gray-600">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-red-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className='flex-1' />
                    <a
                        href={tier.href}
                        aria-describedby={tier.id}
                        className="mt-8 block rounded-md bg-red-600 px-3.5 py-2 text-center text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                        Book (1st come 1st serve basis)
                    </a>
                  </div>

                    {tier.id === 'playerevoplus' && <div className="mt-4 flex items-baseline gap-x-2">
                        <div className="relative">
                            <video autoPlay loop playsInline muted className="overflow-hidden rounded-r-2xl -mt-4">
                            <source src="/videos/reel.mp4" type="video/mp4" />Your browser does not support the video tag.</video>    
                        </div>
                    </div>}
                </div>
              ))}
              <div className="flex flex-col items-start gap-x-8 gap-y-6 sm:gap-y-10 lg:col-span-2 lg:flex-row lg:items-center">
                <div className="lg:min-w-0 lg:flex-1">
                  <h3 className="text-base/7 font-semibold text-red-600">How it works</h3>
                  <ol className='list-decimal'>

                    <li className="mt-1 text-base/7 text-gray-600">
                        <strong>Book a Match</strong><br/>
                        Let us know your game schedule — we handle the rest.
                    </li>
                    <li className="mt-1 text-base/7 text-gray-600">
                        <strong>We Show Up & Record</strong><br/>
                        Our crew arrives early, sets up, and captures the entire match.
                    </li>
                    <li className="mt-1 text-base/7 text-gray-600">
                        <strong>You Receive Edited Video</strong><br/>
                        Get your match footage (3 - 8 hrs) + any selected highlight packages online in a matter of days.
                    </li>
                  </ol>

                </div>

                  <div className="relative w-full lg:w-1/2">
                    <video width="100%" autoPlay loop playsInline muted className="overflow-hidden rounded-2xl">
                        <source src="/videos/go.mp4" type="video/mp4" height="240" />Your browser does not support the video tag.
                    </video>
                    <div className='mt-2 w-full text-right'>
                        <a
                            href="whatsapp:+12367771283"
                            className="rounded-md px-3.5 py-2 text-sm/6 font-semibold text-red-600 ring-1 ring-red-200 ring-inset hover:ring-red-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Contact us to book <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
