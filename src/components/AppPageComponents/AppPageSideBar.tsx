// AppPageSideBar.tsx
import { Box } from '@mui/material';
import { RenderValues } from '../../pages/AppPage';
import NeuButton from '../neumorphism/button/NeuButton';

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
        gap: '20px',
        background: '#e0e0e0',
        padding: '10px',
        borderRadius: '5px',
        pointerEvents: isOpenSideBar ? 'auto' : 'none',
      }}
    >
      <NeuButton
        variant="contained"
        onClick={() => handleButtonClick('comments')}
      >
        Comments
      </NeuButton>
      <NeuButton variant="contained" onClick={() => handleButtonClick('chats')}>
        Chats
      </NeuButton>
      <NeuButton
        variant="contained"
        onClick={() => handleButtonClick('videos')}
      >
        Video
      </NeuButton>
      <NeuButton
        variant="contained"
        onClick={() => handleButtonClick('calendar')}
      >
        Calendar
      </NeuButton>
      <NeuButton variant="contained" onClick={() => handleButtonClick('audio')}>
        Music
      </NeuButton>
      <NeuButton variant="contained" onClick={() => handleButtonClick('radio')}>
        Radio
      </NeuButton>
    </Box>
  );
};

export default AppPageSideBar;
