// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
// import AppPageButtonsComponent from './AppPageButtonsComponent';


const AppPageCentralComponent = () => {
  // const [showOptionsButton, setShowOptionsButton] = useState(false);

 

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
      {/* <Box
        sx={{
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <Button
          variant="outlined"
          endIcon={
            showOptionsButton ? (
              <KeyboardArrowDownIcon />
            ) : (
              <KeyboardArrowUpIcon />
            )
          }
          sx={{ width: '300px' }}
          onClick={() => setShowOptionsButton((prev) => !prev)}
        >
          Options
        </Button>
        <Collapse in={showOptionsButton}>
          <AppPageButtonsComponent />
        </Collapse>
      </Box> */}
    </Box>
  );
};

export default AppPageCentralComponent;
