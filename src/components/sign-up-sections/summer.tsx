import RegistrationForm from './form'
import AgeGroups from './age-groups'
import { MapPinIcon } from '@heroicons/react/16/solid'
import { Heading } from '../heading'

export default function SignUpSection({ address = 'Cambridge Soccer Park - 6067 - 150 Street, Surrey BC' }: { address: string }) {
  return (
    <div className="relative isolate bg-white" id="signup">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-24">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-xl">

            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl mb-2">
              Sign up
            </h2>
            <Heading force='text-red-700'>PF Academy</Heading>
            
            <dl className="mt-0 space-y-4 text-sm text-gray-600">
              <div className="flex gap-x-1 items-center">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <MapPinIcon aria-hidden="true" className="h-4 w-4 text-red-600" />
                </dt>
                <dd>
                  {address}
                </dd>
              </div>
            </dl>
            <AgeGroups />
          </div>
        </div>
        <RegistrationForm />
      </div>
    </div>
  )
}
