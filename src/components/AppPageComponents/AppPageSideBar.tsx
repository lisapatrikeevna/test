// AppPageSideBar.tsx
import { Box, Button } from '@mui/material';
import { RenderValues } from '../../pages/AppPage';

type Props = {
  isOpenSideBar: boolean;
  changeRender: (value: RenderValues) => void;
  setIsOpenSideBar: Function;
};

const AppPageSideBar = ({
  isOpenSideBar,
  changeRender,
  setIsOpenSideBar,
}: Props) => {
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
        gap: '10px',
        background: '#e0e0e0',
        padding: '10px',
        borderRadius: '5px',
        pointerEvents: isOpenSideBar ? 'auto' : 'none',
      }}
    >
      <Button
        variant="contained"
        onClick={() => {
          changeRender('comments'), setIsOpenSideBar(false);
        }}
      >
        Comments
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          changeRender('chats'), setIsOpenSideBar(false);
        }}
      >
        Chats
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          changeRender('videos'), setIsOpenSideBar(false);
        }}
      >
        Video
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          changeRender('calendar'), setIsOpenSideBar(false);
        }}
      >
        Calendar
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          changeRender('audio'), setIsOpenSideBar(false);
        }}
      >
        Music
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          changeRender('radio'), setIsOpenSideBar(false);
        }}
      >
        Radio
      </Button>
    </Box>
  );
};

export default AppPageSideBar;
