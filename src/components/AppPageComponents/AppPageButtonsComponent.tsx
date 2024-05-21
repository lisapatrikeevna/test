import MicIcon from '@mui/icons-material/Mic';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import { Box } from '@mui/material';

const AppPageButtonsComponent = () => {
  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <MicIcon
        cursor="pointer"
        sx={{ border: '1px solid black', width: '40px', height: '40px' }}
      />
      <HeadphonesIcon
        cursor="pointer"
        sx={{ border: '1px solid black', width: '40px', height: '40px' }}
      />

      <BorderColorIcon
        cursor="pointer"
        sx={{ border: '1px solid black', width: '40px', height: '40px' }}
      />
      <CallIcon
        cursor="pointer"
        sx={{ border: '1px solid black', width: '40px', height: '40px' }}
      />
      <CallEndIcon
        cursor="pointer"
        sx={{ border: '1px solid black', width: '40px', height: '40px' }}
      />
    </Box>
  );
};
export default AppPageButtonsComponent;
