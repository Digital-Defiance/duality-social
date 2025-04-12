// file: user-profile.tsx
import { IApiUserProfileResponse } from '@duality-social/duality-social-lib';
import {
  Box,
  Chip,
  Container,
  List,
  ListItem,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import Link from '@mui/material/Link';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth-provider.tsx';
import authenticatedApi from '../services/authenticated-api.ts';
import { getToken, verifyToken } from '../utils/auth.ts';
import NewPost from './new-post.tsx';

const UserProfilePage = () => {
  const { user: authUser } = useContext(AuthContext);
  const [user, setUser] = useState<IApiUserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const pageUsername = window.location.pathname.split('/').pop();

  useEffect(() => {
    const checkAuthentication = () => {
      const token = getToken();
      if (!token || !verifyToken(token)) {
        navigate('/login');
        return false;
      }
      return true;
    };

    const fetchData = async () => {
      if (checkAuthentication()) {
        if (pageUsername) {
          await fetchUserProfile(pageUsername);
        } else {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [navigate, pageUsername]);

  const fetchUserProfile = async (username: string) => {
    try {
      const response = await authenticatedApi.get(`/user/profile/${username}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const isOwnProfile =
    pageUsername && authUser?.username && pageUsername === authUser?.username;

  if (isLoading) {
    return (
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
          <Skeleton
            variant="circular"
            width={120}
            height={120}
            sx={{ mx: 'auto', mb: 2 }}
          />
          <Skeleton
            variant="text"
            height={40}
            width="60%"
            sx={{ mx: 'auto', mb: 1 }}
          />
          <Skeleton
            variant="text"
            height={20}
            width="40%"
            sx={{ mx: 'auto', mb: 2 }}
          />
          <Skeleton variant="rectangular" height={100} sx={{ mb: 2 }} />
          <Stack
            direction="row"
            spacing={2}
            sx={{ flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} variant="text" width={80} height={20} />
            ))}
          </Stack>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        {user ? (
          <>
            <Typography variant="h4" gutterBottom>
              {user.profile.username}
            </Typography>
            <Typography variant="body1" paragraph>
              {user.profile.bio}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Joined: {new Date(user.profile.createdAt).toLocaleDateString()}
            </Typography>
            {user.profile.socialUrls.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Social Links:</Typography>
                <List>
                  {user.profile.socialUrls.map((url, index) => (
                    <ListItem key={index}>
                      <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Stats:</Typography>
              <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
                <Typography variant="body2">
                  Posts: {user.profile.metadata.totalPosts}
                </Typography>
                <Typography variant="body2">
                  Replies: {user.profile.metadata.totalReplies}
                </Typography>
                <Typography variant="body2">
                  Reactions: {user.profile.metadata.totalReactionsReceived}
                </Typography>
                <Typography variant="body2">
                  Votes: {user.profile.metadata.totalVotesReceived}
                </Typography>
              </Stack>
            </Box>
            {user.profile.verified && (
              <Chip
                label="Verified"
                color="primary"
                icon={<i className="fa-solid fa-check-circle" />}
                sx={{ mt: 2 }}
              />
            )}
          </>
        ) : (
          <Typography variant="body1">
            User profile not found or still loading.
          </Typography>
        )}
      </Paper>
      {user && isOwnProfile && (
        <Box sx={{ mt: 2 }}>
          <NewPost isBlogPost={true} />
        </Box>
      )}
    </Container>
  );
};

export default UserProfilePage;
