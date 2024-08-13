import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Navigate } from 'react-router-dom';
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

const ChangePasswordPage: React.FC = () => {
  const { isAuthenticated, user, loading, error, changePassword } =
    useContext(AuthContext);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .matches(AppConstants.PasswordRegex, AppConstants.PasswordRegexError)
      .required('Current password is required'),
    newPassword: Yup.string()
      .matches(AppConstants.PasswordRegex, AppConstants.PasswordRegexError)
      .notOneOf([Yup.ref('currentPassword')], 'New password must be different from the current password')
      .required('New password is required'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
      .required('Please confirm your new password'),
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const result = await changePassword(values.currentPassword, values.newPassword);
        if (result.success) {
          setSuccessMessage(result.message);
          setErrorMessage(null);
          resetForm();
        }
      } catch (err) {
        console.error('Error changing password:', err);
        if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage('An unexpected error occurred');
        }
        setSuccessMessage(null);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          Change Password
        </Typography>
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
          <TextField
            fullWidth
            margin="normal"
            id="currentPassword"
            name="currentPassword"
            label="Current Password"
            type="password"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
            helperText={formik.touched.currentPassword && formik.errors.currentPassword}
          />
          <TextField
            fullWidth
            margin="normal"
            id="newPassword"
            name="newPassword"
            label="New Password"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
          />
          <TextField
            fullWidth
            margin="normal"
            id="confirmNewPassword"
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmNewPassword && Boolean(formik.errors.confirmNewPassword)}
            helperText={formik.touched.confirmNewPassword && formik.errors.confirmNewPassword}
          />

          {(error || errorMessage) && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error || errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {successMessage}
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
            {formik.isSubmitting ? 'Changing Password...' : 'Change Password'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChangePasswordPage;