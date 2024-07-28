import { Box, Typography } from '@mui/material';
import Keep from "./keep/Keep.tsx";

// Component to render the central content of the application
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
      {/*<Box>*/}
      {/*  <Typography>Central container</Typography>*/}
      {/*</Box>*/}
      <Keep/>
    </Box>
  );
};

export default AppPageCentralComponent;
