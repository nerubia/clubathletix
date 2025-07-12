import { getAthleteViaYear } from '@/services/athletes';
import { submitSlackRequest } from '@/services/http';
import { getOrganization } from '@/services/organization';
import { getSlackMatchNotification, getSlackTrainingNotification } from '@/utils/http/slack';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const formData = await request.formData();
	const params = Object.fromEntries(formData.entries());

	const {
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
    const slackUsers: string[] = [];

    let organization = await getOrganization(organization_id);
    if (!organization) {
        organization = {
            id: 0,
            name: 'Academy',
            logo_url: 'https://viplaril6wogm0dr.public.blob.vercel-storage.com/clubathletix/pfa/logo-sm.png',
        }
    }

    const messages = yearGroups.flatMap((group) => group.map((athlete) => {
        if (athlete.slack_users?.length) console.log(athlete.full_name);
        return athlete.slack_users.map(user => {
            const slack_athlete = `${user}:${athlete.id}`;
            if (!slackUsers.includes(slack_athlete)) {
                slackUsers.push(slack_athlete);
                return getSlackMatchNotification({
                    organization: {
                        name: organization.name || 'Academy',
                        logo_url: organization.logo_url || '',
                    },
                    parent_name: `${athlete.parent?.first_name || athlete.parent?.full_name || ''}`.split(',').pop()?.trim() || '',
                    players: [{
                        id: athlete.id,
                        name: athlete.full_name.split(',').pop()?.trim() || athlete.full_name,
                    }],
                    time: str_time,
                });
                return {
                    id: athlete.id,
                    name: athlete.full_name.split(',').pop()?.trim() || athlete.full_name,
                    email: athlete.parent?.email || '',
                    parent_name: `${athlete.parent?.first_name || athlete.parent?.full_name || ''}`.split(',').pop()?.trim() || '',
                    date_of_birth: athlete.date_of_birth,
                };
            }
        });
        
    }));

    // const messages = await Promise.all(athletes.map(athlete => {
    //     return getSlackMatchNotification({
    //         organization_id,
    //         parent_name: athlete.parent_name,
    //         players: [
    //             athlete,
    //         ],
    //         time: str_time,
    //     });

    // }))

    // const results = await Promise.all(messages.map(({ block }, index) => { 
    //     return Promise.all(athlete.slack_users.map(user => {
    //         console.log(user)
    //         return submitSlackRequest('chat.postEphemeral', {
    //             channel: 'C09666BQ8BS',
    //             user,
    //             ...messages[index],
    //         })
    //     }))
    // }));
	slackUsers.map((slack_athlete, idx) => {
        const [user, athlete_id] = slack_athlete.split(':');
        console.log(user, athlete_id, JSON.stringify(messages[idx], null, 2));
    })
	return NextResponse.json(
		{ messages, text: 'Match schedule created successfully' },
		{
			status: 200,
		}
	);
}
