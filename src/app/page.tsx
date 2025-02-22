// import BodyLayout from "@/components/layout/BodyLayout";
// import DashboardLayout from "@/components/layout/DashboardLayout";
// import ProtectedRoute from "@/route/ProtectedRoute";

import DashboardView from "@/sections/dashboard/dashboard-view";
// import OnboardingView from "@/sections/onboarding/views/onboarding-view";
// import { usePathname } from "next/navigation";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
export const metadata = {
  title: "Dashboard",
};

export default function Page() {
  // const pathname = usePathname();

  return (
    // <ProtectedRoute>
      <DashboardView/>
    // </ProtectedRoute>
  );
}
