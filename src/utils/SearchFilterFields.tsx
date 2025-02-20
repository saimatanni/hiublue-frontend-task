"use client";

import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputAdornment,
  
  FormControl,
  InputLabel,
} from "@mui/material";
import { Icon } from "@iconify/react";

interface FilterFieldsProps {
  search: string;
  setSearch: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  setPage: (value: number) => void;
}

export default function FilterFields({
  search,
  setSearch,
  type,
  setType,
  setPage,
}: FilterFieldsProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        alignItems: "center",
        flexWrap: "wrap",
        mb: 2,
        px:3,
      }}
    >
      {/* ✅ Search Input Field - Matches Design */}
      <TextField
        placeholder="Search..."
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        sx={{
          flex: 1,
          width: "auto",
          minWidth: 200,
          maxWidth: 505,
          borderRadius: "8px",
        //   backgroundColor: "#F8FAFC",
          "& fieldset": { border: "1px solid #E2E8F0 !important" },
          "&:hover fieldset": { border: "1px solid #CBD5E1 !important" },
          "& input": { padding: "10px 14px" },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="mdi:magnify" color="#94A3B8" width="20" />
            </InputAdornment>
          ),
        }}
      />

      {/* ✅ Type Select Field - Matches 2nd Image Design */}

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={(e) => {
            setType(e.target.value);
            setPage(1);
          }}
          sx={{
            minWidth: 200,
            width: "auto",
            boxShadow: "none",
            ".MuiOutlinedInput-notchedOutline": {
              border: "1px solid #E2E8F0",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #CBD5E1",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "1px solid #CBD5E1",
            },
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="yearly">Yearly</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
