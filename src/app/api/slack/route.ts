import { getAthlete, getAthleteViaEmail } from '@/services/athletes';
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
				response_url,
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

            const [yes_no, s_athlete_id] = action?.action_id.split('-') || []
            const athlete_id = Number(s_athlete_id);
            if (athlete_id) {
                const athlete = await getAthlete(athlete_id);
                if (athlete && yes_no === 'yes') {
                    await fetch(response_url, {
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
                            name: "heart"
                        }),
                    });
                }
            }
		}
        return NextResponse.json({ message: 'No email found in Slack user profile.' });

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

		// return NextResponse.json(applicablePlayers);

		return NextResponse.json({
			message: 'Slack integration is not available yet.',
		});
	} catch (error) {
		console.warn('Error parsing payload:', error);
		return NextResponse.json({ error: 'Invalid payload format.' });
	}
}
