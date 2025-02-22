

import DashboardView from "@/sections/dashboard/dashboard-view";

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
