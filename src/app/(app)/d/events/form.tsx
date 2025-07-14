'use client';
import { Combobox, ComboboxLabel, ComboboxOption } from '@/components/combobox';
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown';
import { Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset';
import { Heading, Subheading } from '@/components/heading';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { Database } from '@/database.types';
import { ChevronDownIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type OrganizationEvent = {
    event_type: 'training' | 'match';
    location: string;
    starts_at: string;
    ends_at: string;
};
type Location = {
    id: number;
    name: string;
    street_1: string;
    street_2?: string;
    city_town: string;
    state_province: string;
    postal_zip_code: string;
};
type Team = {
    id: number;
    name: string;
    logo_url?: string;
    organizations: {
        id: number;
        short_name: string;
    }
}

export default function Form({
    "data-locations": locations,
    "data-teams": teams,
}: {
    'data-locations': Location[];
    'data-teams': Team[];
}) {
    const currentYear = new Date().getFullYear();
    
	const options = {
        age_groups: Array.from({ length: 12 }, (_, i) => (currentYear - i - 6)).sort((a, b) => b - a).map(year => ({
            value: year.toString(),
            name: year.toString(),
        })),
		event_types: [
			{ value: 'training', name: 'Training' },
			{ value: 'match', name: 'Match' },
		],
	};

	const [time, setDate] = useState<{ year: string; month: string; day: string }>({
		year: currentYear.toString(),
		month: new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1).toString(),
        day: new Date().getDate().toString(),
	});
	const [days, setDays] = useState<{
        name: string;
        value: string;
    }[]>([]);

    const [form, setForm] = useState<OrganizationEvent>({
        event_type: 'training',
        location: '',
        starts_at: new Date().toISOString(),
        ends_at: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
    });

	useEffect(() => {
		let year = Number(time.year);
		let month = Number(time.month);
		if (Number(month) === 12) {
			month = 0;
			year++;
		}
		const date = new Date(year, month, 0);
		const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

		setDays(Array.from({ length: lastDay }, (_, i) => (i + 1 < 10 ? `0${i + 1}` : (i + 1).toString())).map(d => ({
            name: d.toString(),
            value: d.toString(),
        })));

	}, [time]);

	return (
		<div className="divide-y divide-gray-900/10">
            <Fieldset>
                <Legend>Event details</Legend>
                <Text>
                    This information will be displayed publicly so be careful what you share.
                </Text>

                <FieldGroup className='md:grid md:grid-cols-2 md:gap-x-4 lg:gap-x-6 lg:grid-cols-5'>
                    <Field className='lg:col-span-1'>
                        <Label>Select Group</Label>
                        <Combobox
                            name="age_group"
                            placeholder="Age group"
                            options={options.age_groups}
                            displayValue={(opt) => (opt as { [k: string]: string }).name}
                        >
                            {(opt) => (
                                <ComboboxOption key={(opt as { [k: string]: string }).value} value={opt}>
                                    <ComboboxLabel>{(opt as { [k: string]: string }).name}</ComboboxLabel>
                                </ComboboxOption>
                            )}
                        </Combobox>
                    </Field>
                    <Field className='lg:col-span-1'>
                        <Label>Event Type</Label>
                        <Combobox
                            name="event_type"
                            placeholder="Select type"
                            options={options.event_types}
                            displayValue={(opt) => (opt as { [k: string]: string }).name}
                        >
                            {(opt) => (
                                <ComboboxOption key={(opt as { [k: string]: string }).value} value={opt}>
                                    <ComboboxLabel>{(opt as { [k: string]: string }).name}</ComboboxLabel>
                                </ComboboxOption>
                            )}
                        </Combobox>
                    </Field>

                    <Field className='lg:col-span-1'>
                        <Label>Year</Label>
                        <Combobox
							name="year"
							placeholder="Year"
							className="col-span-1"
							options={Array.from({ length: 2 }, (_, i) => ({
								value: (new Date().getFullYear() + i).toString(),
								name: (new Date().getFullYear() + i).toString(),
							}))}
							displayValue={(opt) => (opt as { [k: string]: string }).name}
							onChange={(opt) => {
								setDate((prev) => ({
									...prev,
									year: (opt as { [k: string]: string }).value,
								}));
							}}
							defaultValue={{
								name: currentYear.toString(),
								value: currentYear.toString(),
							}}
						>
							{(opt) => (
								<ComboboxOption key={(opt as { [k: string]: string }).value} value={opt}>
									<ComboboxLabel>{(opt as { [k: string]: string }).name}</ComboboxLabel>
								</ComboboxOption>
							)}
						</Combobox>
                    </Field>
                    <Field className='lg:col-span-1'>
                        <Label>Month</Label>
                        <Combobox
							name="month"
							placeholder="Month"
							options={Array.from({ length: 12 }, (_, i) => ({
								value: `${i + 1}`,
								name: new Date(currentYear, i, 1, 0, 0).toLocaleString('default', { month: 'long' }),
							}))}
							defaultValue={{
								name: new Date(currentYear, new Date().getMonth(), 1, 0, 0).toLocaleString('default', {
									month: 'long',
								}),
								value: `${new Date().getMonth() + 1}`,
							}}
							displayValue={(opt) => (opt as { [k: string]: string }).name}
							onChange={(opt) => {
								setDate((prev) => ({
									...prev,
									month: (opt as { [k: string]: string }).value,
								}));
							}}
						>
							{(opt) => (
								<ComboboxOption key={(opt as { [k: string]: string }).value} value={opt}>
									<ComboboxLabel>{(opt as { [k: string]: string }).name}</ComboboxLabel>
								</ComboboxOption>
							)}
						</Combobox>
                    </Field>
                    <Field className='lg:col-span-1'>
                        <Label>Day</Label>
                        <Combobox
							name="day"
							placeholder="Day"
							options={days}
							defaultValue={{
								name: time.day,
								value: time.day,
							}}
							displayValue={(opt) => (opt as { [k: string]: string }).name}
							onChange={(opt) => {
								setDate((prev) => ({
									...prev,
									day: (opt as { [k: string]: string }).value,
								}));
							}}
						>
							{(opt) => (
								<ComboboxOption key={(opt as { [k: string]: string }).value} value={opt}>
									<ComboboxLabel>{(opt as { [k: string]: string }).name}</ComboboxLabel>
								</ComboboxOption>
							)}
						</Combobox>
                    </Field>


                    
                    <Field className='lg:col-span-2'>
                        <Label>Location</Label>
                        <Combobox
							name="location_id"
							placeholder="Location"
							options={locations.map((_) => ({
								value: _.id.toString(),
								name: _.name,
							}))}
							displayValue={(opt) => (opt as { [k: string]: string }).name}
							onChange={(opt) => {
								
							}}
						>
							{(opt) => (
								<ComboboxOption key={(opt as { [k: string]: string }).value} value={opt}>
									<ComboboxLabel>{(opt as { [k: string]: string }).name}</ComboboxLabel>
								</ComboboxOption>
							)}
						</Combobox>
                    </Field>

                    <div />
                    <Field className='lg:col-span-2'>
                        <Label>Team</Label>
                        <div className='mt-3 w-full'>
                            <Dropdown>
                                <DropdownButton outline>
                                    Opponent
                                    <ChevronDownIcon />
                                </DropdownButton>
                                <DropdownMenu>
                                    {teams.map(t => (
                                        <DropdownItem onClick={() => setForm(prev => ({
                                            ...prev,
                                            team_id: t.id.toString(),
                                        }))} key={t.id}>
                                            {t.logo_url && <Image src={t.logo_url} alt={t.name} width={24} height={24} className="inline-block mr-2" />}
                                            {t.organizations.short_name} {t.name}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </Field>
                </FieldGroup>
            </Fieldset>
		</div>
	);
}
