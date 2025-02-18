"use client";

import { Stack, Box } from "@mui/material";
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
      width="100%"
      flexWrap="wrap"
      useFlexGap
      justifyContent="space-between"
    >
      <Box sx={{ flex: 1, md: "50%" }}>
        <WebsiteVisitsChart filter={filter} />
      </Box>
      <Box sx={{ flex: 1, md: "50%" }}>
        <OffersSentChart filter={filter} />
      </Box>
    </Stack>
  );
}
