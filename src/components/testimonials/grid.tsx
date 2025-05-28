import { Heading, Subheading } from "../heading"
import { Testimonial } from "@/app/api/testimonial/types"

function groupRecords(records: Testimonial[]) {
    const firstColumn = [];
    const middleColumn = [];
    const lastColumn = [];
    let i = 0;
    while (i < records.length) {
        if (i < records.length) firstColumn.push(records[i++]);
        if (i < records.length && i > 2) middleColumn.push(records[i++]);
        if (i < records.length && i > 2) middleColumn.push(records[i++]);
        if (i < records.length) lastColumn.push(records[i++]);
    }
    return { firstColumn, middleColumn, lastColumn };
}

  export default async function TestimonialGrid({ items: records }: {
    items: Testimonial[]
  }) {
    records.sort(r => r.feature ? -1 : 0);
    const featured = records.shift()

    const {firstColumn, middleColumn, lastColumn} = groupRecords(records)

    return (
      <div className="relative isolate bg-gray-900 pt-24 pb-32 sm:pt-32 w-screen overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="ml-[max(50%,38rem)] aspect-1313/771 w-[82.0625rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc]"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="ml-[-22rem] aspect-1313/771 w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] xl:mr-[calc(50%-12rem)] xl:ml-0"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
          <div className="mx-auto max-w-2xl text-center">
            <Heading force="text-zinc-100">Testimonials</Heading>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
              What do parents &amp; players have to say about us...
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-gray-900 sm:mt-20 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
            {<div className="xl:col-span-2 xl:col-start-2 grid md:grid-cols-2 gap-y-8 md:gap-8">
                {featured && <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:row-span-2">
                        <blockquote className="p-6 text-lg font-semibold tracking-tight text-gray-900 sm:p-12 sm:text-xl/8">
                            <p>{`“${featured.body}”`}</p>
                        </blockquote>
                        <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
                            {/* <img
                            alt=""
                            src={images[0]}
                            className="size-10 flex-none rounded-full bg-gray-50"
                            /> */}
                            <div className="flex-auto">
                            <div className="font-semibold">{featured.customer.full_name}</div>
                            <div className="text-gray-600">
                                {`@${featured.customer.full_name.split(', ').reverse().map(w => w[0]).join('').toLowerCase()}`}
                            </div>
                            </div>
                            <Subheading force="text-indigo-700" className="h-10 w-auto flex-none">
                            NERUBIA
                            </Subheading>
                        </figcaption>
                    </figure>}
                {
                middleColumn.map((rec, idx) => <figure
                        key={idx}
                        className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 row-span-1 col-span-2"
                        >
                        <blockquote className="text-gray-900">
                            <p>{`“${rec.body}”`}</p>
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-x-4">
                            {/* <img
                            alt=""
                            src={images[rec.id % 2]}
                            className="size-10 rounded-full bg-gray-50"
                            /> */}
                            <div>
                                <div className="text-gray-600">
                                    {`@${rec.customer.full_name.split(', ').reverse().map(w => w[0]).join('').toLowerCase()}`}
                                </div>
                            </div>
                        </figcaption>
                    </figure>
                    )
                }
            </div>}
            <div className="grid md:grid-cols-2 xl:col-start-1 xl:flex xl:flex-col xl:flex-wrap gap-8 w-full">{
                firstColumn.map((rec, idx) => <figure key={idx}
                        
                        className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5 xl:w-full"
                      >
                        <blockquote className="text-gray-900">
                          <p>{`“${rec.body}”`}</p>
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-x-4">
                          {/* <img alt="" src={images[rec.id % 2]} className="size-10 rounded-full bg-gray-50" /> */}
                          <div>
                            <div className="text-gray-600">{`@${rec.customer.full_name.split(', ').reverse().map(w => w[0]).join('').toLowerCase()}`}</div>
                          </div>
                        </figcaption>
                      </figure>)}</div>
            <div className="xl:col-start-4 xl:flex xl:flex-col xl:flex-wrap gap-8 grid md:grid-cols-2">{
                lastColumn.map((rec, idx) => <figure key={idx}
                        
                        className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                      >
                        <blockquote className="text-gray-900">
                          <p>{`“${rec.body}”`}</p>
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-x-4">
                          {/* <img alt="" src={images[1 - (rec.id % 2)]} className="size-10 rounded-full bg-gray-50" /> */}
                          <div>
                            <div className="text-gray-600">{`@${rec.customer.full_name.split(', ').reverse().map(w => w[0]).join('').toLowerCase()}`}</div>
                          </div>
                        </figcaption>
                      </figure>)}</div>

          </div>
        </div>
      </div>
    )
  }
  