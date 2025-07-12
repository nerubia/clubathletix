import { getAthleteViaYear } from '@/services/athletes';
import { submitSlackRequest } from '@/services/http';
import { getSlackTrainingNotification } from '@/utils/http/slack';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const formData = await request.formData();
	const params = Object.fromEntries(formData.entries());

	const {
		command,
		channel_id,
		user_id,
		text, // This is the text input from the user,
		response_url, // Use this to submit a response back to Slack
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
    const [applicable_years, time, ...rest] = text.split(' ');

    const yearGroups = await Promise.all(applicable_years.split(',').map(Number).map(getAthleteViaYear));
    console.log('Year groups:', applicable_years.split(',').map(Number), yearGroups);
	const blocks = getSlackTrainingNotification({
		organization_name: 'PF',
		parent_name: 'Test Parent',
		players: [
			{
				id: 1,
				name: 'Test Player',
			},
		],
		time: text.split(' ').slice(0, 2).join(' '),
	});

	const { message_ts } = await submitSlackRequest('chat.postEphemeral', {
		channel: 'C09666BQ8BS',
		user: user_id,
		blocks,
	});

	return NextResponse.json(
		{ message_ts, message: 'Training schedule created successfully', yearGroups, data: params },
		{
			status: 200,
		}
	);
}
