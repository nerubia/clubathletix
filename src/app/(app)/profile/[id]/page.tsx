'use client';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
	const p = useParams();

	useEffect(() => {
		if (p.id)
			fetch(`/api/veo/${p.id}`).then((xhr) => {
				if (xhr.ok) {
					xhr.json().then((json) => {
						if (json.url) location.href = json.url;
						else notFound();
					});
				}
			});
	}, []);
	// const data = await getAthleteUrl(id);

	return <div>No record found</div>;
}
