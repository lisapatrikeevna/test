import { Avatar, Badge, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import SliderModal from './SliderModal';
import { data } from './utils';

type Props = {
  none?: boolean;
  name?: string;
  lastname?: string;
};

const AvatarModal = ({ none, name, lastname }: Props) => {
  const [isOpenPhotoModal, setIsOpenPhotoModal] = useState(false);

  const handleClickOutside = () => {
    setIsOpenPhotoModal(false);
  };
  const handleClickInside = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <>
      <SliderModal
        isOpenPhotoModal={isOpenPhotoModal}
        handleClickOutside={handleClickOutside}
        handleClickInside={handleClickInside}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Badge
          color={none ? 'success' : 'default'}
          variant="dot"
          overlap="circular"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          sx={{
            '& .MuiBadge-badge': {
              width: 15,
              height: 15,
              borderRadius: '50%',
            },
          }}
        >
          <Avatar
            src={data[0].img}
            alt="avatar"
            sx={{
              width: 70,
              height: 70,
              cursor: 'pointer',
              position: 'relative',
            }}
            onClick={() => setIsOpenPhotoModal(true)}
          />
        </Badge>

        <Stack>
          <Typography variant="h5">{name}</Typography>
          <Typography variant="h5">{lastname}</Typography>
        </Stack>
      </Stack>
    </>
  );
};
export default AvatarModal;
