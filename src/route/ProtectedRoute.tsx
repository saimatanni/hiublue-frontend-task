"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("🔍 Checking user:", user);

    // If the auth state is still loading, do nothing.
    if (user === undefined) {
      console.log("⏳ Waiting for authentication state...");
      return;
    }

    // Check for token in localStorage as a fallback.
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    // If no user and no token, redirect.
    if (!user && !token) {
      console.log("🚨 No user and no token found, redirecting to login");
      router.push("/login");
      return;
    }

    // Otherwise, if user exists or token exists, assume we're authenticated.
    console.log("✅ User authenticated or token exists, allowing access");
    setLoading(false);
  }, [user, router]);

  if (loading || user === undefined) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
