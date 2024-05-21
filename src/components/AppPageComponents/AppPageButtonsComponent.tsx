import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { Box, Stack, Typography } from '@mui/material';

const AppPageButtonsComponent = () => {
  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <MicIcon
        cursor="pointer"
        sx={{
          border: '1px solid black',
          width: '40px',
          height: '40px',
          padding: '5px',
        }}
      />
      <HeadphonesIcon
        cursor="pointer"
        sx={{
          border: '1px solid black',
          width: '40px',
          height: '40px',
          padding: '5px',
        }}
      />

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
        <Typography fontWeight="bold">VR</Typography>
      </Stack>

      <BorderColorIcon
        cursor="pointer"
        sx={{
          border: '1px solid black',
          width: '40px',
          height: '40px',
          padding: '5px',
        }}
      />
      <CallIcon
        cursor="pointer"
        sx={{
          border: '1px solid black',
          width: '40px',
          height: '40px',
          padding: '5px',
        }}
      />
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
