'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     console.log('🔍 Checking user:', user);

    //     if (user === undefined || user === null) {
    //         console.log('⏳ Waiting for authentication state...');
    //         return; // ✅ Don't do anything while authentication is loading
    //     }

    //     if (!user) {
    //         console.log('🚨 No user found, redirecting to login');
    //         router.push('/login');
    //     } else {
    //         console.log('✅ User authenticated, allowing access');
    //         setLoading(false);
    //     }
    // }, [user, router]);
    useEffect(() => {
        console.log('🔍 Checking user:', user);
        // Immediately check for a token in localStorage
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (!token) {
          router.replace('/login');
          return;
        }
      }
      
        // If still loading (user is undefined), do nothing
        if (user === undefined) {
          console.log('⏳ Waiting for authentication state...');
          return;
        }
      
        // If user is null or false, then no user is logged in so redirect
        if (!user) {
          console.log('🚨 No user found, redirecting to login');
        
          router.replace('/login');
        } else {
          console.log('✅ User authenticated, allowing access');
          setLoading(false);
        }
      }, [user, router]);
      
    if (loading || user === undefined) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return <>{children}</>;
}
