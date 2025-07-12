import Cookies from 'js-cookie';
import { useState } from 'react';

export function useAuth() {
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<Record<string, string> | null>(null);

	const authenticate = async () => {
		setLoading(true);
		setData(null);
		try {
			const [org, response] = await Promise.all([
				fetch('/api/organization', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `JWT ${Cookies.get('token')}`,
					},
				}),
				fetch('/api/auth', {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `JWT ${Cookies.get('token')}`,
					},
				}),
			]);
			const result = await response.json();
			const { organizations: organization } = await org.json();
			setData({
				...organization,
				...result,
			});
		} catch (error) {
			setData({ error: 'Network error' });
		} finally {
			setLoading(false);
		}
	};

	return { authenticate, data, loading };
}
