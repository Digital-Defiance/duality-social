// file: user-profile.tsx
import React, { useState, useEffect } from 'react';
import { Container, Paper, Skeleton } from '@mui/material';
import { getToken, verifyToken, getUserDetails } from '../utils/auth';
import { ITokenUser } from '@duality-social/duality-social-lib';

const UserProfile = () => {
  const [user, setUser] = useState<ITokenUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token && verifyToken(token)) {
      setIsAuthenticated(true);
      fetchUserProfile(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const userDetails = getUserDetails(token);
      setUser(userDetails);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
          <Skeleton variant="circular" width={120} height={120} sx={{ mx: 'auto', mb: 2 }} />
          <Skeleton variant="text" height={40} width="60%" sx={{ mx: 'auto', mb: 1 }} />
          <Skeleton variant="text" height={20} width="40%" sx={{ mx: 'auto', mb: 2 }} />
          <Skeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        {/* Render user profile details here */}
      </Paper>
    </Container>
  );
};

export default UserProfile;