import { getOrganization, getOrganizationByDomain } from "@/services/organization";

const AGE_GROUPS_HOOKS: {
	[k: string]: string;
} = {
	'2010-2011': 'B095GKL1HUZ/ebgK2VjEkwBDVtuP16gvwQvC',
	'2012-2013': 'B094Q9X5CA3/eKLmAxjt2pUpAhq4OB6YE96U',
	'2014-2015': 'B095R1Y76N4/NDTrbxMxgHd2qzwATvUxhp78',
	'2016-2017': 'B095GF06VR7/eiRxfh5LUVFCZ6X4WvNKxoK5',
	'2018-2020': 'B09523JSKGV/QbW1Nb5HeuPCz4TgsLrD85ia',
	matches: 'B0955AGR1PW/ibJVmzv7XmJVUXUDRJwHQqvS',
	coaching: 'B0954MLGKAS/R6LnuRw1V4Y332dIsjh1Nzl5',
};
export function getSlackEventNotification({
	event_type,
	time,
	location = 'Cambridge Elementary Park\n6115 150 St, Surrey, BC V3S 3H7',
	coaches,
	opponent,
	years,
}: {
	event_type: 'training' | 'game';
	time: string;
	location: string;
	coaches?: string;
	opponent?: {
		name: string;
		logo_url?: string;
	};
	years: number[];
}) {
	return {
		payload: {
			blocks: [
				{
					type: 'section',
					text: {
						type: 'mrkdwn',
						text: `:wave: Hey team! We've got an upcoming ${event_type}. Please let us coaches know if you can/can't make it.${years.length ? `\n\n:child: _Applicable only to players born ${years.join('/')}_` : ''}`,
					},
				},
				{
					type: 'section',
					fields: [
						{
							type: 'mrkdwn',
							text: `:watch: ${time}\n`,
						},
						coaches
							? {
									type: 'mrkdwn',
									text: `👟*Coaches:*\n${coaches}`,
								}
							: undefined,
					].filter(Boolean) as any,
				},
				{
					type: 'section',
					fields: [
						{
							type: 'mrkdwn',
							text: `:round_pushpin: ${location}`,
						},
						{
							type: 'mrkdwn',
							text: opponent ? `🛡️ ${opponent.name}\n` : `⚡*What*: ${event_type}`,
						},
					],
					accessory: opponent?.logo_url
						? {
								type: 'image',
								image_url: opponent.logo_url,
								alt_text: opponent.name,
							}
						: undefined,
				},
				{
					type: 'actions',
					elements: [
						{
							type: 'button',
							text: {
								type: 'plain_text',
								emoji: true,
								text: "Yes, we're going",
							},
							style: 'primary',
							value: 'yes',
						},
						{
							type: 'button',
							text: {
								type: 'plain_text',
								emoji: true,
								text: "Sorry, can't make it",
							},
							style: 'danger',
							value: 'no',
						},
					],
				},
			],
		},
	};
}

export function getSlackTrainingNotification({
	organization_name,
	parent_name,
	players,
	time,
	location = 'Cambridge Elementary Park\n6115 150 St, Surrey, BC V3S 3H7',
	crest_url = 'https://viplaril6wogm0dr.public.blob.vercel-storage.com/clubathletix/pfa/logo.png',
}: {
	organization_name: string;
	parent_name: string;
	players: {
		id: number;
		name: string;
	}[];
	time: string;
	location?: string;
	crest_url?: string;
}) {
	let playerNames = '';
	for (let i = 0; i < players.length; i++) {
		const player = players[i];
		if (players.length === 1) playerNames += `*${player.name}*`;
		else if (players.length === i + 1) playerNames += `and *${player.name}*`;
		else playerNames += `, *${player.name}*`;
	}
	return {
		blocks: [
			{
				type: 'section',
				text: {
					type: 'mrkdwn',
					text: `Hi ${parent_name}! *Training* posted by our coaches.\n\n:date: ${time} for ${playerNames}\n\n:round_pushpin: ${location}`,
				},
				accessory: {
					type: 'image',
					alt_text: 'Academy',
					image_url: crest_url,
				},
			},
			{
				type: 'divider',
			},
			...players.map(({ id, name }) => ({
				type: 'actions',
				elements: [
					{
						type: 'button',
						text: {
							type: 'plain_text',
							text: `Yes, ${name} is going :thumbsup:`,
							emoji: true,
						},
						style: 'primary',
						value: 'going',
						action_id: `yes-${id}`,
					},
					{
						type: 'button',
						text: {
							type: 'plain_text',
							text: `Sorry, ${name} can't make it.`,
							emoji: true,
						},
						value: 'going',
						action_id: `no-${id}`,
					},
				],
			})),
		],
	};
}

export function getSlackMatchNotification({
	organization,
	parent_name,
	players,
	time,
	location = 'Cambridge Elementary Park\n6115 150 St, Surrey, BC V3S 3H7',
}: {
	organization: {
        name: string;
        logo_url: string;
    };
	parent_name: string;
	players: {
		id: number;
		name: string;
	}[];
	time: string;
	location?: string;
	
}) {
	let playerNames = '';
	for (let i = 0; i < players.length; i++) {
		const player = players[i];
		if (players.length === 1) playerNames += `*${player.name}*`;
		else if (players.length === i + 1) playerNames += `and *${player.name}*`;
		else playerNames += `, *${player.name}*`;
	}

	return {
		blocks: [
			{
				type: 'section',
				text: {
					type: 'mrkdwn',
					text: `Hi ${parent_name}! *Match vs ${organization.name || ''}* posted by our coaches.\n\n:date: ${time} for ${playerNames}\n\n:round_pushpin: ${location}`,
				},
				accessory: {
					type: 'image',
					alt_text: organization.name,
					image_url: organization.logo_url,
				},
			},
			{
				type: 'divider',
			},
			...players.map(({ id, name }) => ({
				type: 'actions',
				elements: [
					{
						type: 'button',
						text: {
							type: 'plain_text',
							text: `Yes, ${name} is going :thumbsup:`,
							emoji: true,
						},
						style: 'primary',
						value: 'going',
						action_id: `yes-${id}`,
					},
					{
						type: 'button',
						text: {
							type: 'plain_text',
							text: `Sorry, ${name} can't make it.`,
							emoji: true,
						},
						value: 'going',
						action_id: `no-${id}`,
					},
				],
			})),
		],
	};
}
