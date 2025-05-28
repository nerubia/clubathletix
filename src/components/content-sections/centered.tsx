import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'

export default function CenteredContentSection() {
  return (<div className="relative isolate overflow-hidden bg-white py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="absolute -top-80 left-[max(6rem,33%)] -z-10 transform-gpu blur-3xl sm:left-1/2 md:top-20 lg:ml-20 xl:top-3 xl:ml-56"
      >
        <div
          style={{
            clipPath:
              'polygon(63.1% 29.6%, 100% 17.2%, 76.7% 3.1%, 48.4% 0.1%, 44.6% 4.8%, 54.5% 25.4%, 59.8% 49.1%, 55.3% 57.9%, 44.5% 57.3%, 27.8% 48%, 35.1% 81.6%, 0% 97.8%, 39.3% 100%, 35.3% 81.5%, 97.2% 52.8%, 63.1% 29.6%)',
          }}
          className="aspect-801/1036 w-200.25 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
      <div className="mx-auto max-w-5xl text-base/7 text-gray-700">
        <p className="text-base/7 font-semibold text-gray-500">Launching soon this fall of {new Date().getFullYear()}</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-pink-900 sm:text-3xl">
          Capture the Moments.
        </h1>
        <h1 className="text-4xl font-semibold tracking-tight text-pretty text-pink-800 sm:text-4xl">
            Track the Growth.
        </h1>
        <h1 className="text-4xl font-semibold tracking-tight text-pretty text-pink-600 sm:text-5xl">
             Showcase the Talent.
        </h1>
        <div className="mt-10 max-w-2xl">
          <p>
            Track progress across the season with metrics that matter - Tracked Automatically or via Coach Upload
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <span aria-hidden="true" className="mt-1 size-5 flex-none">🏃‍♂️</span>
              <span>
                <strong className="font-semibold text-gray-900">Dribbling.</strong> Dribble completion

              </span>
            </li>
            <li className="flex gap-x-3">
              <span aria-hidden="true" className="mt-1 size-5 flex-none">🧠</span>

              <span>
                <strong className="font-semibold text-gray-900">Passing.</strong> Successful passes.
              </span>
            </li>
            <li className="flex gap-x-3">
              <span aria-hidden="true" className="mt-1 size-5 flex-none">🎯</span>

              <span>
                <strong className="font-semibold text-gray-900">Shot Accuracy.</strong> Drill-based metric. Shots on target vs attempted.
              </span>
            </li>
          </ul>
          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900">
            Who&rsquo;s It For?
          </h2>
          <ul role="list" className="mt-6">
            <li><CheckCircleIcon aria-hidden="true" className="inline mr-1 mb-0.5 size-4 flex-none text-pink-700" /> <span>Youth Players: Build a shareable season-long highlight & stat portfolio</span></li>
            <li><CheckCircleIcon aria-hidden="true" className="inline mr-1 mb-0.5 size-4 flex-none text-pink-700" /> <span>Parents: Stay informed and engaged in your athlete&rsquo;s growth</span></li>
            <li><CheckCircleIcon aria-hidden="true" className="inline mr-1 mb-0.5 size-4 flex-none text-pink-700" /> <span>Coaches: Use real data to guide training and match feedback</span></li>
            <li><CheckCircleIcon aria-hidden="true" className="inline mr-1 mb-0.5 size-4 flex-none text-pink-700" /> <span>Academies & Clubs: Provide next-gen tools to your players</span></li>
          </ul>
        </div>
    
        <div className="mt-16 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900">
            🚀 Ready to Elevate Your Game?
          </h2>
          <p className="mt-6">
            📆 Book your recording &amp; tracking service now<br />
            📱 (236) 777-1283
          </p>
        </div>
      </div>
    </div>
  )
}
