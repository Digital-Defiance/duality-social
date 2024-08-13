import React from 'react';
import { Paper, Box } from '@mui/material';
import { IFeedPostViewpoint } from '@duality-social/duality-social-lib';
import ViewpointPair from './viewpoint-pair';

interface ReplyProps {
  reply: IFeedPostViewpoint;
  isLeft: boolean;
}

const Reply: React.FC<ReplyProps> = ({ reply, isLeft }) => {
  return (
    <Paper elevation={3} sx={{ my: 2, p: 2 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: isLeft ? 'flex-start' : 'flex-end' }}>
        <ViewpointPair
          key={reply.id.toString()}
          inputViewpoint={reply}
          aiViewpoint={reply}
        />
      </Box>
    </Paper>
  );
};

export default Reply;