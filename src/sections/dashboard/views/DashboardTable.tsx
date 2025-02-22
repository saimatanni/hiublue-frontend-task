"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box,
  IconButton,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import { Icon } from "@iconify/react";
import useDebounce from "@/hooks/useDebounce";
import SearchFilterFields from "@/utils/SearchFilterFields";
import Loader from "@/utils/Loader";
import api from "@/utils/apiInterceptor";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface Offer {
  id: number;
  user_name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  status: string;
  type: string;
  price: number;
}

export default function OfferTable() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("all");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [tabIndex, setTabIndex] = useState(0); // ✅ Tabs state

  const debouncedSearch = useDebounce(search, 500);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetchOffers();
  }, [debouncedSearch, status, type, page, rowsPerPage, tabIndex]);

  const fetchOffers = async () => {
    setLoading(true);
    try {
      const response = await api.get(`api/offers`, {
        
        params: {
          page,
          per_page: rowsPerPage,
          search: debouncedSearch || undefined,
          status: tabIndex === 1 ? "accepted" : status || undefined,
          type: type === "all" ? "" : type !== "all" ? type : undefined,
        },
      });

      setOffers(response.data.data);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      console.error("Failed to fetch offers:", error);
    }
    setLoading(false);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return { bg: "#22C55E29", color: "#118D57" };
      case "rejected":
        return { bg: "#FF563029", color: "#B71D18" };
      case "pending":
        return { bg: "#FFAB0029", color: "#B76E00" };
      default:
        return { bg: "#F3F4F6", color: "#6B7280" };
    }
  };

  return (
    <Paper
      sx={{
        mt: 3,
        // p: 3,
        borderRadius: 2,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontSize: "18px", fontWeight: 600, color: "#1C252E", p: 3 }}
      >
        Offer List
      </Typography>
      {/* ✅ Tabs for Filtering Offers */}
      <Tabs
        value={tabIndex}
        onChange={(_, newValue) => setTabIndex(newValue)}
        sx={{
          mb: 3,
          borderBottom: "1px solid #EAEAEA",
          "& .MuiTab-root": { color: "#637381", fontWeight: 500 }, // Default inactive color
          "& .Mui-selected": { color: "#1C252E", fontWeight: 500 }, // Active tab color
          "& .MuiTabs-indicator": {
      backgroundColor: "#1C252E" // ✅ Fix: Matches active tab color
    }
        }}
      >
        <Tab label="All" />
        <Tab label="Accepted" />
      </Tabs>

      {/* ✅ Search and Filters */}
      <SearchFilterFields
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        setPage={setPage}
      />

      {/* ✅ Loader */}
      {loading && <Loader />}

      {/* ✅ No Data Found Message */}
      {!loading && offers.length === 0 && (
        <Box sx={{ textAlign: "center", py: 4, color: "#64748B" }}>
          <Icon
            icon="mdi:alert-circle-outline"
            width="40"
            height="40"
            color="#64748B"
          />
          <Typography variant="h6" mt={1}>
            No Data Found
          </Typography>
          <Typography variant="body2">
            Try adjusting your filters or search.
          </Typography>
        </Box>
      )}

      {/* ✅ Table Container */}
      {!loading && offers.length > 0 && (
        <>
          <TableContainer sx={{ overflowX: "auto" }} aria-label="simple table">
            <Table sx={{ minWidth: 850 }}>
              <TableHead sx={{ backgroundColor: "#F4F6F8", color: "#637381" }}>
                <TableRow>
                  <TableCell>
                    <Typography fontWeight="semiBold" variant="body2">
                      Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="semiBold" variant="body2">
                      Phone
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="semiBold" variant="body2">
                      Company
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="semiBold" variant="body2">
                      Job Title
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="semiBold" variant="body2">
                      Type
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography fontWeight="semiBold" variant="body2">
                      Status
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight="semiBold" variant="body2">
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {offers.map((offer) => {
                  const statusStyle = getStatusStyles(offer.status);
                  return (
                    <TableRow key={offer.id}>
                      <TableCell>
                        <Typography variant="body2" color="#1C252E">
                          {offer.user_name}
                        </Typography>
                        <Typography variant="body2" color="#919EAB">
                          {offer.email}
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          whiteSpace: "nowrap",
                          fontSize: "14px",
                          color: "#1C252E",
                        }}
                      >
                        {offer.phone}
                      </TableCell>
                      <TableCell sx={{ fontSize: "14px", color: "#1C252E" }}>
                        {offer.company}
                      </TableCell>
                      <TableCell sx={{ fontSize: "14px", color: "#1C252E" }}>
                        {offer.jobTitle}
                      </TableCell>
                      <TableCell sx={{ fontSize: "14px", color: "#1C252E" }}>
                        {offer.type}
                      </TableCell>

                      {/* ✅ Improved Status Label UI */}
                      <TableCell>
                        <Box
                          sx={{
                            backgroundColor: statusStyle.bg,
                            color: statusStyle.color,
                            borderRadius: "6px",
                            px: 2,
                            py: 0.5,
                            fontSize: "12px",
                            fontWeight: 600,
                            textAlign: "center",
                            display: "inline-block",
                            minWidth: "80px",
                          }}
                        >
                          {offer.status.charAt(0).toUpperCase() +
                            offer.status.slice(1)}
                        </Box>
                      </TableCell>

                      {/* ✅ Improved Action Icons */}
                      <TableCell align="right">
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <IconButton color="default">
                            <Icon icon="solar:pen-bold" width="18" />
                          </IconButton>
                          <IconButton color="default">
                            <Icon icon="mdi:dots-vertical" width="20" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* ✅ Pagination */}
          <TablePagination
            component="div"
            count={totalPages * rowsPerPage}
            page={page - 1}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 15]}
          />
        </>
      )}
    </Paper>
  );
}
