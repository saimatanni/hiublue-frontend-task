"use client";

import { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

// ✅ Menu items with icons
const menuItems = [
  { text: "Dashboard", icon: "/img/icon/icon1.png", path: "/" },
  { text: "Onboarding", icon: "/img/icon/icon2.png", path: "/onboarding" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname(); // ✅ Get current route
  const [isCollapsed, setIsCollapsed] = useState(false);

  // ✅ Detect window resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768); // Collapse sidebar on small screens
    };

    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? 80 : 250, // ✅ Collapse width on small screens
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isCollapsed ? 80 : 250,
          transition: "width 0.3s ease",
          boxSizing: "border-box",
          backgroundColor: "#F8FAFC",
          borderRight: "1px solid #E2E8F0",
          padding: isCollapsed ? 1 : 2,
          display: "flex",
          flexDirection: "column",
          alignItems: isCollapsed ? "center" : "flex-start",
        },
      }}
    >
      {/* ✅ Logo Section */}
      <Box sx={{ display: "flex", justifyContent: "center", paddingY: 2 }}>
        <Image src="/img/logo.png" alt="Logo" width={40} height={40} />
      </Box>

      {/* ✅ Overview Text (Hidden when collapsed) */}
      {!isCollapsed && (
        <Typography
          variant="subtitle2"
          sx={{
            color: "#919EAB",
            fontWeight: "bold",
            paddingX: 2,
            marginTop: 2,
          }}
        >
          OVERVIEW
        </Typography>
      )}

      <Divider sx={{ marginY: 1, width: "100%" }} />

      {/* ✅ Navigation Menu */}
      <List sx={{ width: "100%" }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path; // ✅ Check active state

          return (
            <ListItem
              key={item.text}
              disablePadding
              sx={{
                justifyContent: isCollapsed ? "center" : "flex-start",
              }}
            >
              <ListItemButton
                onClick={() => router.push(item.path)}
                sx={{
                  borderRadius: 2,
                  marginX: 1,
                  backgroundColor: isActive ? "#E8F0FE" : "transparent", // ✅ Active background color
                  "&:hover": { backgroundColor: "#E8F0FE" },
                }}
              >
                <ListItemIcon sx={{ minWidth: "auto" }}>
                  <Image src={item.icon} alt={item.text} width={24} height={24} />
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText
                    primary={item.text}
                    sx={{
                      color: isActive ? "#1976D2" : "#1E293B", // ✅ Active text color
                      fontWeight: isActive ? "bold" : "normal",
                      marginLeft: 1,
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
