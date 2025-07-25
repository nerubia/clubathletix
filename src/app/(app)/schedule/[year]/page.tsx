
const CALENDAR_GROUPS: {
    [k: string]: string;
} = {
    '2010': 'c_23d412d3346e40f009a935196989e094387890651e7f26827b0e911ab9eb0af1',
    '2011': 'c_9efcdbaa47ce5038f56ec1f07bd93cd4bfcfd4e0d0fb619cb94fdc5e1236284d',
    '2012': 'c_59de8f69c4cc97e6064d487cbb35fe3aeabf5e9b46ede2caf1a7529d609dd1c3',
    '2013': 'c_2d2b92bd2eb89c8bc4202bd1c0abf7ba03f14989c2c8bd8f21a72ed6dfb6e977',
    '2014': 'c_9ca2e824f88e6d59db8c1474af4214cb137b990a146c16641462e1f0e2f68605',
    '2015': 'c_0bcd44d497f1f0e6c0458bf2078ace8296729c40fa97aa8b42dc99d2d4003fa7',
    '2016': 'c_03b03dc735a6a3f1a5d1cd332a125ca2fe26df20ff339fd10b9500d704de7e37',
    '2017': 'c_d3c4f1cd819acb57c7467ffa5178aeb0a5d6428765c25566d2049e839e7c7ff1',
    '2018': 'c_2deb412e20a7fd86a591ea7d3567551c71109fbde73e66a1779d370aee3c4b43',
    '2019': 'c_440de78c41481d14827406fc0f4fa02e4f7c6725bc993f6082c79adca71bc0b3',
    'league': 'c_81c36e7143cac591b55b7ce574099210a62c7c15ee5f43b7f6fb85794b248784',
    'sparkle': 'c_f519e8020f30dc5567736ddd9b287481be58e3f2a4368f93cf6f7d045e788093',
    'bn-academy': 'c_b58b5976d69f39ad576ff6dc73e25dcb4fcb0daf96c5ed38061c95d30fa42ad3',
    'bn-u12': 'c_08bdc303e3c2a204b3580f9d2a96624d0ea0aeb2c3768fea8b97fdc74e60cbb1',
    'orix': 'c_078692089c06457b8db5866f971ce391c0867e7aea79aa24dccc4b566ab01167',
    'sounders': 'c_cb70dd42d18eb4a8df26a313b2c3581811aa7b47270345db341c84ac0ed00b03',
    'pf-u12': 'c_cb70dd42d18eb4a8df26a313b2c3581811aa7b47270345db341c84ac0ed00b03',
    'pmfc-u12': 'c_2257010a3fe8cb8d4fbca41b10156105f45d1ebd7a64a2a8b5e1a9938dc12807',
}
export default async function SchedulePage({ params }: { params: Promise<{ year: string }> }) {
    const { year } = await (params as Promise<{ year: string }>);
    const config: {
        [k: string]: number;
    } = {
        showPrint: 0,
        showCalendars: 0,
        // showTitle: 0,
        // showTabs: 0,
        // showTz: 0,
        // showDate: 0,
        // showNav: 0,
    }
    let url = `https://calendar.google.com/calendar/embed?src=${CALENDAR_GROUPS[year]}%40group.calendar.google.com&ctz=America%2FVancouver&mode=AGENDA`
    Object.keys(config).forEach((key) => {
        url = `${url}&${key}=${config[key]}`;
    });
	return (<div>
        <iframe className="w-screen max-w-7xl mx-auto rounded-2xl h-[calc(100vh-11.5rem)] mt-16 md:mb-8" src={url} />
    </div>
	);
}