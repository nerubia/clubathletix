import { Heading } from "../heading"

export default function Sponsors() {
    return (
      <div className="bg-gray-900 py-24 sm:py-32" id="footer">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg/8 font-semibold text-white">Proudly sponsored and supported by</h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            
            <Heading force="text-white" className="!font-bold text-center">CLUBATHLETIX</Heading>
            <Heading force="text-white" className="!font-bold text-center">Nerubia</Heading>
            <img
              alt="Bird"
              src="/clubs/pfa/bird.png"
              width={60}
              height={24}
              className="col-span-2 max-h-6 w-full object-contain lg:col-span-1"
            />
            <img
              alt="Tuple"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/tuple-logo-white.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-8 w-full object-contain lg:col-span-1"
            />
            <img
              alt="SavvyCal"
              src="https://tailwindcss.com/plus-assets/img/logos/158x48/savvycal-logo-white.svg"
              width={158}
              height={48}
              className="col-span-2 max-h-8 w-full object-contain lg:col-span-1"
            />
          </div>
        </div>
      </div>
    )
  }
  