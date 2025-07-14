'use client';
import { Combobox, ComboboxLabel, ComboboxOption } from '@/components/combobox';
import { Field } from '@/components/fieldset';
import { Input } from '@/components/input';
import { Database } from '@/database.types';
import { useEffect, useState } from 'react';

type OrganizationEvent = Database['public']['Tables']['organization_events']['Row'];
export default function Form() {
    const currentYear = new Date().getFullYear();
	const options = {
		event_types: [
			{ value: 'training', name: 'Training' },
			{ value: 'match', name: 'Match' },
		],
	};
    const [yearMonth, setYearMonth] = useState<{ year: string; month: string }>({
        year: currentYear.toString(),
        month: new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : (new Date().getMonth() + 1).toString(),
    });
    const [days, setDays] = useState<string[]>([]);

    useEffect(() => {
        let year = Number(yearMonth.year);
        let month = Number(yearMonth.month);
        if (Number(month) === 12) {
            month = 0;
            year++;
        }
        const date = new Date(year, month, 0);
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const daysArray = Array.from({ length: lastDay }, (_, i) => (i + 1 < 10 ? `0${i + 1}` : (i + 1).toString()));
        setDays(daysArray);
    }, [yearMonth]);

    console.log({days})

	return (
		<div className="mt-10 space-y-8 border-b border-gray-900/10 pb-12 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
			<Field className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 lg:grid-cols-4 xl:grid-cols-5">
				<label className="mt-2 text-sm font-bold" htmlFor="title">
					Title
				</label>
				<Input name="title" id="title" placeholder="Enter event name" className="sm:col-span-2" />
			</Field>

			<Field className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6 lg:grid-cols-4 xl:grid-cols-5">
				<label className="mt-2 text-sm font-bold" htmlFor="title">
					Type
				</label>
				<Combobox
					name="event_type"
					placeholder="Select event type"
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

            <div className='sm:grid sm:grid-cols-3'>
                <Field className="col-span-3 sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    <label className="mt-2 text-sm font-bold sm:col-span-1" htmlFor="year">
                        Date & time
                    </label>
                    <div className='sm:grid sm:grid-cols-3 xl:grid-cols-5 lg:col-span-3 xl:col-span-4 lg sm:gap-1'>
                        <Combobox
                            name="year"
                            placeholder="Year"
                            className='col-span-1'
                            options={Array.from({ length: 2 }, (_, i) => ({
                                value: (new Date().getFullYear() + i).toString(),
                                name: (new Date().getFullYear() + i).toString(),
                            }))}
                            displayValue={(opt) => (opt as { [k: string]: string }).name}
                            onChange={(opt) => {
                                setYearMonth(prev => ({
                                    ...prev,
                                    year: (opt as { [k: string]: string }).value,
                                }))
                            }}
                            defaultValue={{
                                name: currentYear.toString(),
                                value: currentYear.toString()
                            }}
                        >
                            {(opt) => (
                                <ComboboxOption key={(opt as { [k: string]: string }).value} value={opt}>
                                    <ComboboxLabel>{(opt as { [k: string]: string }).name}</ComboboxLabel>
                                </ComboboxOption>
                            )}
                        </Combobox>
                        <Combobox
                            name="month"
                            placeholder="Month"
                            className='xl:col-span-2'
                            options={Array.from({ length: 12 }, (_, i) => ({
                                value: `${i + 1}`,
                                name: new Date(currentYear, i, 1, 0, 0).toLocaleString('default', { month: 'long' }),
                            }))}
                            defaultValue={{
                                name: new Date(currentYear, new Date().getMonth(), 1, 0, 0).toLocaleString('default', { month: 'long' }),
                                value: `${new Date().getMonth() + 1}`
                            }}
                            displayValue={(opt) => (opt as { [k: string]: string }).name}
                            onChange={(opt) => {
                                setYearMonth(prev => ({
                                    ...prev,
                                    month: (opt as { [k: string]: string }).value,
                                }))
                            }}
                        >
                            {(opt) => (
                                <ComboboxOption key={(opt as { [k: string]: string }).value} value={opt}>
                                    <ComboboxLabel>{(opt as { [k: string]: string }).name}</ComboboxLabel>
                                </ComboboxOption>
                            )}
                        </Combobox>
                        <Combobox
                            name="day"
                            placeholder="Day"
                            className='col-span-1'
                            options={days.map(i => ({
                                value: i,
                                name: i,
                            }))}
                            displayValue={(opt) => (opt as { [k: string]: string }).name}
                            defaultValue={{
                                name: new Date().getDate().toString(),
                                value: new Date().getDate().toString()
                            }}
                        >
                            {(opt) => (
                                <ComboboxOption key={(opt as { [k: string]: string }).value} value={opt}>
                                    <ComboboxLabel>{(opt as { [k: string]: string }).name}</ComboboxLabel>
                                </ComboboxOption>
                            )}
                        </Combobox>
                    </div>
                </Field>
            </div>
		</div>
	);
}
