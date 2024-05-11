import { Stack } from '@mui/material';
import { FC } from 'react';

interface PictureProps {
  img: string;
}

const Picture: FC<PictureProps> = ({ img }) => {
  return (
    <Stack>
      <img src={img} alt="photo" />
    </Stack>
  );
};

export default Picture;
