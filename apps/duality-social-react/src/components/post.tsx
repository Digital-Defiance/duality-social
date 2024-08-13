import React from 'react';
import { Paper, Box } from '@mui/material';
import { IFeedPost } from '@duality-social/duality-social-lib';
import ViewpointPair from './viewpoint-pair';

interface PostProps {
  post: IFeedPost;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Paper elevation={3} sx={{ my: 2, p: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {post.viewpoints.map((viewpoint) => (
          <ViewpointPair
            key={viewpoint.id.toString()}
            inputViewpoint={viewpoint}
            aiViewpoint={viewpoint}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default Post;