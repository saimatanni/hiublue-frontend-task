'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    // const storedUser = localStorage.getItem('user');
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('🔍 Checking user:', user); // Debugging user state

        if (!user ) {
            console.log('🚨 No user found, redirecting to login');
            router.push('/login');
        } else {
            console.log('✅ User authenticated, allowing access');
            setLoading(false);
        }
    }, [user, router]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return <>{children}</>;
}
