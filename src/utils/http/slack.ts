

const AGE_GROUPS_HOOKS: {
    [k: string]: string
} = {
    '2010-2011': 'B095GKL1HUZ/ebgK2VjEkwBDVtuP16gvwQvC',
    '2012-2013': 'B094Q9X5CA3/eKLmAxjt2pUpAhq4OB6YE96U',
    '2014-2015': 'B095R1Y76N4/NDTrbxMxgHd2qzwATvUxhp78',
    '2016-2017': 'B095GF06VR7/eiRxfh5LUVFCZ6X4WvNKxoK5',
    '2018-2020': 'B09523JSKGV/QbW1Nb5HeuPCz4TgsLrD85ia',
    matches: 'B0955AGR1PW/ibJVmzv7XmJVUXUDRJwHQqvS',
    coaching: 'B094PBCS7PH/KQgGdUb6tSAb1HVnuLQFClRg'
}

export function getSlackEventNotification({
    event_type,
    time,
    location = 'Cambridge Elementary Park\n6115 150 St, Surrey, BC V3S 3H7',
    coaches,
    opponent,
    age_range,
}: {
    event_type: 'training' | 'game';
    time: string;
    location: string;
    coaches?: string;
    age_range: string;
    opponent?: {
        name: string;
        logo_url?: string;
    },
}) {
    return {
        url: `https://hooks.slack.com/services/T094WFETMCL/${AGE_GROUPS_HOOKS[age_range]}`,
        payload: {
            blocks: [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": `:wave: Hey team! We've got an upcoming ${event_type}. Please let us coaches know if you can/can't make it.`
                    }
                },
                {
                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": `:watch: ${time}\n`
                        },
                        coaches ?{
                            "type": "mrkdwn",
                            "text": `👟*Coaches:*\n${coaches}`
                        } : undefined
                    ].filter(Boolean) as any
                },
                {

                    "type": "section",
                    "fields": [
                        {
                            "type": "mrkdwn",
                            "text": `:round_pushpin: ${location}`
                        },
                        {
                            "type": "mrkdwn",
                            "text": opponent ? `🛡️ ${opponent.name}\n` : `⚡*What*: ${event_type}`
                        },
                    ],
                    "accessory": opponent?.logo_url ? {
                        "type": "image",
                        "image_url": opponent.logo_url,
                        "alt_text": opponent.name
                    } : undefined
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "emoji": true,
                                "text": "Yes, we're going"
                            },
                            "style": "primary",
                            "value": "yes"
                        },
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "emoji": true,
                                "text": "Sorry, can't make it"
                            },
                            "style": "danger",
                            "value": "no"
                        }
                    ]
                }
            ]
        }
    }
}