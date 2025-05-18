'use client';
import { buildMonth } from '@/utils/calendar/build-month';
import { formatDate, getDayOfWeek, getMonthName } from '@/utils/calendar/date-formatter';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useCallback, useEffect, useState } from 'react';
import { Program } from './sign-up-sections/age-groups';
import { stringToUTC } from '@/utils/calendar/date-helpers';
import { Heading, Subheading } from './heading';

function classNames(...classes: unknown[]) {
    return classes.filter(Boolean).join(' ');
}

export default function CalendarView({
    selected,
    'data-api': url,
}: {
    selected: Date;
    'data-api': string;
}) {
    const [current, setDate] = useState<Date>();
    const [visibleDays, setDays] = useState<{
        [month: string]: {
            date: string;
            isCurrentMonth?: boolean;
            isToday?: boolean;
            isSelected?: boolean;
            schedule?: Record<string, unknown>[];
        }[];
    }>();
    const [dayEntries, setDayEntries] = useState<
        {
            name: string;
            crest: string;
            colours: string;
            location: string;
            date: string;
            time: string;
            programs: Program[];
            isOnce: boolean;
        }[]
    >([]);

    const retrieve = useCallback(
        async (d: Date) => {
            if (visibleDays) {
                const months = Object.keys(visibleDays);

                const from =
                    visibleDays[months[0]][14].date.split('-').slice(0, 2).join('-') + '-01';
                const toDate = new Date(visibleDays[months[1]][14].date);
                toDate.setMonth(toDate.getMonth() + 1);
                toDate.setDate(0);
                const xhr = await fetch(
                    `${url}&from=${from} 00:00:00&to=${formatDate(toDate)} 23:59:59`
                );
                const results = (await xhr.json()) as Record<string, string>[];
                const dow = `${getDayOfWeek(d).toLowerCase()}s`;
                setDayEntries(
                    results.map((entry) => ({
                        name: entry.name,
                        crest: entry.crest,
                        colours: entry.colours,
                        date: entry.date,
                        location: entry.location,
                        programs: entry.programs as unknown as Program[],
                        time: entry.time,
                        isOnce: Boolean(entry.isOnce),
                    }))
                );
            }
            // setSchedules(results);
        },
        [current, visibleDays]
    );

    useEffect(() => {
        if (selected) setDate(selected);
    }, []);

    useEffect(() => {
        if (current) {
            if (!visibleDays?.[getMonthName(current)]) {
                const nextMonth = new Date(current);
                nextMonth.setMonth(nextMonth.getMonth() + 1);
                const months = {
                    [getMonthName(current)]: buildMonth(current),
                    [getMonthName(nextMonth)]: buildMonth(nextMonth),
                };
                setDays(months);
            }
        }
    }, [current]);

    useEffect(() => {
        if (current && visibleDays) {
            let from: Date | undefined;
            for (let d of Object.values(visibleDays)) {
                const firstDay = d.find((day) => day.date.endsWith('01'));
                if (firstDay) {
                    let date = new Date(stringToUTC(firstDay.date));
                    if (!from || from > date) {
                        from = date;
                    }
                }
            }
            if (from) {
                retrieve(from);
            }
        }
    }, [visibleDays]);

    return visibleDays && current ? (
        <div className="w-full mx-auto rounded-xl md:grid md:grid-cols-3 md:divide-x md:divide-slate-200">
            {Object.keys(visibleDays).map((month, idx) => (
                <div key={current.getMonth() + idx} className="md:px-8">
                    <div className="flex items-center">
                        <h2 className="flex-auto text-sm font-semibold text-slate-600">
                            {new Intl.DateTimeFormat('en-CA', {
                                month: 'long',
                                year: 'numeric',
                            }).format(new Date(visibleDays[month][10].date))}
                        </h2>
                        {idx === 0 && (
                            <button
                                onClick={() => {
                                    let [y, m, d] = visibleDays[month][10].date
                                        .split('-')
                                        .map(Number);
                                    m--;
                                    if (m === 0) {
                                        m = 12;
                                        y--;
                                    }
                                    const goto = new Date(y, m - 2, d);
                                    setDate(goto);
                                }}
                                type="button"
                                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-slate-700 hover:text-slate-600"
                            >
                                <span className="sr-only">Previous month</span>
                                <ChevronLeftIcon className="size-5" aria-hidden="true" />
                            </button>
                        )}
                        {idx !== 0 && (
                            <button
                                type="button"
                                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-slate-600 hover:text-slate-700"
                                onClick={() => {
                                    let [y, m, d] = visibleDays[month][10].date
                                        .split('-')
                                        .map(Number);
                                    if (m === 12) {
                                        m = 0;
                                        y++;
                                    }
                                    const goto = new Date(y, m, d);
                                    setDate(goto);
                                }}
                            >
                                <span className="sr-only">Next month</span>
                                <ChevronRightIcon className="size-5" aria-hidden="true" />
                            </button>
                        )}
                    </div>
                    <div className="mt-10 grid grid-cols-7 text-center text-xs/6 text-slate-500">
                        <div>S</div>
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                    </div>
                    <div className="mt-2 grid grid-cols-7 text-sm">
                        {visibleDays[month].map((day, dayIdx) => (
                            <div key={day.date} className="py-2">
                                <button
                                    type="button"
                                    className={classNames(
                                        (day.date === formatDate(new Date()) ||
                                            day.date === formatDate(current)) &&
                                            'text-white',
                                        day.date !== formatDate(current) &&
                                            day.date === formatDate(new Date()) &&
                                            'bg-red-600',
                                        day.date === formatDate(current) && 'bg-red-600',
                                        !day.isSelected &&
                                            !day.isToday &&
                                            day.isCurrentMonth &&
                                            'text-slate-700',
                                        !day.isSelected &&
                                            !day.isToday &&
                                            !day.isCurrentMonth &&
                                            'text-slate-400',
                                        day.isSelected &&
                                            day.date === formatDate(current) &&
                                            'text-red-600',
                                        day.isSelected &&
                                            day.date !== formatDate(current) &&
                                            'text-red-200',
                                        day.date !== formatDate(current) &&
                                            'hover:bg-red-500 hover:text-white',
                                        (day.isSelected || day.date === formatDate(current)) &&
                                            'font-semibold text-white',
                                        'mx-auto flex size-8 items-center justify-center rounded-full'
                                    )}
                                    onClick={() => {
                                        const [y, m, d] = day.date.split('-').map(Number);
                                        setDate(new Date(y, m - 1, d));
                                    }}
                                >
                                    <time dateTime={day.date}>
                                        {day.date.split('-')?.pop()?.replace(/^0/, '')}
                                    </time>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <section className="mt-12 md:mt-0 md:pl-14 overflow-x-hidden">
                <h2 className="text-base font-semibold text-slate-700">
                    <time dateTime="2022-01-21">
                        {new Intl.DateTimeFormat('en-CA', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            weekday: 'short',
                        }).format(current)}
                    </time>
                </h2>
                <div className="mt-4 flex flex-col gap-y-1 text-sm/6 text-slate-500">
                    {dayEntries
                        .filter((d) => {
                            const date = new Date(stringToUTC(d.date));
                            return formatDate(date) === formatDate(current);
                        })
                        .map((d, idx) => (
                            <div key={`${d.name} ${idx + 1}`} className={`${d.isOnce && d.crest && 'pl-20'} ${(d.isOnce ? `relative rounded-xl px-4 pt-2.5 shadow-xl shadow-black/20 pb-4 text-white mb-4 ${d.colours?.split(',')?.[1] || 'bg-slate-600'}` : '')}`}>
                                {d.crest && d.isOnce && <img className='absolute top-1/2 -translate-y-1/2 left-2' src={d.crest} />}
                                <Heading force={d.isOnce ? `text-white${d.crest && d.isOnce ? ' text-base!' : ''}` : 'text-black'} level={3}>{d.name as string}</Heading>
                                <Subheading force={d.isOnce ? 'text-white' : 'text-red-700'}>{d.time}</Subheading>
                                <p className="text-xs/4 w-40">
                                    {d.location.split(',').map((w, line) => <span key={line} className="w-full">{w}<br /></span>)}
                                </p>
                                <div className="mt-4 flex justify-start gap-6 sm:mt-0">
                                {d.programs.slice(0, 2).map((program, subIdx) => {
                                    if (subIdx === 0) return <div key={program.id} data-key={program.id} className="ml-auto w-40 flex-none space-y-8 pt-0 mt-12">
                                            <div className="relative rounded-xl bg-black shadow-lg overflow-hidden">
                                                <img
                                                    alt=""
                                                    src={program.image_url || "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"}
                                                    className="aspect-2/3 w-full object-cover opacity-50"
                                                />
                                                <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                                                <div className='absolute top-0 w-full h-full text-xl/6 font-bold text-white'>
                                                    <div className='p-2 absolute top-0'>
                                                        {program.name}
                                                        <p className='font-medium text-xs mt-1'>
                                                            {program.min_age}-{program.max_age} year-olds
                                                        </p>
                                                    </div>
                                                    <div className='p-2 absolute text-sm bottom-0'>{program.coaches.join(' • ')}</div>
                                                </div>
                                            </div>
                                    </div>
                                    
                                    return <div key={program.id} className="mr-auto w-40 flex-none space-y-6 sm:mr-0 -mt-16">
                                        {d.programs.slice(1).map((etc, etcIdx) => <div data-id={program.id} key={`${idx}-${etcIdx}`} className="relative rounded-xl bg-black shadow-lg overflow-hidden">
                                            <img
                                                alt=""
                                                src={etc.image_url || "https://images.unsplash.com/photo-1485217988980-11786ced9454?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&h=528&q=80"}
                                                className="aspect-2/3 w-full object-cover opacity-50"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset" />
                                            <div className='absolute top-0 w-full h-full text-xl/6 font-bold text-white'>
                                                <div className='p-2 absolute top-0'>
                                                    {etc.name}
                                                    <p className='font-medium text-xs mt-1'>{etc.min_age}-{etc.max_age} year-olds</p>
                                                </div>
                                                <div className='p-2 absolute text-sm bottom-0'>{etc.coaches.join(' • ')}</div>
                                            </div>
                                        </div>)}
                                    </div>
                                })}
                                </div>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    ) : (
        'Loading'
    );
}
