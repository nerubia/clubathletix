import { getAthleteViaYear } from '@/services/athletes';
import { submitSlackRequest } from '@/services/http';
import { getSlackTrainingNotification } from '@/utils/http/slack';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const formData = await request.formData();
	const params = Object.fromEntries(formData.entries());

	const {
		text, // This is the text input from the user,
	} = params as Record<string, string>;
	console.log('Received request to /api/schedule/training/route.ts', params);
	// Here you would typically handle the training schedule creation logic
	// For example, saving the training data to a database or sending it to an external service
	// https://slack.com/api/chat.postEphemeral
	// channel - channel ID where the message will be posted
	// user - user ID of the user who will receive the message
	// blocks - an array of structured blocks to format the message
	// const xhr = await fetch(response_url, {
	//     method: 'POST',
	//     headers: {
	//         'Content-Type': 'application/json',
	//     },
	//     body: JSON.stringify({
	//         text: applicablePlayers.map(name => `:${answer === 'yes' ? 'white_check_mark' : 'x'}: *${name}*`).join('\n'),
	//         response_type: 'in_channel',
	//         replace_original: false,
	//         thread_ts,
	//         mrkdwn: true,
	//         name: "heart",
	//         username: applicablePlayers.join(' • '),
	//     }),
	// });
	// return NextResponse.json({status: xhr.status, statusText: xhr.statusText}, {
	//     headers: { 'Content-Type': 'application/json' },
	//     status: xhr.status,
	//     statusText: xhr.statusText,
	// });
    const [applicable_years, time_portion, ...rest] = text.split(' ');
    
    const [date,time] = time_portion.split('T');
    const [h,min] = time.split(':');
    const dt = new Date();
    const [y,m,d] = date.split('-').map(Number);
    dt.setFullYear(y, m - 1, d);
    dt.setHours(Number(h), Number(min) || 0, 0, 0);

    console.log('Parsed date:', dt.toLocaleDateString('en-CA', {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    }));

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

    const results = await Promise.all(athletes.map(athlete => {
        const {blocks} = getSlackTrainingNotification({
            organization_name: 'PF',
            parent_name: athlete.parent_name,
            players: [
                athlete,
            ],
            time: text.split(' ').slice(0, 2).join(' '),
        });

        return Promise.all(athlete.slack_users.map(user => {
            return submitSlackRequest('chat.postEphemeral', {
                channel: process.env.SLACK_SCHEDULING_CHANNEL_ID!,
                user,
                blocks,
            })
        }))
    }))
	

	return NextResponse.json(
		{ results, text: 'Training schedule created successfully' },
		{
			status: 200,
		}
	);
}
