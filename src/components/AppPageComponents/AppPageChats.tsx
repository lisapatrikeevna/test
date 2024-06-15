import {
  Divider,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import 'react-chat-elements/dist/main.css';
import { MessageBox } from 'react-chat-elements';

type UserType = {
  id: number;
  img: string;
  name: string;
};

type AppPageChatsProps = {
  currentUser: UserType | null;
};

const AppPageChats = ({ currentUser }: AppPageChatsProps) => {
  if (!currentUser) {
    return <div>Select a user to start chatting</div>;
  }

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
      <Stack width="100%" padding={1} sx={{ flexGrow: 1 }}>
        <Stack sx={{ flexGrow: 1 }}>
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
            replyButton={false}
            removeButton={false}
            retracted={false}
            status="sent"
            notch={false}
          />
        </Stack>

        <Stack direction="row" alignItems="center">
          <TextField
            size="small"
            fullWidth
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
