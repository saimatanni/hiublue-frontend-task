"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  TextField,
  Autocomplete,
  Typography,
  Divider,
  InputAdornment,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import useDebounce from "@/hooks/useDebounce";
import { BpCheckbox } from "@/utils/BpCheckbox";
import { BpRadio } from "@/utils/BpRadio";
import api from "@/utils/apiInterceptor";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

// Schema definition (user_id and price are numbers)
const offerSchema = z.object({
  plan_type: z.enum(["monthly", "yearly", "pay_as_you_go"]),
  additions: z.array(z.string()).optional(),
  user_id: z.coerce.number().min(1, "User is required"),
  expired: z.string().min(1, "Expiry date is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
});

type OfferFormValues = z.infer<typeof offerSchema>;

export default function OnboardingView() {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OfferFormValues>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      plan_type: "monthly",
      additions: [],
      user_id: 0,
      expired: "",
      price: 0,
    },
  });

  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [responseMessage, setResponseMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Debounced search for the Autocomplete input
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearch.trim() === "") {
      fetchUsers();
      return;
    }
    fetchUsers(debouncedSearch);
  }, [debouncedSearch]);

  // Fetch users from the API
  const fetchUsers = async (searchQuery = "") => {
    setLoadingUsers(true);
    try {
      const response = await api.get("api/users", {
        params: { search: searchQuery, page: 1, per_page: 5 },
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Handle form submission
  const onSubmit = async (data: OfferFormValues) => {
    try {
      setResponseMessage(null);
      await api.post("api/offers", data);
      setResponseMessage({ type: "success", text: "Offer Sent Successfully!" });
      // Clear the form fields after successful submission
      reset({
        plan_type: "monthly",
        additions: [],
        user_id: 0,
        expired: "",
        price: 0,
      });
      setSearchTerm("");
    } catch (error) {
      console.error("Error sending offer:", error);
      setResponseMessage({
        type: "error",
        text: "Failed to send offer. Please try again.",
      });
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: "auto",
        mb: 5,
        borderRadius: 3,
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        backgroundColor: "white",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" color="#1C252E">
          Create Offer
        </Typography>
        <Typography variant="body2" color="#637381">
          Send onboarding offer to new user
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Plan Type */}
          <FormControl fullWidth>
            <FormLabel
              sx={{ fontWeight: "bold", color: "#1C252E", fontSize: "14px" }}
            >
              Plan Type
            </FormLabel>
            <Controller
              name="plan_type"
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field} sx={{ gap: 2 }}>
                  <FormControlLabel
                    value="pay_as_you_go"
                    control={<BpRadio />}
                    label="Pay As You Go"
                  />
                  <FormControlLabel
                    value="monthly"
                    control={<BpRadio />}
                    label="Monthly"
                  />
                  <FormControlLabel
                    value="yearly"
                    control={<BpRadio />}
                    label="Yearly"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>

          {/* Additions */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <FormLabel
              sx={{ fontWeight: "bold", color: "#1C252E", fontSize: "14px" }}
            >
              Additions
            </FormLabel>
            <Controller
              name="additions"
              control={control}
              render={({ field }) => (
                <Box sx={{ display: "flex", gap: 2 }}>
                  <FormControlLabel
                    control={
                      <BpCheckbox
                        checked={(field.value ?? []).includes("refundable")}
                        onChange={(e) => {
                          const current = field.value ?? [];
                          if (e.target.checked) {
                            field.onChange([...current, "refundable"]);
                          } else {
                            field.onChange(
                              current.filter(
                                (val: string) => val !== "refundable"
                              )
                            );
                          }
                        }}
                      />
                    }
                    label="Refundable"
                  />
                  <FormControlLabel
                    control={
                      <BpCheckbox
                        checked={(field.value ?? []).includes("on_demand")}
                        onChange={(e) => {
                          const current = field.value ?? [];
                          if (e.target.checked) {
                            field.onChange([...current, "on_demand"]);
                          } else {
                            field.onChange(
                              current.filter(
                                (val: string) => val !== "on_demand"
                              )
                            );
                          }
                        }}
                      />
                    }
                    label="On Demand"
                  />
                  <FormControlLabel
                    control={
                      <BpCheckbox
                        checked={(field.value ?? []).includes("negotiable")}
                        onChange={(e) => {
                          const current = field.value ?? [];
                          if (e.target.checked) {
                            field.onChange([...current, "negotiable"]);
                          } else {
                            field.onChange(
                              current.filter(
                                (val: string) => val !== "negotiable"
                              )
                            );
                          }
                        }}
                      />
                    }
                    label="Negotiable"
                  />
                </Box>
              )}
            />
          </FormControl>

          {/* User Selection */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <FormLabel
              sx={{
                fontWeight: "bold",
                color: "#1C252E",
                fontSize: "14px",
                mb: 2,
              }}
            >
              User
            </FormLabel>
            <Controller
              name="user_id"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={users}
                  loading={loadingUsers}
                  getOptionLabel={(option) => option.name}
                  onInputChange={(_, value) => setSearchTerm(value)}
                  onChange={(_, selected) =>
                    setValue("user_id", selected?.id ?? 0)
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      size="small"
                      placeholder="Search User..."
                      error={!!errors.user_id}
                      helperText={errors.user_id?.message}
                    />
                  )}
                />
              )}
            />
          </FormControl>

          {/* Expiry Date */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <FormLabel
              sx={{ fontWeight: "bold", color: "#1C252E", fontSize: "14px" }}
            >
              Expired
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Controller
                name="expired"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    views={["day", "month", "year"]}
                    format="DD MMM YYYY"
                    // If no date is selected, pass null so the input remains empty
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) =>
                      setValue("expired", date ? date.format("YYYY-MM-DD") : "")
                    }
                    slotProps={{
                      textField: { size: "small", fullWidth: true },
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>

          {/* Price Input */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <FormLabel
              sx={{ fontWeight: "bold", color: "#1C252E", fontSize: "14px" }}
            >
              Price
            </FormLabel>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  type="number"
                  placeholder="Price"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
          </FormControl>

          {/* Submit Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                mt: 3,
                fontSize: "15px",
                width: "auto",
                backgroundColor: "#1C252E",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#1C252F" },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Send Offer"
              )}
            </Button>
          </Box>

          {/* Response Message */}
          {responseMessage && (
            <Alert
              severity={responseMessage.type}
              sx={{ mt: 2, mx: "auto", width: "80%", textAlign: "center" }}
            >
              {responseMessage.text}
            </Alert>
          )}
        </form>
      </Box>
    </Box>
  );
}
