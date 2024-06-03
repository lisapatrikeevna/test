// AppPageSideBar.tsx
import { Box, Button } from '@mui/material';
import { RenderValues } from '../../pages/AppPage';

type Props = {
  isOpenSideBar: boolean;
  changeRender: (value: RenderValues) => void;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setIsOpenSideBar: Function;
  openRightPanel: () => void;
};

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

  return (
    <Box
      sx={{
        height: '80vh',
        width: '250px',
        transition: 'opacity 0.5s ease, visibility 0.5s ease',
        opacity: isOpenSideBar ? 1 : 0,
        visibility: isOpenSideBar ? 'visible' : 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        background: '#e0e0e0',
        padding: '10px',
        borderRadius: '5px',
        pointerEvents: isOpenSideBar ? 'auto' : 'none',
      }}
    >
      <Button variant="contained" onClick={() => handleButtonClick('comments')}>
        Comments
      </Button>
      <Button variant="contained" onClick={() => handleButtonClick('chats')}>
        Chats
      </Button>
      <Button variant="contained" onClick={() => handleButtonClick('videos')}>
        Video
      </Button>
      <Button variant="contained" onClick={() => handleButtonClick('calendar')}>
        Calendar
      </Button>
      <Button variant="contained" onClick={() => handleButtonClick('audio')}>
        Music
      </Button>
      <Button variant="contained" onClick={() => handleButtonClick('radio')}>
        Radio
      </Button>
    </Box>
  );
};

export default AppPageSideBar;
