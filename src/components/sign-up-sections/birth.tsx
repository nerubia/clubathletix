'use client'

import { useEffect, useState } from 'react'
import { Listbox, ListboxLabel, ListboxOption } from '../listbox'

export default function Birthdate(props: { id: string; defaultValue?: string; onChange(v: string): void }) {
  let bdate = (props.defaultValue || '').split(' ') || []
  const [ageGroup, setAgeGroup] = useState<string>()
  const [query, setQuery] = useState<{
    month?: string
    year?: string
    date?: string
  }>({})
  const [selectedYear, setSelectedYear] = useState<string>(bdate.pop() || '')
  const [selectedMonth, setSelectedMonth] = useState<string>(bdate.pop() || '')
  const [selectedDay, setSelectedDay] = useState<string>(bdate.pop() || '')
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
      value: (i + 1).toString().length > 1 ? (i + 1).toString() : `0${(i + 1).toString()}`,
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
      let n = new Date().getFullYear() - Number(selectedYear) + (new Date().getMonth() > 7 ? 1 : 0)
      if (n > 6) setAgeGroup(`U${n}`)
      else setAgeGroup('Micro')
    }
    if (selectedDay && selectedMonth && selectedYear)
    props.onChange([selectedYear!, selectedMonth!, selectedDay!].join('-'))
  }, [selectedDay, selectedMonth, selectedYear])

  return (
    <div className='flex gap-2 mt-2.5 items-center col-span-2'>
        <Listbox
                aria-label="Month"
                name="birth_month"
                placeholder="Month"
                defaultValue={months.find(c => c.value === selectedMonth)?.value || ''}
                onChange={setSelectedMonth}
                className="w-12"
                data-theme='light'
              >
                {(filteredMonths.length ? filteredMonths : months).map((month) => (
                  <ListboxOption key={month.label} value={month.value} data-theme='light'>
                    <ListboxLabel>{month.label}</ListboxLabel>
                  </ListboxOption>
                ))}
          </Listbox>

        <div className='w-28'>
          <Listbox
                aria-label="Day"
                name="birth_date"
                placeholder="Day"
                defaultValue={days.find(c => c.value === selectedDay)?.value || ''}
                onChange={setSelectedDay}
                data-theme='light'
              >
                {days.map((d) => (
                  <ListboxOption key={d.label} value={d.value} data-theme='light'>
                    <ListboxLabel className='text-center w-6'>{d.label}</ListboxLabel>
                  </ListboxOption>
                ))}
          </Listbox>
        </div>


        <div className='w-36'>
        <Listbox
              aria-label="Year"
              name="birth_year"
              placeholder="Year"
              defaultValue={years.find(c => c.value === selectedYear)?.value || ''}
              onChange={setSelectedYear}
              data-theme='light'
            >
              {years.map((d) => (
                <ListboxOption key={d.label} value={d.value} data-theme='light'>
                  <ListboxLabel>{d.label}</ListboxLabel>
                </ListboxOption>
              ))}
        </Listbox>
        </div>
      <div className='text-zinc-800 font-semibold w-20 text-right'>{ageGroup}</div>
      
    </div>
  )
}
