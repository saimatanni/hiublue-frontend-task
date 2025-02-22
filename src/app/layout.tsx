"use client";
import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import ThemeProvider from "@/theme/index";
import { AuthProvider } from "@/context/AuthContext";
import { Public_Sans } from "next/font/google";
import "./global.css";
import { Box } from "@mui/material";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { usePathname } from "next/navigation";
import ProtectedRoute from "@/route/ProtectedRoute";
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout(props: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ✅ Define authentication pages that should NOT have Sidebar/Header
  const isAuthPage = ["/login", "/signup", "/forgot-password"].includes(
    pathname
  );
  return (
    <html lang="en" suppressHydrationWarning className={publicSans.className}>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider>
            <AuthProvider>
              {/* <CssBaseline />
              {props.children} */}
              <Box
                sx={{ display: "flex", width: "100vw", overflowX: "hidden" }}
              >
                <CssBaseline />
                {!isAuthPage && <Sidebar />}
                <Box
                  component="main"
                  sx={{ flexGrow: 1, padding: "10px", overflowX: "hidden" }}
                >
                  {!isAuthPage && <Header />}
                  <Box sx={{ mt: isAuthPage ? 0 :  12 }}>
                    {isAuthPage ? (
                      props.children
                    ) : (
                      <ProtectedRoute>{props.children}</ProtectedRoute>
                    )}
                    {/* {props.children}</Box> */}
                  </Box>
                </Box>
              </Box>
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
