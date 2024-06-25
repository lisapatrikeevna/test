import { Box, Typography } from '@mui/material';
//ToDo actual HomePage with news or video from your channels
const AppPageCentralComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: '20px',
      }}
    >
      <Box>
        <Typography>Central container</Typography>
      </Box>
    </Box>
  );
};

export default AppPageCentralComponent;
