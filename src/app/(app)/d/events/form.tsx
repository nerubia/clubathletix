'use client';
import { Button } from '@/components/button';
import { Combobox, ComboboxLabel, ComboboxOption } from '@/components/combobox';
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown';
import { Field, FieldGroup, Fieldset, Label, Legend } from '@/components/fieldset';
import { Heading, Subheading } from '@/components/heading';
import { Input } from '@/components/input';
import { Text } from '@/components/text';
import { Database } from '@/database.types';
import { Team } from '@/services/teams';
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
    id: string;
    name: string;
    street_1: string;
    street_2?: string;
    city_town: string;
    state_province: string;
    postal_zip_code: string;
};

export default function Form({
    "data-locations": locations,
    "data-teams": teams,
}: {
    'data-locations': Location[];
    'data-teams': Team[];
}) {
    const dt = new Date();
    const currentYear = dt.getFullYear();
    
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

	const [time, setDate] = useState<{ year: string; month: string; day: string; time: string; }>({
		year: currentYear.toString(),
		month: new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1).toString(),
        day: new Date().getDate().toString(),
        time: dt.toLocaleDateString('en-CA', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).split(':')[0],
	});
	const [days, setDays] = useState<{
        name: string;
        value: string;
    }[]>([]);

    const [form, setForm] = useState<OrganizationEvent>({
        event_type: 'training',
        location: '',
        starts_at: `${time.year}-${time.month}-${time.day}T${time.time}:00`,
        ends_at: `${time.year}-${time.month}-${time.day}T${time.time}:00`,
    });

    const [team, setSelectedTeam] = useState<Team | null>(null);

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

                <FieldGroup className='lg:grid lg:gap-x-6 lg:grid-cols-5'>

                    <Field className='lg:col-span-2'>
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

                    <Field className='lg:col-span-3'>
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
								name: new Date(currentYear, i, 1, 0, 0).toLocaleString('default', { month: '2-digit' }),
							}))}
							defaultValue={{
								name: new Date(currentYear, new Date().getMonth(), 1, 0, 0).toLocaleString('default', {
									month: '2-digit',
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

                    <Field className='lg:col-span-1'>
                        <Label>From</Label>
                        <Input type='text' name="from" placeholder="HH:MM" defaultValue={`${(dt.getHours() + 1).toString().padStart(2, '0')}:00`} onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(':').map(Number);
                            setForm((prev) => ({    
                                ...prev,
                                starts_at: `${time.year}-${time.month}-${time.day}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`,
                            }));
                        }} />
                    </Field>

                    <Field className='lg:col-span-1'>
                        <Label>To</Label>
                        <Input type='text' name="from" placeholder="HH:MM" defaultValue={`${(dt.getHours() + 2).toString().padStart(2, '0')}:30`} onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(':').map(Number);
                            setForm((prev) => ({    
                                ...prev,
                                ends_at: `${time.year}-${time.month}-${time.day}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:00`,
                            }));
                        }} />
                    </Field>

                    <Field className='lg:col-span-3'>
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
								setForm((prev) => ({
                                    ...prev,
                                    location: (opt as { [k: string]: string }).name,
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
                        <Label>Team</Label>
                        <div className='mt-3 w-full'>
                            <Dropdown>
                                <DropdownButton outline className='w-full text-left justify-between!' aria-label="Select team" disabled={teams.length === 0}>
                                    {team?.name || 'Select team'}
                                    <ChevronDownIcon />
                                </DropdownButton>
                                <DropdownMenu>
                                    {teams.sort((a, b) => {
                                        if (!a || !b) return 0;
                                        else {
                                            if (b.name! > a.name!) return -1;
                                            if (b.name! < a.name!) return 1;
                                        }
                                        return 0;
                                    }).map(t => (
                                        <DropdownItem onClick={(e: any) => {
                                            const selection = teams.find(s => s.id === Number(e.currentTarget.dataset.value))
                                            setSelectedTeam(selection || null);
                                        }} key={t.id} data-value={t.id}>
                                            {(t.logo_url || t.organization.logo_url) && <Image src={`${t.logo_url || t.organization.logo_url}`} alt={t.name!} width={24} height={24} className="inline-block mr-2 rounded-full" />}
                                            {t.organization.short_name}{t.organization.short_name === t.name ? '' : ` ${t.name}`}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </Field>
                </FieldGroup>
            </Fieldset>

            <div className='flex items-center justify-end gap-4 pt-6'>
                <Button color="lime" type='button' onClick={() => console.log({
                    ...form,
                    opponent_team: team?.name || '',
                })}>Create event</Button>
            </div>
		</div>
	);
}
