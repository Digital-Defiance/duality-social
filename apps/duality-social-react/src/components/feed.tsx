import React, { useEffect, useState } from 'react';
import authenticatedApi from '../services/authenticated-api';
import { Container, Typography, CircularProgress } from '@mui/material';
import Post from './post';
import { getToken, verifyToken } from '../utils/auth';
import { IFeedPost } from '@duality-social/duality-social-lib';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<IFeedPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = getToken();
      if (token && verifyToken(token)) {
        try {
          const response = await authenticatedApi.get('/feed', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setPosts(response.data.posts);
        } catch (err) {
          setError('Failed to fetch posts');
        } finally {
          setIsLoading(false);
        }
      } else {
        setError('Not authenticated');
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="md">
      {posts.map((post) => (
        <Post key={post.id?.toString()} post={post} />
      ))}
    </Container>
  );
};

export default Feed;