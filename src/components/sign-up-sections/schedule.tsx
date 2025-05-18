'use client'
import { Address } from "@/app/(app)/d/account/address";
import { useCallback, useEffect, useState } from "react";
import { Heading } from "../heading";
import { CalendarDateRangeIcon, ClockIcon, MapPinIcon } from "@heroicons/react/16/solid";
import AgeGroups, { Program } from "./age-groups";
import { formatDate } from "@/utils/calendar/date-formatter";

type Schedule = {
    id: number;
    name: string;
    starts_at: string;
    ends_at?: string;
    mondays?: string;
    tuesdays?: string;
    wednesdays?: string;
    thursdays?: string;
    fridays?: string;
    saturdays?: string;
    sundays?: string;
    is_active?: boolean;

    locations: Address & { name: string }
    programs: Program[]
};

export default function ScheduleTable(p: { 'data-organization': number }) {
    const organization_id = p["data-organization"]
    const [schedules, setSchedules] = useState<Schedule[]>([])

    const retrieve = useCallback(async () => {
        const xhr = await fetch(`/api/programs?organization_id=${organization_id}`)
        const results = await xhr.json()
        console.log(results)
        setSchedules(results);
    }, [])

    useEffect(() => {
        retrieve()
    }, [])
    return <div className="grid xl:grid-cols-2 gap-3">{
        schedules.map((s, idx) => (<section key={s.name}><Heading force='text-red-800'>{s.name}</Heading>
        <dl className="mt-0 space-y-4 text-sm text-gray-600">
          <div className="flex gap-x-1 items-start ">
            <dt className="flex-none">
              <MapPinIcon aria-hidden="true" className="h-4 w-4 text-red-600 mt-0.5" />
            </dt>
            <dd>
              {s.locations.name}, {s.locations.city_town}
            </dd>
          </div>
        </dl>
        <dl className="mt-1 space-y-4 text-sm text-gray-600">
          <div className="flex gap-x-1 items-start ">
            <dt className="flex-none">
              <CalendarDateRangeIcon aria-hidden="true" className="h-4 w-4 text-red-600 mt-0.5" />
            </dt>
            <dd>
              {[new Date(s.starts_at).toDateString(), s.ends_at ? new Date(s.ends_at).toDateString() : ''].filter(Boolean).join(' to ')}
            </dd>
          </div>
        </dl>
        
        <dl className="mt-1 mb-6 space-y-4 text-sm text-gray-600">
          <div className="flex gap-x-1 items-start">
            <dt className="flex-none">
              <span className="sr-only">Address</span>
              <ClockIcon aria-hidden="true" className="h-3 w-4 text-red-600 mt-1" />
            </dt>
            <dd className="text-pre">
              {[
                s.mondays ? `Mondays, ${s.mondays}` : '',
                s.tuesdays ? `Tuesdays, ${s.tuesdays}` : '',
                s.wednesdays ? `Wednesdays, ${s.wednesdays}` : '',
                s.thursdays ? `Thursdays, ${s.thursdays}` : '',
                s.fridays ? `Fridays, ${s.fridays}` : '',
                s.saturdays ? `Saturdays, ${s.saturdays}` : '',
                s.sundays ? `Sundays, ${s.sundays}` : '',
              ].filter(Boolean).map((w, idx) => <p key={idx}>{w}</p>)}

            </dd>
          </div>
        </dl>
        </section>))



        
    }{schedules.length && <div className="relative xl:col-span-2">
        <AgeGroups groups={schedules[0].programs} />
    </div>}</div>
}