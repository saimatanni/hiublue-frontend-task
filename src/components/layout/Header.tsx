'use client';

import { AppBar, Toolbar, Typography, Avatar, Box, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import Image from 'next/image';

export default function Header() {
    return (
        <AppBar position="fixed" elevation={0} sx={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid #E2E8F0' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end', paddingX: 3,  }}>
                
                {/* ✅ Dashboard Title */}
                {/* <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1E293B' }}>
                    Dashboard
                </Typography> */}

                {/* ✅ Right Section (Month Dropdown & Profile) */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    
                   

                    {/* Profile Avatar */}
                    <IconButton>
                        <Avatar alt="User Profile" src="/img/stack.png" sx={{ width: 36, height: 36 }} />
                    </IconButton>

                </Box>
            </Toolbar>
        </AppBar>
    );
}
