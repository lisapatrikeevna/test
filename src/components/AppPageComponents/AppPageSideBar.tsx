import { Box, Button } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import {RenderValues} from "./chats/types.ts";

// Props type definition for AppPageSideBar component
type Props = {
  isOpenSideBar: boolean;
  changeRender: (value: RenderValues) => void;
  setIsOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  openRightPanel: () => void;
};

// Sidebar component for the application page
const AppPageSideBar = ({
  isOpenSideBar,
  changeRender,
  setIsOpenSideBar,
  openRightPanel,
}: Props) => {
  const handleButtonClick = (value: RenderValues) => {
    changeRender(value);
    openRightPanel();
    setIsOpenSideBar(false);
  };

  const theme = useTheme();

  return (
    <Box
      sx={{
        height: '100vh',
        width: '250px',
        transition: 'opacity 0.5s ease, visibility 0.5s ease',
        opacity: isOpenSideBar ? 1 : 0,
        visibility: isOpenSideBar ? 'visible' : 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '10px',
        borderRadius: '5px',
        position: 'relative',
        pointerEvents: isOpenSideBar ? 'auto' : 'none',
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Button to switch to Comments view */}
      <Button
        variant="contained"
        onClick={() => handleButtonClick('comments')}
      >
        Comments
      </Button>
      {/* Button to switch to Chats view */}
      <Button variant="contained" onClick={() => handleButtonClick('chats')}>
        Chats
      </Button>
      {/* Button to switch to Video search view */}
      <Button
        variant="contained"
        onClick={() => handleButtonClick('videos')}
      >
        Search Video
      </Button>
      {/* Button to switch to Calendar view */}
      <Button
        variant="contained"
        onClick={() => handleButtonClick('calendar')}
      >
        Calendar
      </Button>
      {/* Button to switch to Audio (Music) view */}
      <Button variant="contained" onClick={() => handleButtonClick('audio')}>
        Music
      </Button>
      {/* Button to switch to Radio view */}
      <Button variant="contained" onClick={() => handleButtonClick('radio')}>
        Radio
      </Button>
    </Box>
  );
};

export default AppPageSideBar;
