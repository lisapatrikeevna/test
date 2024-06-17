import {
  Divider,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  Modal,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import 'react-chat-elements/dist/main.css';
import { MessageBox } from 'react-chat-elements';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UserModalProfile from '../../pages/UserModalProfile';
import { useState } from 'react';

type UserType = {
  id: number;
  img: string;
  name: string;
};

type AppPageChatsProps = {
  currentUser: UserType | null;
};

const AppPageChats = ({ currentUser }: AppPageChatsProps) => {
  const [openUserProfileModal, setOpenUserProfileModal] = useState(false);
  const [isOpenChatsModal, setIsOpenChatsModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  if (!currentUser) {
    return <Stack>Select a user to start chatting</Stack>;
  }

  const handleModal = (event: React.MouseEvent<SVGSVGElement>) => {
    const target = event.currentTarget as unknown as HTMLElement;
    const iconPosition = target.getBoundingClientRect();
    const leftOffset = 250;
    const bottomOffset = 20;
    setModalPosition({
      top: iconPosition.bottom + window.scrollY + bottomOffset,
      left: iconPosition.left + window.scrollX - leftOffset,
    });
    setIsOpenChatsModal(true);
  };

  const handleUserProfileClick = () => {
    setOpenUserProfileModal(true); // Open userProfile modal
  };

  return (
    <Stack
      direction="row"
      sx={{
        width: '100%',
        borderRadius: '5px',
        height: '100%',
      }}
    >
      <Divider sx={{ color: 'black' }} />
      <Stack
        width="100%"
        padding={1}
        sx={{ flexGrow: 1, position: 'relative' }}
      >
        <Stack sx={{ flexGrow: 1 }}>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              bgcolor: 'aqua',
              position: 'absolute',
              width: '100%',
              zIndex: '100',
              padding: '10px',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <ArrowBackIcon cursor="pointer" />
              <Typography
                sx={{ cursor: 'pointer' }}
                onClick={handleUserProfileClick}
              >
                {currentUser.name}
              </Typography>
            </Stack>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <SearchOutlinedIcon cursor="pointer" />
              <PhoneIcon cursor="pointer" />
              <MoreVertIcon cursor="pointer" onClick={handleModal} />
            </Stack>
            <UserModalProfile
              open={openUserProfileModal}
              onClose={() => setOpenUserProfileModal(false)}
              currentName={currentUser.name}
            />
            <Modal
              open={isOpenChatsModal}
              onClose={() => setIsOpenChatsModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              // BackdropProps={{ style: { backgroundColor: 'transparent' } }}
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
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>
              </Box>
            </Modal>
          </Stack>
          <Stack sx={{ marginTop: '40px' }}>
            <MessageBox
              id={currentUser.id}
              position="left"
              type="text"
              title={currentUser.name}
              text={`This is a chat with ${currentUser.name}`}
              date={new Date()}
              focus={false}
              titleColor="#000"
              forwarded={false}
              replyButton={true}
              removeButton={false}
              retracted={false}
              status="sent"
              notch={false}
            />
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center">
          <TextField
            size="small"
            fullWidth
            autoComplete="off"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <AttachFileIcon sx={{ transform: 'rotate(45deg)' }} />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SentimentSatisfiedAltIcon />
                  </IconButton>
                  <IconButton edge="end">
                    <KeyboardVoiceOutlinedIcon />
                  </IconButton>
                  <IconButton edge="end">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AppPageChats;
