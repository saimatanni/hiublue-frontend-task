'use client';

import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Typography, Divider } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// ✅ Use relative paths instead of import
const menuItems = [
    { text: 'Dashboard', icon: '/img/icon/icon1.png', path: '/' },
    { text: 'Onboarding', icon: '/img/icon/icon2.png', path: '/onboarding' },
];

export default function Sidebar() {
    const router = useRouter();

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: 250,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 250,
                    boxSizing: 'border-box',
                    backgroundColor: '#F8FAFC',
                    borderRight: '1px solid #E2E8F0',
                    padding: 2
                },
            }}
        >
            {/* ✅ Logo Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', paddingY: 2, paddingX: 1 }}>
                <Image src="/img/logo.png" alt="Logo" width={40} height={40} />
            </Box>

            {/* ✅ Overview Text */}
            <Typography variant="subtitle2" sx={{ color: '#919EAB', fontWeight: 'bold', paddingX: 2, marginTop: 2 }}>
                OVERVIEW
            </Typography>

            <Divider sx={{ marginY: 1 }} />

            {/* ✅ Navigation Menu */}
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton onClick={() => router.push(item.path)} sx={{ borderRadius: 2, marginX: 1 }}>
                            <ListItemIcon>
                                <Image src={item.icon} alt={item.text} width={24} height={24} />
                            </ListItemIcon>
                            <ListItemText primary={item.text} sx={{ color: '#1E293B' }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
