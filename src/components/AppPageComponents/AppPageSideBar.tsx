import { Box, Button } from '@mui/material';

type Props = {
  isOpenSideBar: boolean;
  changeRender: Function;
};

const AppPageSideBar = ({ isOpenSideBar, changeRender }: Props) => {
  return (
    <Box
      height="100vh"
      width="250px"
      sx={{
        display: isOpenSideBar ? 'flex' : 'none',
        flexDirection: 'column',
        gap: '10px',
        background: 'cyan',
        padding: '10px',
      }}
    >
      <Button
        variant="contained"
        onClick={() => {
          changeRender('comments');
        }}
      >
        Comments
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          changeRender('chats');
        }}
      >
        Chats
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          changeRender('videos');
        }}
      >
        Video
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          changeRender('calendar');
        }}
      >
        Calendar
      </Button>
    </Box>
  );
};
export default AppPageSideBar;
