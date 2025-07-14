'use client';

import { Heading } from '@/components/heading';
import { useEffect, useState } from 'react';

export default function CalendarContainer(p: { calendar: string }) {
	const [html, setHTML] = useState<string>('');

	useEffect(() => {
		fetch(`/api/schedule/google?year=${p.calendar}`).then((res) => {
			res.json().then((data) => {
				setHTML(data.html);
			});
		});
	}, []);

	return html ? (
		<iframe
			dangerouslySetInnerHTML={{
				__html: html,
			}}
		/>
	) : (
		<Heading force="text-black">Loading...</Heading>
	);
}
