"use client";

import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", width: "100vw", overflowX: "hidden" }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1,padding:"10px", overflowX: "hidden" }}>
        <Header />
        <Box sx={{ mt: 8 }}>{children}</Box>
      </Box>
    </Box>
  );
}
