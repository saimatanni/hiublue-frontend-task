"use client";

import { Box, Stack } from "@mui/material";
import WebsiteVisitsChart from "./chart/WebsiteVisitsChart";
import OffersSentChart from "./chart/OffersSentChart";

export default function DashboardCharts({
  filter,
}: {
  filter: "this-week" | "prev-week";
}) {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={2}
      mt={{ xs: 2, md: 3 }}
      justifyContent="space-between"
      alignItems="stretch"
    >
      {/* ✅ Website Visits Chart */}
      <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "48%",height: "100%" } }}>
        <WebsiteVisitsChart filter={filter} />
      </Box>

      {/* ✅ Offers Sent Chart */}
      <Box sx={{ flex: 1, minWidth: { xs: "100%", md: "48%" ,height: "100%"} }}>
        <OffersSentChart filter={filter} />
      </Box>
    </Stack>
  );
}
