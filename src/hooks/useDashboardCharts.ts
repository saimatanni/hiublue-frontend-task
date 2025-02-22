import { useEffect, useState } from 'react';
import api from '@/utils/apiInterceptor';

interface WebsiteVisits {
    [key: string]: { desktop: number; mobile: number };
}

interface OffersSent {
    [key: string]: number;
}

interface APIResponse {
    website_visits: WebsiteVisits;
    offers_sent: OffersSent;
}

export default function useDashboardCharts(filter: 'this-week' | 'prev-week') {
    const [data, setData] = useState<APIResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`api/dashboard/stat?filter=${filter}`);
                setData(response.data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filter]);

    return { data, loading, error };
}
