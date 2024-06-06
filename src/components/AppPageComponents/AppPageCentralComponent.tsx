import { Box, Typography } from '@mui/material';

const AppPageCentralComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '90vh',
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
