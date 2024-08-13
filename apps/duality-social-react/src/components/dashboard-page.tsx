import React, { useEffect, useState, memo } from 'react';
import { useAuth } from '../auth-provider';
import {
  Box,
  Container,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
} from '@mui/material';

const DashboardPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" flexDirection="column" gap={3}>
        {/* Welcome Message */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h4" color="primary" gutterBottom>
            Welcome to Your Dashboard, {user?.username || 'User'}
          </Typography>
        </Paper>

        {/* Main content area */}
        <Box display="flex" gap={3} flexDirection={{ xs: 'column', md: 'row' }}>
          {/* Hot Posts */}
          <Paper sx={{ p: 2, flex: 1 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Hot Posts
            </Typography>
            <List>
              {['Post 1', 'Post 2', 'Post 3'].map((post, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={post} secondary={`Topic: Sample Topic ${index + 1}`} />
                  </ListItem>
                  {index < 2 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>

          {/* Recent Comments */}
          <Paper sx={{ p: 2, flex: 1 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Recent Comments
            </Typography>
            <List>
              {['Comment 1', 'Comment 2', 'Comment 3'].map((comment, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={comment} secondary={`On: Post ${index + 1}`} />
                  </ListItem>
                  {index < 2 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Box>

        {/* User Statistics */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" color="primary" gutterBottom>
            Your Statistics
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {['Total Posts', 'Total Comments', 'Likes Received', 'Days Active'].map((stat, index) => (
              <Box key={index} flex="1 1 calc(25% - 16px)" minWidth="120px">
                <Typography variant="h4">
                  {Math.floor(Math.random() * 100)}
                </Typography>
                <Typography color="text.secondary">{stat}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default memo(DashboardPage);