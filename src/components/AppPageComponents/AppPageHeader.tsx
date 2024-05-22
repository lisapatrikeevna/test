import {
  Avatar,
  Badge,
  Box,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { data } from '../ProfileComponents/utils';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

type Props = {
  setIsOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppPageHeader = ({ setIsOpenSideBar }: Props) => {
  const [isOpenModalNotifications, setIsOpenModalNotifications] =
    useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleModal = (event: React.MouseEvent<SVGSVGElement>) => {
    const target = event.currentTarget as unknown as HTMLElement;
    const iconPosition = target.getBoundingClientRect();
    const leftOffset = 250;
    const bottomOffset = 20;
    setModalPosition({
      top: iconPosition.bottom + window.scrollY + bottomOffset,
      left: iconPosition.left + window.scrollX - leftOffset,
    });
    setIsOpenModalNotifications(true);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding={2}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <MenuIcon cursor="pointer" />
        <Avatar
          src={data[0].img}
          alt="avatar"
          sx={{
            width: 50,
            height: 50,
            cursor: 'pointer',
            position: 'relative',
          }}
        />
        <EmailIcon cursor="pointer" />
      </Stack>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        sx={{ width: '500px' }}
      />
      <Stack direction="row" spacing={2}>
        <Badge badgeContent={10} color="primary" max={9}>
          <NotificationsIcon
            cursor="pointer"
            onClick={handleModal}
            sx={{ position: 'relative' }}
          />
        </Badge>
        <Modal
          open={isOpenModalNotifications}
          onClose={() => setIsOpenModalNotifications(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          BackdropProps={{ style: { backgroundColor: 'transparent' } }}
        >
          <Box
            sx={{
              padding: '15px',
              borderRadius: 3,
              width: '300px',
              background: 'white',
              position: 'absolute',
              top: modalPosition.top,
              left: modalPosition.left,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Modal>
        <MoreVertIcon
          cursor="pointer"
          onClick={() => setIsOpenSideBar((prev) => !prev)}
        />
      </Stack>
    </Stack>
  );
};
export default AppPageHeader;
