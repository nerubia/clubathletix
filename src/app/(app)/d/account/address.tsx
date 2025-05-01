'use client'

import { Input } from '@/components/input'
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox'
import { getCountries } from '@/data'
import { useState } from 'react'

export type Address = {
  street_1: string
  street_2?: string
  city_town: string;
  state_province: string;
  postal_zip_code: string;
  country: string;
}
export function Address({
  ['data-theme']: dataTheme,
  ...address
}: Address & { 'data-theme'?: 'light' | 'dark' }) {
  let countries = getCountries()
  let [country, setCountry] = useState(countries[0])

  return (
    <div className="grid grid-cols-2 gap-6" data-theme={dataTheme}>
      <div className='grid grid-cols-3 gap-6 col-span-2'>
        <Input
          aria-label="Street Address"
          name="street_1"
          placeholder="Street Address"
          defaultValue={address.street_1}
          className="col-span-2"
          data-theme={dataTheme}
        />
        <Input
          aria-label="No."
          name="street_2"
          placeholder="Unit / Bldg. #"
          defaultValue={address.street_2}
          className="col-span-1"
          data-theme={dataTheme}
        />
      </div>
      <Input aria-label="City" name="city_town" placeholder="City / Town" defaultValue={address.city_town} className="col-span-2 sm:col-span-1" data-theme={dataTheme} />
      <Listbox aria-label="Region" name="region" placeholder="Region" defaultValue={address.state_province} data-theme={dataTheme}>
        {country.regions.map((region) => (
          <ListboxOption key={region} value={region} data-theme='light'>
            <ListboxLabel>{region}</ListboxLabel>
          </ListboxOption>
        ))}
      </Listbox>
      <Input aria-label="Postal code" name="postal_zip_code" placeholder="Postal Code" defaultValue={address.postal_zip_code} data-theme={dataTheme} />
      <Listbox
        aria-label="Country"
        name="country"
        placeholder="Country"
        by="name"
        value={countries.find(c => c.name === address.country)}
        onChange={(country) => setCountry(country)}
        className="col-span-2 sm:col-span-1"
        data-theme={dataTheme}
      >
        {countries.map((country) => (
          <ListboxOption key={country.code} value={country} data-theme='light'>
            <img className="w-5 sm:w-4" src={country.flagUrl} alt="" />
            <ListboxLabel>{country.name}</ListboxLabel>
          </ListboxOption>
        ))}
      </Listbox>
    </div>
  )
}
