import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import Birthdate from './birth'
import PlanSelect from './plan'
import Form from './form'
import RegistrationForm from './form'

export default function Example() {
  return (
    <div className="relative isolate bg-white" id="signup">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-24">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">

            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              Sign up
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600">
              <strong>Summer Training 2025</strong><br />
              Develop fundamental soccer skills, improve fitness levels, enhance tactical understanding, and foster teamwork among youth players.
            </p>
            <div className="justify-center lg:justify-end relative flex aspect-[719/680] w-full grayscale">
              <svg viewBox="0 0 655 680" fill="none" className="h-full">
                  <g clipPath="url(#:S1:-clip)" className="group"><g className="origin-center scale-100 transition duration-500 motion-safe:group-hover:scale-105"><foreignObject width="655" height="680"><video width="100%" autoPlay loop playsInline muted className="overflow-hidden rounded-2xl -mt-48">
                    <source src="/pf/video.mp4" type="video/mp4" height="240" />Your browser does not support the video tag.</video></foreignObject></g><use href="#:S1:-shape" strokeWidth="2" className="stroke-neutral-950/10"></use></g><defs><clipPath id=":S1:-clip"><path id=":S1:-shape" d="M537.827 9.245A11.5 11.5 0 0 1 549.104 0h63.366c7.257 0 12.7 6.64 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 586.87 151h-28.275a15.999 15.999 0 0 0-15.689 12.862l-59.4 297c-1.98 9.901 5.592 19.138 15.689 19.138h17.275l.127.001c.85.009 1.701.074 2.549.009 11.329-.874 21.411-7.529 24.88-25.981.002-.012.016-.016.023-.007.008.009.022.005.024-.006l24.754-123.771A11.5 11.5 0 0 1 580.104 321h63.366c7.257 0 12.7 6.639 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 617.87 472H559c-22.866 0-28.984 7.98-31.989 25.931-.004.026-.037.035-.052.014-.015-.02-.048-.013-.053.012l-24.759 123.798A11.5 11.5 0 0 1 490.87 631h-29.132a14.953 14.953 0 0 0-14.664 12.021c-4.3 21.502-23.18 36.979-45.107 36.979H83.502c-29.028 0-50.8-26.557-45.107-55.021l102.4-512C145.096 91.477 163.975 76 185.902 76h318.465c10.136 0 21.179-5.35 23.167-15.288l10.293-51.467Zm-512 160A11.5 11.5 0 0 1 37.104 160h63.366c7.257 0 12.7 6.639 11.277 13.755l-25.6 128A11.5 11.5 0 0 1 74.87 311H11.504c-7.257 0-12.7-6.639-11.277-13.755l25.6-128Z" fillRule="evenodd" clipRule="evenodd"></path></clipPath></defs></svg>
            </div>
            <dl className="mt-10 space-y-4 text-base/7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                </dt>
                <dd>
                  6067 - 150 Street, 
                  <br />
                  Surrey BC
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                </dt>
                <dd>
                  <a href="tel:+1 (236) 777-1283" className="hover:text-gray-900">
                    +1 (236) 777-1283
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <RegistrationForm />
      </div>
    </div>
  )
}
