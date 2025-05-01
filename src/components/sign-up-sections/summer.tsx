import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Birthdate from './birth'
import PlanSelect from './plan'
import Form from './form'
import RegistrationForm from './form'
import AgeGroups from './age-groups'
import { MapPinIcon } from '@heroicons/react/16/solid'
import { Heading, Subheading } from '../heading'

export default function Example() {
  return (
    <div className="relative isolate bg-white" id="signup">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-24">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-xl">

            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl mb-2">
              Sign up
            </h2>
            <Heading force='text-red-700'>Summer Training 2025</Heading>
            
            <dl className="mt-0 space-y-4 text-sm text-gray-600">
              <div className="flex gap-x-1 items-center">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <MapPinIcon aria-hidden="true" className="h-4 w-4 text-red-600" />
                </dt>
                <dd>
                  Cambridge Soccer Park - 6067 - 150 Street, Surrey BC
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
