import React, { useEffect, useState } from 'react';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import authService from '../services/auth-service';
import { useNavigate, Navigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { AuthContext } from '../auth-provider';
import { AppConstants } from '@duality-social/duality-social-lib';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Paper,
} from '@mui/material';

interface FormValues {
  username: string;
  email: string;
  password: string;
  timezone: string;
}

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = React.useContext(AuthContext);
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<boolean>(false);
  const [userTimezone, setUserTimezone] = useState<string>('');

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserTimezone(timezone);
  }, []);

  const formik = useFormik<FormValues>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      timezone: userTimezone,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(AppConstants.UsernameRegex, AppConstants.UsernameRegexError)
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .matches(AppConstants.PasswordRegex, AppConstants.PasswordRegexError)
        .required('Required'),
      timezone: Yup.string().required('Timezone is required'),
    }),
    onSubmit: async (values, { setSubmitting }: FormikHelpers<FormValues>) => {
      try {
        await authService.register(
          values.username,
          values.email,
          values.password,
          values.timezone
        );
        setRegistrationError(null);
        setRegistrationSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error: unknown) {
        console.error(error);
        if (isAxiosError(error) && error.response) {
          setRegistrationError(
            error.response.data?.message ||
              'An error occurred during registration. Please try again.'
          );
        } else {
          setRegistrationError('An unexpected error occurred. Please try again.');
        }
        setRegistrationSuccess(false);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Register
        </Typography>
        {registrationSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Registration successful! You will be redirected to the login page shortly.
          </Alert>
        )}
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            margin="normal"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            type="email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          {registrationError && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {registrationError}
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
            sx={{ mt: 3, mb: 2 }}
          >
            {formik.isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;