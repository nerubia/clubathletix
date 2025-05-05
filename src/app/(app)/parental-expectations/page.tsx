import { ClipboardDocumentCheckIcon, LockClosedIcon, UserGroupIcon, UsersIcon } from '@heroicons/react/20/solid'

export default function ParentalExpectationsPage() {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">
        <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
          <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
            <img
              alt=""
              src="/clubs/pfa/jeffrey-f-lin-ru9BnqtG1q0-unsplash.jpg"
              className="absolute inset-0 size-full bg-gray-50 object-cover"
            />
          </div>
        </div>
        <div className="px-6 lg:contents">
          <div className="mx-auto max-w-2xl pt-16 pb-24 sm:pt-20 sm:pb-32 lg:mr-0 lg:ml-8 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
            <p className="text-base/7 font-semibold text-red-600">Guidelines – the 24 hours rule</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                Parental Expectations
            </h1>
            <div className="mt-10 max-w-xl text-base/7 text-gray-700 lg:max-w-none">
              <p>In order to obtain optimal success, it is necessary for the coaching staff to be in complete control of the athlete’s performance. In order to do so, we need the full cooperation and support from the parents. We are dealing with your child and the team on a daily basis and hold them accountable in each and every soccer situation.</p>
              <p className="mt-10">
              Our staff will provide the necessary motivation and technical/tactical instruction. <br />
              We would hope that as parents you would support the academy and its teams as well as your own child. 
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <ClipboardDocumentCheckIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Let the coaches do their job.</strong> As parents we expect you to cheer and support the team appropriately and in a positive manner. We do not expect or ask you to coach the team. Please be humble and represent your child and our academy in the spirit of the sport.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <UsersIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />

                  <p>
                    <strong className="font-semibold text-gray-900">Intervention policy.</strong> Please encourage your child to take responsibility for his own actions, rather than intervening yourself. 
              Ask your child to address his/her concerns directly with the coaching staff. 
              This develops them as individuals, holds them accountable for their own actions, and promotes maturity.
                  </p>
                </li>
                <li className="flex gap-x-3">
                  <LockClosedIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
                  <p>
                    <strong className="font-semibold text-gray-900">24-hour cool down period.</strong> If you feel the need to intervene, please allow <strong className="font-semibold text-red-700">24 hours</strong> after a match before approaching a staff coach to discuss your child’s performance. 
                    The coaches are the most invested people in the matches and this is an emotional time for everyone. We find that 24 hours allows for cooler heads to prevail and promotes a more productive dialog. This applies to tournaments when coaches are inundated with logistical demands of scouting, prepping for next match and dealing with meals and other administrative concerns.
                  </p>
                </li>
                <li className="flex gap-x-3">
                  <UserGroupIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Respect the team.</strong> At no time is it appropriate to discuss other players’ performance to other players or parents on the team. Your own expectations and goals may differ from that of your child, please keep this in mind.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
              Unfortunately, addressing individual concerns is sometimes at the expense of the entire team. 
              Please put the team and the coach first by setting an appointment 24 hours after the event.
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Trust the process for a better experience</h2>
              <p className="mt-6">
              Following these simple suggestions will help give your child a better and more meaningful experience in the game. College coaches who are looking for players for their programs tell us regularly that they are observing your character and behavior during games and after. They consider it a major part of the decision-making process in choosing one player over another if they feel they will have to “deal” with that parent for 4 years. So like your sons/daughters everyone is being watched even when you don’t think so.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
