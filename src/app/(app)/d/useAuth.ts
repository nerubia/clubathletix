import Cookies from 'js-cookie'
import { useState } from 'react';

interface AuthResponse {
    token?: string;
    error?: string;
}

export function useAuth() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<AuthResponse | null>(null);

    const authenticate = async () => {
        setLoading(true);
        setData(null);
        try {
            const response = await fetch('/api/auth', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${Cookies.get('token')}`
                },
            });
            const result = await response.json();
            setData(result);
        } catch (error) {
            setData({ error: 'Network error' });
        } finally {
            setLoading(false);
        }
    };

    return { authenticate, data, loading };
}