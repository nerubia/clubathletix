import { getAthleteViaEmail } from '@/services/athletes';
import { submitSlackRequest } from '@/services/http';
import { getSlackChannels, getSlackUserProfile } from '@/services/schedule';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	const hdr = await req.headers;
	const data = await req.formData();
	try {
        const { payload } = Object.fromEntries(data);
		console.log('Received data for /api/slack/route.ts', {payload});
		if (payload) {
			const {
				user,
				actions,
				channel,
				container: { channel_id, message_ts },
			} = JSON.parse(payload as unknown as string) as unknown as {
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

			const thread_ts = message_ts;
			const action = actions.pop();
			const channels = await getSlackChannels();
			const replyInChannel = channels.find((c) => c.id === channel_id || c.name === channel.name);
			const slackUser = await getSlackUserProfile(user.id);
			if (action) {
				const answer = action.value;
				const {
					user: { profile },
				} = slackUser || { user: { profile: { email: '' } } };
				if (profile.email && replyInChannel) {
					const customer = await getAthleteViaEmail(profile.email);
					const { athletes, email, phone, full_name, ...record } = customer || { athletes: [] };
					const [from, to] = replyInChannel.name
						.split('-')
						.map((s) => Number(s.trim()))
						.filter(Boolean);

					let applicablePlayers: string[] = (
						!from ? athletes.map((athlete) => athlete.full_name.split(',').pop()?.trim() || '') : []
					).filter(Boolean);
					if (from && to) {
						applicablePlayers = athletes
							.filter((athlete) => {
								const [year] = athlete.date_of_birth.split('-').map(Number);
								return year >= from && year <= to;
							})
							.map((athlete) => athlete.full_name.split(',').pop()?.trim() || '');
					}

					if (applicablePlayers && applicablePlayers.length) {
						const results = await submitSlackRequest('chat.postEphemeral', {
							channel: replyInChannel.id,
							text: applicablePlayers
								.map((name) => `:${answer === 'yes' ? 'white_check_mark' : 'x'}: *${name}*`)
								.join('\n'),
							thread_ts,
							mrkdwn: true,
							replace: true,
							username: applicablePlayers.join(' • '),
						});

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
						console.log(results);
						return NextResponse.json({
							message: 'Completed.',
							results,
						});
					}
				}
				return NextResponse.json({ message: 'No email found in Slack user profile.' });
			}
		}

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
		// await fetch(response_url, {
		//     method: 'POST',
		//     headers: {
		//         'Content-Type': 'application/json',
		//     },
		//     body: JSON.stringify({
		//         text: `:${answer === 'yes' ? 'white_check_mark' : 'x'}: *${names}*`,
		//         response_type: 'in_channel',
		//         replace_original: false,
		//         thread_ts,
		//         mrkdwn: true,
		//         name: "heart"
		//     }),
		// });

		// return NextResponse.json(applicablePlayers);

		return NextResponse.json({
			message: 'Slack integration is not available yet.',
		});
	} catch (error) {
		console.warn('Error parsing payload:', error);
		return NextResponse.json({ error: 'Invalid payload format.' });
	}
}
