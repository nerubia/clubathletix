'use client'

import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useEffect, useState } from 'react'
import { Combobox } from '../combobox'
import { Listbox, ListboxLabel, ListboxOption } from '../listbox'

export default function Birthdate({ id }: { id: string }) {
  const [ageGroup, setAgeGroup] = useState<string>()
  const [query, setQuery] = useState<{
    month?: string
    year?: string
    date?: string
  }>({})
  const [selectedMonth, setSelectedMonth] = useState<{
    label: string;
    value: string;
  }>()
  const [selectedDay, setSelectedDay] = useState<{
    label: string;
    value: string;
  }>()
  const [selectedYear, setSelectedYear] = useState<{
    label: string;
    value: string;
  }>()
    const months = [
        { label: 'January', value: '01' },
        { label: 'February', value: '02' },
        { label: 'March', value: '03' },
        { label: 'April', value: '04' },
        { label: 'May', value: '05' },
        { label: 'June', value: '06' },
        { label: 'July', value: '07' },
        { label: 'August', value: '08' },
        { label: 'September', value: '09' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' },
    ]

    const filteredMonths =
      !query.month
        ? months
        : months.filter((month) => {
            return month.label.toLowerCase().includes(query.month!.toLowerCase())
          })

    // Days



    const days = Array.from({ length: 31 }, (_, i) => ({
      label: (i + 1).toString(),
      value: (i + 1).toString(),
    }))
    const filteredDays =
    !query.date
      ? days
      : days.filter((d) => {
          return d.label.toLowerCase().includes(query.date!.toLowerCase())
        })

    // Years
    const years = Array.from({ length: new Date().getFullYear() - 2011 - 1 }, (_, i) => {
      const year = 2009 + i
      return { label: year.toString(), value: year.toString() } }
    )
    const filteredYears =
    !query.year
      ? years
      : years.filter((year) => {
          return year.label.toLowerCase().includes(query.year!.toLowerCase())
        })

  useEffect(() => {
    if (selectedYear) {
      let n = new Date().getFullYear() - Number(selectedYear.value) + (new Date().getMonth() > 7 ? 1 : 0)
      if (n > 6) setAgeGroup(`U${n}`)
      else setAgeGroup('Micro')
    }
  }, [selectedDay, selectedMonth, selectedYear])

  return (
    <div className='flex gap-2 mt-2.5 items-center'>

        <div className="relative sm:w-36">
          <Listbox
                  aria-label="Month"
                  name="month"
                  placeholder="Month"
                  value={months.find(c => c.value === selectedMonth?.value)}
                  onChange={setSelectedMonth}
                  className="col-span-2 sm:col-span-1"
                  data-theme='light'
                >
                  {(filteredMonths.length ? filteredMonths : months).map((month) => (
                    <ListboxOption key={month.label} value={month.value} data-theme='light'>
                      <ListboxLabel>{month.label}</ListboxLabel>
                    </ListboxOption>
                  ))}
            </Listbox>
        </div>

      <div className='flex gap-2'>
        <Listbox
              aria-label="Day"
              name="day"
              placeholder="Day"
              value={days.find(c => c.value === selectedDay?.value)}
              onChange={setSelectedMonth}
              className="col-span-2 sm:col-span-1"
              data-theme='light'
            >
              {days.map((month) => (
                <ListboxOption key={month.label} value={month.value} data-theme='light'>
                  <ListboxLabel>{month.label}</ListboxLabel>
                </ListboxOption>
              ))}
        </Listbox>


        
        <Listbox
              aria-label="Year"
              name="year"
              placeholder="Year"
              value={days.find(c => c.value === selectedYear?.value)}
              onChange={setSelectedYear}
              className="col-span-2 sm:col-span-1"
              data-theme='light'
            >
              {years.map((d) => (
                <ListboxOption key={d.label} value={d.value} data-theme='light'>
                  <ListboxLabel>{d.label}</ListboxLabel>
                </ListboxOption>
              ))}
        </Listbox>
      </div>
      <div className='text-zinc-800 font-semibold'>{ageGroup}</div>
    </div>
  )
}
