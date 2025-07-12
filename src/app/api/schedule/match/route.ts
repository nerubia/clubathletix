import { getAthleteViaYear } from '@/services/athletes';
import { submitSlackRequest } from '@/services/http';
import { getSlackMatchNotification, getSlackTrainingNotification } from '@/utils/http/slack';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const formData = await request.formData();
	const params = Object.fromEntries(formData.entries());

	const {
		command,
		channel_id,
		text, // This is the text input from the user,
	} = params as Record<string, string>;

    const [applicable_years, s_organization_id, month, day, time] = text.split(' ');
    const organization_id = Number(s_organization_id);
    
    
    const [h,min] = time.split(':');
    const dt = new Date(new Date().getFullYear(), Number(month) - 1, Number(day));
    dt.setHours(Number(h), Number(min) || 0, 0, 0);

    const str_time = dt.toLocaleDateString('en-CA', {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })

    const yearGroups = await Promise.all(applicable_years.split(',').map(Number).map(getAthleteViaYear));
    
    const athletes = yearGroups.flatMap((group) => group.map((athlete) => {
        if (athlete.slack_users?.length) console.log(athlete.full_name, JSON.stringify(athlete, null, 2));
        return {
            id: athlete.id,
            name: athlete.full_name.split(',').pop()?.trim() || athlete.full_name,
            email: athlete.parent?.email || '',
            parent_name: `${athlete.parent?.first_name || athlete.parent?.full_name || ''}`.split(',').pop()?.trim() || '',
            slack_users: (athlete.slack_users || []),
            date_of_birth: athlete.date_of_birth,
        };
    }));

    const messages = await Promise.all(athletes.map(athlete => {
        return getSlackMatchNotification({
            organization_id,
            parent_name: athlete.parent_name,
            players: [
                athlete,
            ],
            time: text.split(' ').slice(0, 2).join(' '),
        });

    }))

    const results = await Promise.all(athletes.map((athlete, index) => { 
        return Promise.all(athlete.slack_users.map(user => {
            return submitSlackRequest('chat.postEphemeral', {
                channel: 'C09666BQ8BS',
                user,
                ...messages[index],
            })
        }))
    });
	

	return NextResponse.json(
		{ results, text: 'Training schedule created successfully' },
		{
			status: 200,
		}
	);
}
