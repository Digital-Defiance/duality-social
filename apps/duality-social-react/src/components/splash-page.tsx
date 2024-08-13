import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Container 
} from '@mui/material';

const SplashPage: React.FC = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      textAlign: 'center', 
      py: 4 
    }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <img src="/assets/DualitySocial.png" alt="DualitySocial Logo" style={{ width: 150 }} />
        </Box>
        <Typography variant="h1" sx={{ mb: 2 }}>
          Welcome to Duality Social
        </Typography>
        <Typography variant="h5" sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}>
          Discuss both sides of every conversation in our unique social experiment.
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {[
            { title: "AI-Generated Perspectives", description: "For every post, an AI generates an opposite perspective, challenging your viewpoint." },
            { title: "Linked Discussions", description: "Human and AI posts are linked, allowing you to engage with both sides of the conversation." },
            { title: "Interactive Voting", description: "Vote on which perspective you think was written by a human, testing your perception." }
          ].map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ mb: 4 }}>
          <Button component={RouterLink} to="/register" variant="contained" color="secondary" sx={{ mr: 2 }}>
            Sign Up
          </Button>
          <Button component={RouterLink} to="/login" variant="outlined" color="secondary">
            Log In
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary">
          &copy; 2023 DualitySocial. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default SplashPage;