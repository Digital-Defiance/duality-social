import { Box, IconButton } from '@mui/material';
import React from 'react';

interface ImagePreviewProps {
  image: File;
  onDelete: () => void;
  onEdit: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
  image,
  onDelete,
  onEdit,
}) => {
  return (
    <Box sx={{ mt: 2, position: 'relative', display: 'inline-block' }}>
      <img
        src={URL.createObjectURL(image)}
        alt="Preview"
        style={{ maxWidth: '100%', maxHeight: '200px' }}
      />
      <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
        <IconButton onClick={onEdit} size="small">
          <i className="fa-solid fa-pencil-alt" />
        </IconButton>
        <IconButton onClick={onDelete} size="small">
          <i className="fa-solid fa-trash" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ImagePreview;
