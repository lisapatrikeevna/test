import {
  Divider,
  Stack,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';

const AppPageChats = () => {
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
          <Stack sx={{ textAlign: 'right', marginBottom: '7px' }}>
            <Typography>Hi</Typography>
            <Typography>How are you?</Typography>
          </Stack>
          <Stack sx={{ marginBottom: '7px' }}>
            <Typography>Hi</Typography>
            <Typography>How are you?</Typography>
          </Stack>
          <Stack sx={{ textAlign: 'right', marginBottom: '7px' }}>
            <Typography>Hi</Typography>
            <Typography>How are you?</Typography>
          </Stack>
          <Stack sx={{ marginBottom: '7px' }}>
            <Typography>Hi</Typography>
            <Typography>How are you?</Typography>
          </Stack>
          <Stack sx={{ textAlign: 'right', marginBottom: '7px' }}>
            <Typography>How are you?</Typography>
          </Stack>
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
