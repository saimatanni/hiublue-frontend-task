"use client";
import DashboardView from "@/sections/dashboard/dashboard-view";
import OnboardingView from "@/sections/onboarding/views/onboarding-view";
import { usePathname } from "next/navigation";
import React from "react";

const BodyLayout = () => {
  const pathname = usePathname();
  console.log("pathname", pathname === "/onboarding");
  return (
    <div>
      {pathname === "/onboarding" ? (
        <OnboardingView />
      ) : (
        pathname === "/" && <DashboardView />
      )}
      {/* {pathname === "/onboarding" && <OnboardingView />} */}
    </div>
  );
};

export default BodyLayout;
