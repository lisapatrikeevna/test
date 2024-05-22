import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from 'react';
import { Box, Button, Typography, Collapse } from '@mui/material';
import AppPageButtonsComponent from './AppPageButtonsComponent';
import axios from 'axios';

const AppPageCentralComponent = () => {
  const [showOptionsButton, setShowOptionsButton] = useState(false);

  useEffect(() => {
    axios
      .get('http://neoxonline.com:8030/video/all', { params: { offset: 0 } })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        padding: '20px',
      }}
    >
      <Box>
        <Typography>Central container</Typography>
      </Box>
      <Box
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
      </Box>
    </Box>
  );
};

export default AppPageCentralComponent;
