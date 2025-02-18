"use client";

import { Card, Typography, Box, Select, MenuItem, Stack } from "@mui/material";
import Image from "next/image";
import { Icon } from "@iconify/react";

import useDashboardCharts from "@/hooks/useDashboardState";
import Loader from "@/utils/Loader";

interface DashboardStatsProps {
  filter: "this-week" | "prev-week";
  setFilter: (value: "this-week" | "prev-week") => void;
}

export default function DashboardStats({
  filter,
  setFilter,
}: DashboardStatsProps) {
  const { stats, loading, error } = useDashboardCharts(filter);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!stats) return null; // ✅ Ensure data exists before rendering

  // Extract current and previous values
  const { current, previous } = stats;

  const statsData = [
    {
      title: "Total active users",
      value: current.active_users,
      previous: previous.active_users,
    },
    { title: "Total clicks", value: current.clicks, previous: previous.clicks },
    {
      title: "Total appearances",
      value: current.appearance,
      previous: previous.appearance,
    },
  ];

  return (
    <Box>
      {/* ✅ Header and Filter Dropdown */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", color: "#1C252E" }}>
          Dashboard
        </Typography>
        <Select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as "this-week" | "prev-week")
          }
          size="small"
          displayEmpty
          IconComponent={() => (
            <Icon
              icon="mdi:chevron-down"
              width="20"
              height="20"
              style={{ color: "#1C252E" }}
            />
          )}
          sx={{
            minWidth: 150,
            backgroundColor: "#F4F6F8",
            borderRadius: "8px",
            color: "#1C252E",
            fontWeight: 600,
            height: "34px",
            paddingX: "12px",
            ".MuiSelect-select": {
              paddingRight: "32px !important",
            },
          }}
        >
          <MenuItem value="this-week">This Week</MenuItem>
          <MenuItem value="prev-week">Prev Week</MenuItem>
        </Select>
      </Stack>

      {/* ✅ Stats Cards (Now Fully Responsive with `Stack`) */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        flexWrap="wrap"
        useFlexGap
        justifyContent="space-between"
      >
        {statsData.map((stat, index) => {
          const percentageChange = previous
            ? ((stat.value - stat.previous) / stat.previous) * 100
            : 0;
          const isPositive = percentageChange >= 0;
          const arrowImage = isPositive
            ? "/img/icon/up-arrow-green.png"
            : "/img/icon/down-arrow-red.png";

          return (
            <Card
              key={index}
              sx={{
                flex: { xs: "1 1 100%", sm: "1 1 32%" }, // ✅ Responsive layout
                padding: "24px",
                borderRadius: "16px",
                boxShadow: `0px 12px 24px -4px rgba(145, 158, 171, 0.12), 0px 0px 2px 0px rgba(145, 158, 171, 0.20)`, // ✅ Exact shadow match
                minHeight: "120px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, color: "#1C252E" }}
              >
                {stat.title}
              </Typography>
              <Typography
                variant="h3"
                sx={{ fontWeight: "bold", fontSize: "32px", color: "#1C252E" }}
              >
                {stat.value.toLocaleString()}
              </Typography>

              <Stack direction="row" alignItems="center" spacing={0.5}>
                {/* ✅ Up/Down Arrow Image */}
                <Image
                  src={arrowImage}
                  alt="trend arrow"
                  width={24}
                  height={24}
                />

                {/* ✅ Percentage (Bold & Colored) */}
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, fontSize: "14px", color: "#1C252E" }}
                >
                  {Math.abs(percentageChange).toFixed(2)}%
                </Typography>

                {/* ✅ Subtitle (Lighter Gray) */}
                <Typography
                  variant="body2"
                  sx={{ fontSize: "14px", color: "#637381" }}
                >
                  {filter === "this-week" ? "This week" : "Previous week"}
                </Typography>
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}
