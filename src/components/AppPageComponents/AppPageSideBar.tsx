// AppPageSideBar.tsx
import { Box, Button, Collapse } from '@mui/material';
import { RenderValues } from '../../pages/AppPage';

type Props = {
  isOpenSideBar: boolean;
  changeRender: (value: RenderValues) => void;
};

const AppPageSideBar = ({ isOpenSideBar, changeRender }: Props) => {
  return (
    <Collapse in={isOpenSideBar} timeout={300}>
      <Box
        height="100vh"
        width="250px"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          background: '#e0e0e0',
          padding: '10px',
          borderRadius: '5px',
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
    </Collapse>
  );
};
export default AppPageSideBar;
