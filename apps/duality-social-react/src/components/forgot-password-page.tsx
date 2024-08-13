import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppConstants } from '@duality-social/duality-social-lib';
import { isAxiosError } from 'axios';
import api from '../services/api';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
} from '@mui/material';

type FormValues = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const ForgotPasswordPage: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isTokenValid, setIsTokenValid] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      validateToken(token);
    }
  }, [location]);

  const validateToken = async (token: string) => {
    try {
      await api.get(`/user/verify-reset-token?token=${token}`);
      setIsTokenValid(true);
    } catch (error) {
      setIsTokenValid(false);
      setErrorMessage(
        'Invalid or expired token. Please request a new password reset.'
      );
    }
  };

  const initialValues: FormValues = isTokenValid
    ? { password: '', confirmPassword: '' }
    : { email: '' };

  const validationSchema = isTokenValid
    ? Yup.object({
        password: Yup.string()
          .matches(AppConstants.PasswordRegex, AppConstants.PasswordRegexError)
          .required('Required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Required'),
      })
    : Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
      });

  const handleSubmit = async (values: FormValues) => {
    try {
      if (values.email) {
        // Handle forgot password
        const response = await api.post('/user/forgot-password', {
          email: values.email,
        });
        if (response.status === 200) {
          setSuccessMessage(response.data.message);
          setErrorMessage('');
        } else {
          setErrorMessage(response.data.message);
          setSuccessMessage('');
        }
      } else if (values.password && values.confirmPassword) {
        // Handle password reset
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        if (!token) {
          setErrorMessage(
            'Invalid token. Please try the password reset process again.'
          );
          return;
        }
        const response = await api.post('/user/reset-password', {
          token,
          password: values.password,
        });
        if (response.status === 200) {
          setSuccessMessage(
            'Your password has been successfully reset. You can now log in with your new password.'
          );
          setErrorMessage('');
          setTimeout(() => navigate('/login'), 3000);
        } else {
          setErrorMessage(response.data.message);
          setSuccessMessage('');
        }
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        setErrorMessage(
          error.response.data.message ||
            'An error occurred while processing your request.'
        );
        setSuccessMessage('');
      } else {
        setErrorMessage('An unexpected error occurred');
        setSuccessMessage('');
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          {isTokenValid ? 'Reset Password' : 'Forgot Password'}
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          {isTokenValid ? (
            <>
              <TextField
                fullWidth
                margin="normal"
                id="password"
                name="password"
                label="New Password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                fullWidth
                margin="normal"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </>
          ) : (
            <TextField
              fullWidth
              margin="normal"
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            {isTokenValid ? 'Reset Password' : 'Send Reset Email'}
          </Button>
        </Box>

        {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default ForgotPasswordPage;