import DashboardLayout from "@/components/layout/DashboardLayout";
import ProtectedRoute from "@/route/ProtectedRoute";

import DashboardView from "@/sections/dashboard/dashboard-view";

export const metadata = {
  title: "Dashboard",
};

export default function Page() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <DashboardView />
      </DashboardLayout>
    </ProtectedRoute>
  );
}
