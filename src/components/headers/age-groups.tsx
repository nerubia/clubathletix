import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const age_group: {
    name: string;
    href: string;
}[] = []

const year = new Date().getFullYear();
for (let i = year - 15; i < year - 5; i++) {
    age_group.push({
        name: `U${year - i}`,
        href: `/schedule/${i}`,
    })
}

export default function AgeGroups() {
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
        <span>Schedule</span>
        <ChevronDownIcon aria-hidden="true" className="size-5" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
      >
        <div className="w-24 shrink rounded-xl bg-white p-4 text-sm/6 font-semibold text-gray-900 shadow-lg ring-1 ring-gray-900/5">
          {age_group.map((item) => (
            <a key={item.name} href={item.href} className="block p-2 hover:text-red-600">
              {item.name} age group
            </a>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  )
}