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
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Person2Icon from '@mui/icons-material/Person2';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

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

  // Modal position & open modal
  const handleModal = (event: React.MouseEvent<SVGSVGElement>) => {
    const target = event.currentTarget as unknown as HTMLElement;
    const iconPosition = target.getBoundingClientRect();
    const leftOffset = 120;
    const bottomOffset = 11;
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
              // ToDo If you don't want the background, uncomment the line below.
              // BackdropProps={{ style: { backgroundColor: 'transparent' } }}
            >
              <Box
                display="flex"
                flexDirection="column"
                gap={1}
                sx={{
                  position: 'absolute',
                  padding: '15px',
                  borderRadius: '3px',
                  background: '#e0e0e0',
                  top: modalPosition.top,
                  left: modalPosition.left,
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <VolumeOffIcon />
                  <Typography>Mute</Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <Person2Icon />
                  <Typography>Profile</Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <VideoCallIcon />
                  <Typography>Videocall</Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <SearchIcon />
                  <Typography>Search</Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    cursor: 'pointer',
                  }}
                >
                  <DeleteIcon />
                  <Typography>Delete chat</Typography>
                </Stack>
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
