import { Stack } from '@mui/material';
import React from 'react';

interface PictureProps {
  img: string;
}

const Picture: React.FC<PictureProps> = ({ img }) => {
  return (
    <Stack>
      <img src={img} alt="photo" />
    </Stack>
  );
};

export default Picture;
