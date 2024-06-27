import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { Box, Stack, Typography } from '@mui/material';

// Component to render a set of action buttons (options panel)
const AppPageButtonsComponent = () => {
  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      {/* Microphone button */}
      <MicIcon
        cursor="pointer"
        sx={{
          border: '1px solid black',
          width: '40px',
          height: '40px',
          padding: '5px',
        }}
      />
      {/* Headphones button */}
      <HeadphonesIcon
        cursor="pointer"
        sx={{
          border: '1px solid black',
          width: '40px',
          height: '40px',
          padding: '5px',
        }}
      />
      {/* VR button */}
      <Stack
        sx={{
          border: '1px solid black',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography fontWeight="bold" sx={{ userSelect: 'none' }}>VR</Typography>
      </Stack>
      {/* Border color button */}
      <BorderColorIcon
        cursor="pointer"
        sx={{
          border: '1px solid black',
          width: '40px',
          height: '40px',
          padding: '5px',
        }}
      />
      {/* Call button */}
      <CallIcon
        cursor="pointer"
        sx={{
          border: '1px solid black',
          width: '40px',
          height: '40px',
          padding: '5px',
        }}
      />
      {/* End call button */}
      <CallEndIcon
        cursor="pointer"
        sx={{
          border: '1px solid black',
          width: '40px',
          height: '40px',
          padding: '5px',
        }}
      />
    </Box>
  );
};

export default AppPageButtonsComponent;
