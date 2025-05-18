import RegistrationForm from './form'
import ScheduleTable from './schedule'

export default function SignUpSection({ address = 'Cambridge Soccer Park - 6067 - 150 Street, Surrey BC' }: { address: string }) {
  return (
    <div className="relative isolate " id="signup">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-24">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-xl">

            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl mb-2">
              Sign up
            </h2>
            
            <ScheduleTable data-organization={1} />
          </div>
        </div>
        <RegistrationForm />
      </div>
    </div>
  )
}
