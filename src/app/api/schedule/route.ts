import { NextRequest, NextResponse } from 'next/server';
import { URLSearchParams } from 'url';
import { getSchedule } from '@/services/schedule';
import { addDays } from '@/utils/calendar/date-helpers';
import { formatDate } from '@/utils/calendar/date-formatter';


export async function GET(request: NextRequest) {
    const params = Object.fromEntries(new URLSearchParams(request.nextUrl.search))

    try {
        let schedules: any[] | undefined = await getSchedule({
            ...params,
            to: params.to || formatDate(addDays(new Date(), 60)),
        });

        return NextResponse.json((schedules || []).sort((a, b) => {
            if  (a.isOnce || b.isOnce) return -1
            if (a.date < b.date) return -1
            if (a.date > b.date) return 1
            return 0
        }), { status: 200 });
    } catch (err) {
        return NextResponse.json({ err }, { status: 500 });
    }
}