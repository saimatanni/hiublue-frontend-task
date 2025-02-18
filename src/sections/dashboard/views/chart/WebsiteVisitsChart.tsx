"use client";

import dynamic from "next/dynamic";
import { Card, Typography, Box } from "@mui/material";
import useDashboardCharts from "@/hooks/useDashboardCharts";
import Loader from "@/utils/Loader";

// ✅ Import ApexCharts dynamically (for Next.js SSR)
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function WebsiteVisitsChart({
  filter,
}: {
  filter: "this-week" | "prev-week";
}) {
  const { data, loading, error } = useDashboardCharts(filter);

  if (loading) return <Loader />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!data) return null;

  // ✅ Corrected day order: ["Sat", "Sun", "Mon", "Tue", ...]
  const dayMap: Record<string, string> = {
    saturday: "Sat",
    sunday: "Sun",
    monday: "Mon",
    tuesday: "Tue",
    wednesday: "Wed",
    thursday: "Thu",
    friday: "Fri",
  };

  const categories = Object.keys(dayMap).map((key) => dayMap[key]); // ✅ ["Sat", "Sun", "Mon", "Tue", ...]
  const desktopData = Object.keys(dayMap).map(
    (day) => data.website_visits[day]?.desktop || 0
  );
  const mobileData = Object.keys(dayMap).map(
    (day) => data.website_visits[day]?.mobile || 0
  );

  return (
    <Card
      sx={{
        padding: "24px",
        borderRadius: "12px",
        boxShadow: "0px 12px 24px -4px rgba(145, 158, 171, 0.12)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: "18px", fontWeight: 600, color: "#1C252E" }}
        >
          Website visits
        </Typography>

        {/* ✅ Move legend to the top-right */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                backgroundColor: "#2E7D32",
                borderRadius: "50%",
              }}
            />
            <Typography
              sx={{ fontSize: "14px", fontWeight: 500, color: "#637381" }}
            >
              Desktop
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Box
              sx={{
                width: 10,
                height: 10,
                backgroundColor: "#FFB300",
                borderRadius: "50%",
              }}
            />
            <Typography
              sx={{ fontSize: "14px", fontWeight: 500, color: "#637381" }}
            >
              Mobile
            </Typography>
          </Box>
        </Box>
      </Box>

      <Chart
        type="bar"
        height={280}
        options={{
          chart: { toolbar: { show: false } },
          colors: ["#007867", "#FFAB00"], // ✅ Green & Yellow
          plotOptions: {
            bar: {
              columnWidth: "75%", // ✅ Reduce width for spacing
              barHeight: "100%",
              borderRadiusApplication: "end", // ✅ Apply border-radius only to top
              borderRadius: 3, // ✅ Slight rounding on top
              dataLabels: { position: "top" },
              distributed: false, // ✅ Ensure grouped bars
            },
          },
          dataLabels: { enabled: false },
          xaxis: {
            categories,
            labels: {
              show: true,
              style: { fontSize: "12px", fontWeight: 500, colors: "#919EAB" },
            }, // ✅ Show `Sat, Sun, Mon...`
          },
          yaxis: {
            labels: {
              style: { fontSize: "12px", fontWeight: 500, colors: "#919EAB" },
            }, // ✅ Text color #919EAB
          },
          grid: { borderColor: "#EAEAEA" },
          legend: { show: false }, // ✅ Hide default bottom legend
        }}
        series={[
          { name: "Desktop", data: desktopData },
          { name: "Mobile", data: mobileData },
        ]}
      />
    </Card>
  );
}
