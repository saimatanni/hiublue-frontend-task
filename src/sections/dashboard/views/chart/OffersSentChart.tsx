"use client";

import dynamic from "next/dynamic";
import { Card, Typography } from "@mui/material";
import useDashboardCharts from "@/hooks/useDashboardCharts";
import Loader from "@/utils/Loader";

// ✅ Import ApexCharts dynamically (for Next.js SSR)
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function OffersSentChart({
  filter,
}: {
  filter: "this-week" | "prev-week";
}) {
  const { data, loading, error } = useDashboardCharts(filter);

  if (loading) return <Loader />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return null;

  // ✅ Corrected day order: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
  const dayMap: Record<string, string> = {
    "saturday": "Sat",
    "sunday": "Sun",
    "monday": "Mon",
    "tuesday": "Tue",
    "wednesday": "Wed",
    "thursday": "Thu",
    "friday": "Fri"
  };

  const categories = Object.keys(dayMap).map(key => dayMap[key]); // ✅ ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
  const offerData = Object.keys(dayMap).map(day => data.offers_sent[day] || 0); // ✅ Match API response

  return (
    <Card sx={{ padding: "20px", borderRadius: "12px", boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.12)" }}>
      <Typography variant="h6" fontWeight={600} color="#1C252E" mb={2}>
        Offers sent
      </Typography>
      <Chart
        type="line"
        height={280}
        options={{
          chart: { toolbar: { show: false } },
          stroke: { width: 3, curve: "smooth", colors: ["#000000"] }, // ✅ Black Line
          xaxis: {
            categories,
            labels: {
              show: true,
              style: { fontSize: "12px", fontWeight: 500, colors: "#919EAB" }, // ✅ Set correct text color
            },
          },
          yaxis: {
            labels: {
              style: { fontSize: "12px", fontWeight: 500, colors: "#919EAB" }, // ✅ Text color #919EAB
            },
          },
          dataLabels: { enabled: false },
          grid: { borderColor: "#EAEAEA" },
        }}
        series={[{ name: "Offers Sent", data: offerData }]}
      />
    </Card>
  );
}
