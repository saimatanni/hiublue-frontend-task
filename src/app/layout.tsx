import * as React from 'react';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import ThemeProvider from "@/theme/index";
import { AuthProvider } from '@/context/AuthContext';
import { Public_Sans } from 'next/font/google';
import './global.css'
const publicSans = Public_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '700'] });

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className={publicSans.className}>
        <body>
        <InitColorSchemeScript attribute="class"/>
        <AppRouterCacheProvider options={{enableCssLayer: true}}>
            <ThemeProvider>
                <AuthProvider>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline/>
                {props.children}
                </AuthProvider>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
