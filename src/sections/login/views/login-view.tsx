"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import MuiCard from "@mui/material/Card";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Stack,
  Checkbox,
  FormControlLabel,
  CssBaseline,
  Link,
  CircularProgress,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// ✅ Schema Validation using Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

// ✅ Styled Card Component
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "100vh",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
}));
export default function SignIn() {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setLoading(true);
    setError("");

    try {
      await login(data.email, data.password);
      router.push("/"); // Redirect after successful login
      // redirect(`/`)
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  if (!isMounted) {
    return null; // Fix Next.js hydration issue
  }

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignInContainer
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Card variant="outlined">
          <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
            Sign in
          </Typography>

          {/* ✅ Show error message */}
          {error && <Alert severity="error">{error}</Alert>}

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {/* ✅ Email Input */}
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                autoFocus
                required
                fullWidth
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            </FormControl>

            {/* ✅ Password Input */}
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                type="password"
                placeholder="••••••"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            </FormControl>

            {/* ✅ Remember Me Checkbox */}
            <FormControlLabel control={<Checkbox />} label="Remember me" />

            {/* ✅ Submit Button with Loader */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign in"
              )}
            </Button>

            {/* ✅ Forgot Password Link */}
            <Link
              component="button"
              type="button"
              onClick={() => {}}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Forgot your password?
            </Link>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
