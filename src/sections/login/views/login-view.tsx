'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { redirect, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Box, Button, FormControl, FormLabel, TextField, Typography, Stack, Checkbox,
    FormControlLabel, CssBaseline, Link, CircularProgress, Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';

// ✅ Schema Validation using Zod
const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

// ✅ Styled Card Component
const Card = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    maxWidth: '450px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
}));

export default function SignIn() {
    const { login } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
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
        setError('');

        try {
            await login(data.email, data.password);
            router.push('/'); // Redirect after successful login
            // redirect(`/`)
        } catch (err) {
            setError('Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    if (!isMounted) {
        return null; // Fix Next.js hydration issue
    }

    return (
        <>
            <CssBaseline />
            <Stack direction="column" justifyContent="center" alignItems="center" height="100vh">
                <Card>
                    <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }}>
                        Sign in
                    </Typography>

                    {/* ✅ Show error message */}
                    {error && <Alert severity="error">{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        
                        {/* ✅ Email Input */}
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <TextField
                                type="email"
                                {...register('email')}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                required
                            />
                        </FormControl>

                        {/* ✅ Password Input */}
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <TextField
                                type="password"
                                {...register('password')}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                required
                            />
                        </FormControl>

                        {/* ✅ Remember Me Checkbox */}
                        <FormControlLabel control={<Checkbox />} label="Remember me" />

                        {/* ✅ Submit Button with Loader */}
                        <Button type="submit" variant="contained" fullWidth disabled={loading}>
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
                        </Button>

                        {/* ✅ Forgot Password Link */}
                        <Link href="/forgot-password" variant="body2" sx={{ alignSelf: 'center' }}>
                            Forgot your password?
                        </Link>
                    </Box>
                </Card>
            </Stack>
        </>
    );
}
