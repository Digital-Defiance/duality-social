import React from 'react';
import { Box } from '@mui/material';
import { IFeedPostViewpoint } from '@duality-social/duality-social-lib';
import Viewpoint from './viewpoint';

interface ViewpointPairProps {
  inputViewpoint: IFeedPostViewpoint;
  aiViewpoint: IFeedPostViewpoint;
}

const ViewpointPair: React.FC<ViewpointPairProps> = ({ inputViewpoint, aiViewpoint }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Viewpoint viewpoint={inputViewpoint} isLeft={true} />
      <Box
        sx={{
          width: '2px',
          backgroundColor: 'grey.300',
          mx: 1,
        }}
      />
      <Viewpoint viewpoint={aiViewpoint} isLeft={false} />
    </Box>
  );
};

export default ViewpointPair;