import { Heading } from "../heading"

export default function Sponsors() {
    return (
      <div className="bg-gray-900 py-24 sm:py-32" id="sponsors">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg/8 font-semibold text-white">Proudly sponsored and supported by</h2>
          <div className="mx-auto mt-10 max-w-lg flex items-center justify-center gap-x-8 gap-y-10 sm:max-w-xl sm:gap-x-20 lg:mx-0 lg:max-w-none flex-wrap">
            
            <Heading force="text-white" className="!font-bold text-center text-xl! lg:col-span-1 col-span-2">CLUBATHLETIX</Heading>
            <Heading force="text-white" className="!font-bold text-center text-2xl! lg:col-span-1 col-span-2">nerubia</Heading>
            <img
              alt="Bird"
              src="/clubs/pfa/bird.png"
              width={60}
              height={24}
              className="col-span-2 max-h-6 object-contain lg:col-span-1"
            />
          </div>
        </div>
      </div>
    )
  }
  