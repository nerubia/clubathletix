import { getAthlete } from '@/services/athletes';
import { submitSlackRequest } from '@/services/http';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	let payload: any = {};
	const hdr = await req.headers;
	console.log(hdr.get('content-type'));
	let data: {
		response_url: string;
		user?: {
			id: string;
			username: string;
			name: string;
		};
		actions: {
			action_id: string;
			value: string;
			action_ts: number;
		}[];
		channel?: {
			id: string;
			name: string;
		};
		container: {
			channel_id: string;
			message_ts: string;
		};
	} = {
		actions: [],
		response_url: '',
		container: {
			channel_id: '',
			message_ts: '',
		},
	};

	if (hdr.get('content-type')?.includes('application/json')) {
		try {
			const entries = await req.json();
			data = entries.payload as any;
		} catch (error) {
			console.warn('Error parsing json', error);
		}
	} else {
		try {
			const d = await req.formData();
			const entries = Object.fromEntries(d);
			payload = entries.payload as any;

			data = JSON.parse(payload as unknown as string) as unknown as {
				response_url: string;
				user: {
					id: string;
					username: string;
					name: string;
				};
				actions: {
					action_id: string;
					value: string;
					action_ts: number;
				}[];
				channel: {
					id: string;
					name: string;
				};
				container: {
					channel_id: string;
					message_ts: string;
				};
			};
		} catch (error) {
			console.warn('Error parsing formData');
		}
	}

	try {
		console.log('Received request to /api/slack/route.ts, "data": ', data);
		if (data?.actions?.length) {
			const thread_ts = data.container.message_ts;
			const action = data.actions.pop();

            const [yes_no, s_athlete_id] = action?.action_id.split('-') || [];

			const athlete_id = Number(s_athlete_id);
			if (athlete_id) {
				const athlete = await getAthlete(athlete_id);
                console.log({yes_no, athlete_id}, athlete)

				if (athlete) {
					await Promise.all([
                        submitSlackRequest('chat.update', {
							channel: process.env.SLACK_SCHEDULING_CHANNEL_ID!,
							ts: 'thread_ts',
							text: `*${athlete.full_name}* is going to the match!`,
						}),
						submitSlackRequest('chat.postEphemeral', {
							channel: process.env.SLACK_SCHEDULING_CHANNEL_ID!,
							user: 'U094WFETMJ8',
							text: `*${athlete.full_name}* is going to the match!`,
						}),
						fetch(data.response_url, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								text: `:${yes_no === 'yes' ? 'white_check_mark' : 'x'}: *${athlete.full_name}*`,
								response_type: 'in_channel',
								replace_original: true,
								thread_ts,
								mrkdwn: true,
								name: 'heart',
							}),
						}),
					]);
				}
			}
		}
		return NextResponse.json({ message: 'No email found in Slack user profile.', data });

		// const athletes = await getCustomerByEmail(email);
		// console.log(JSON.stringify({athletes}, null, 2))

		// const applicablePlayers = athletes?.filter(athlete => {
		//     const [year] = athlete.date_of_birth.split('-').map(Number);
		//     return year >= from && year <= to;
		// });

		// console.log(JSON.stringify({
		//     channel_id,
		//     from,
		//     to,
		//     user,
		//     applicablePlayers,
		//     channels,
		//     rest
		// }, null, 2));
	} catch (error) {
		console.warn('Error parsing payload:', error);
		return NextResponse.json({ error: 'Invalid payload format.' });
	}
	// return NextResponse.json(applicablePlayers);

	return NextResponse.json({
		message: 'Slack integration is not available yet.',
	});
}
