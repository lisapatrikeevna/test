// AppPageSideBar.tsx
import { Box } from '@mui/material';
import { RenderValues } from '../../pages/AppPage';
import NeuButton from '../neumorphism/button/NeuButton';
import { useTheme } from '@mui/material/styles';

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
        Search Video
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
