'use client';

import { Input } from '@/components/input';
import { Listbox, ListboxLabel, ListboxOption } from '@/components/listbox';
import { getCountries } from '@/data';
import { useEffect, useState } from 'react';

export type Address = {
	street_1: string;
	street_2?: string;
	city_town: string;
	state_province: string;
	postal_zip_code: string;
	country: string;
};
export function Address({
	['data-theme']: dataTheme,
	onChange,
	...address
}: Address & { 'data-theme'?: 'light' | 'dark'; onChange?(addr: Address): void }) {
	let countries = getCountries();
	let [country, setCountry] = useState(countries[0]);
	const [addr, setAddress] = useState<Address>();
	useEffect(() => {
		onChange && onChange(addr as unknown as Address);
	}, [addr]);
	return (
		<div className="grid grid-cols-2 gap-6" data-theme={dataTheme}>
			<div className="col-span-2 grid grid-cols-3 gap-6">
				<Input
					aria-label="Street Address"
					name="street_1"
					placeholder="Street Address"
					value={address.street_1}
					className="col-span-2"
					data-theme={dataTheme}
					onChange={(v) => {
						setAddress((prev) => ({
							...(prev as unknown as Address),
							[v.target.name]: v.target.value,
						}));
					}}
				/>
				<Input
					aria-label="No."
					name="street_2"
					placeholder="Unit / Bldg. #"
					value={address.street_2}
					className="col-span-1"
					data-theme={dataTheme}
					onChange={(v) => {
						setAddress((prev) => ({
							...(prev as unknown as Address),
							[v.target.name]: v.target.value,
						}));
					}}
				/>
			</div>
			<Input
				aria-label="City"
				name="city_town"
				placeholder="City / Town"
				value={address.city_town}
				className="col-span-2 sm:col-span-1"
				data-theme={dataTheme}
				onChange={(v) => {
					setAddress((prev) => ({
						...(prev as unknown as Address),
						[v.target.name]: v.target.value,
					}));
				}}
			/>
			<div className="col-span-2 sm:col-span-1">
				<Listbox
					aria-label="Region"
					name="region"
					placeholder="Region"
					value={address.state_province || 'British Columbia'}
					data-theme={dataTheme}
					onChange={(v) => {
						setAddress((prev) => ({
							...(prev as unknown as Address),
							state_province: v,
						}));
					}}
				>
					{country.regions.map((region) => (
						<ListboxOption key={region} value={region} data-theme="light">
							<ListboxLabel>{region}</ListboxLabel>
						</ListboxOption>
					))}
				</Listbox>
			</div>
			<Input
				className="w-1/3"
				aria-label="Postal code"
				name="postal_zip_code"
				placeholder="Postal Code"
				value={address.postal_zip_code}
				data-theme={dataTheme}
				onChange={(v) => {
					setAddress((prev) => ({
						...(prev as unknown as Address),
						[v.target.name]: v.target.value,
					}));
				}}
			/>

			<div className="col-span-1">
				<Listbox
					aria-label="Country"
					name="country"
					placeholder="Country"
					by="name"
					value={countries.find((c) => c.name === address.country)}
					onChange={(v) => {
						setCountry(v);
						setAddress((prev) => ({
							...(prev as unknown as Address),
							country: v.name,
						}));
					}}
					className="col-span-2 sm:col-span-1"
					data-theme={dataTheme}
				>
					{countries.map((country) => (
						<ListboxOption key={country.code} value={country} data-theme="light">
							<img className="w-5 sm:w-4" src={country.flagUrl} alt="" />
							<ListboxLabel>{country.name}</ListboxLabel>
						</ListboxOption>
					))}
				</Listbox>
			</div>
		</div>
	);
}
