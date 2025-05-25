import { CheckIcon } from '@heroicons/react/20/solid'
import { Heading } from '../heading'

const tiers = [
  {
    name: 'Player Match Highlight',
    id: 'highlight',
    href: 'https://wa.me/12367771283',
    price: 'CA$19',
    unit: '/match',
    description: 'HD-quality footage using professional AI-assisted cameras for your player (based on position).',
    features: ['Goalie moments (saves / assists)' , 'Defensive moments (successful tackles)' , 'Midfielders moments (crosses, passes, successful plays)', 'Attackers moments (goals, assists, crosses)', 'View your video 4 - 12 hours after the match.*'],
  },
  {
    name: 'Player Season Highlights',
    id: 'season',
    href: 'https://wa.me/12367771283',
    price: 'CA$99',
    unit: '/5 matches',
    description: 'Perfect for college recruitment or personal keepsakes, we create highlight compilations of 5 of your best matches.',
    features: [
      'Player Match Highlights of 5 matches',
      'With our ClubAthletix AI software suite, stitch everything up to create a 45-second video.',
      'Downloadable video, plus',
      'Featured in ClubAthletix Instagram page for easy sharing with scouts and coaches',
    ],
  },
  {
    name: 'Player Evo Highlight',
    id: 'evohighlight',
    href: 'https://wa.me/12367771283',
    price: 'CA$39',
    unit: '/match',
    description: 'Get those those close up shots and get a REEL highlight for the ages!',
    features: [
      'Player Match Highlights, plus',
      'We get additional close up / angled shots of your player in high definition.',
      'We process and curate everything up to create a 45-second reel (portrait).',
      'Featured in ClubAthletix Instagram page for easy sharing with scouts and coaches',
    ],
    video: ''
  },
  
]

export default function PricingSection() {
  return (
    <div className="isolate overflow-hidden bg-gray-900" id="pricing-section">
        <div className="absolute left-1/2 hidden md:block"><svg
            viewBox="0 0 1208 1024"
            className="absolute left-1/2 -z-10 h-256 -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)] xl:top-0"
          >
            <ellipse cx={604} cy={512} rx={604} ry={512} fill="url(#6d1bd035-0dd1-437e-93fa-59d316231eb0)" />
            <defs>
              <radialGradient id="6d1bd035-0dd1-437e-93fa-59d316231eb0">
                <stop stopColor="#D67775" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg></div>
      <div className="mx-auto max-w-7xl px-6 pb-96 text-center lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl">
            Capture Every Moment. Elevate Every Player.
          </p>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-2xl text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
            Whether you’re chasing college opportunities, coaching a rising team, or a parent wanting to preserve every goal — our platform is designed to support the journey.
          </p>
        </div>
      </div>
      <div className="flow-root isolate pb-24 sm:pb-32">
        <div className="-mt-80">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className={`flex rounded-3xl bg-white shadow-xl ring-1 ring-gray-900/10  ${tier.id === 'playerevoplus' ? 'col-span-2' : 'justify-between flex-col p-8 sm:p-10'}`}
                >
                  <div className={`${tier.id === 'playerevoplus' ? 'p-8 ' : ''} flex flex-col`}>
                    <h3 id={tier.id} className="text-base/7 font-semibold text-rose-600">
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
                          <CheckIcon aria-hidden="true" className="h-6 w-5 flex-none text-rose-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className='flex-1 grow' />
                    {tier.id === 'playerevoplus' && <a
                        href={tier.href}
                        aria-describedby={tier.id}
                        className="mt-8 block rounded-md bg-rose-600 px-3.5 py-2 text-center text-sm/6 font-semibold text-white shadow-xs hover:bg-rose-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                    >
                        Book (1st come 1st serve basis)
                    </a>}
                  </div>
                    {tier.id !== 'playerevoplus' && <div className='flex-1 grow' />}
                    {tier.id !== 'playerevoplus' && <a
                        href={tier.href}
                        aria-describedby={tier.id}
                        className="mt-8 block rounded-md bg-rose-600 px-3.5 py-2 text-center text-sm/6 font-semibold text-white shadow-xs hover:bg-rose-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                    >
                        Book (1st come 1st serve basis)
                    </a>}

                    {tier.id === 'playerevoplus' && <div className="mt-4 flex items-baseline gap-x-2">
                        <div className="relative">
                            <video autoPlay loop playsInline muted className="overflow-hidden rounded-r-2xl -mt-4">
                            <source src="/videos/reel.mp4" type="video/mp4" />Your browser does not support the video tag.</video>    
                        </div>
                    </div>}
                </div>
              ))}
              <div className="relative">
                            <video autoPlay loop playsInline muted className="overflow-hidden rounded-2xl">
                            <source src="/videos/reel.mp4" type="video/mp4" />Your browser does not support the video tag.</video>    
                        </div>
              <div className="flex flex-col items-start gap-x-8 gap-y-6 sm:gap-y-10 lg:col-span-2 lg:flex-row lg:items-center">
                <div className="lg:min-w-0 lg:flex-1">
                  <Heading force='text-rose-400'>How it works</Heading>
                  <ol className='list-decimal ml-4'>

                    <li className="mt-1 text-sm/7">
                        <strong>Book a Match</strong><br/>
                        Let us know your game schedule — we handle the rest.
                    </li>
                    <li className="mt-1 text-sm/7">
                        <strong>We Show Up & Record</strong><br/>
                        Our crew arrives early, sets up, and captures videos of your player(s).
                    </li>
                    <li className="mt-1 text-sm/7">
                        <strong>You Receive Edited Video</strong><br/>
                        Get your match footage (4 - 12 hrs) + any selected highlight packages online in a matter of days.
                    </li>
                  </ol>

                </div>

                <div className="relative w-full lg:w-3/5 xl:pl-4">
                    <video width="100%" autoPlay loop playsInline muted className="overflow-hidden rounded-2xl">
                        <source src="/videos/go.mp4" type="video/mp4" height="240" />Your browser does not support the video tag.
                    </video>
                
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
