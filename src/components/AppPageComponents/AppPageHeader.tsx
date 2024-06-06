import {
  Badge,
  Box,
  InputAdornment,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import KeyboardAltOutlinedIcon from '@mui/icons-material/KeyboardAltOutlined';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';

type Props = {
  setIsOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenMainSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  toggleChatsPanel: () => void;
  setIsChatPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppPageHeader = ({
  setIsOpenSideBar,
  setIsOpenMainSideBar,
  toggleChatsPanel,
}: Props) => {
  const [isOpenModalNotifications, setIsOpenModalNotifications] =
    useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
        searchQuery
      )}`;
      window.open(googleSearchUrl, '_blank');
    }
    setSearchQuery('');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        zIndex: 1100,
        position: 'relative',
        padding: '10px 20px',
        background: '#e0e0e0',
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <MenuIcon
          cursor="pointer"
          onClick={() => setIsOpenMainSideBar((prev) => !prev)}
        />

        <EmailIcon cursor="pointer" onClick={toggleChatsPanel} />
      </Stack>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        size="small"
        sx={{ width: '500px', maxHeight: '40px' }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchOutlinedIcon cursor="pointer" onClick={handleSearch} />
            </InputAdornment>
          ),
        }}
      />
      <Stack direction="row" spacing={2}>
        <KeyboardVoiceOutlinedIcon sx={{ cursor: 'pointer' }} />
        <KeyboardAltOutlinedIcon sx={{ cursor: 'pointer' }} />
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
              borderRadius: '15px',
              width: '300px',
              background: '#e0e0e0',
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
