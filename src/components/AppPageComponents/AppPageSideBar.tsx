import { Box, Button } from '@mui/material';

type Props = {
  isOpenSideBar: boolean;
};

const AppPageSideBar = ({ isOpenSideBar }: Props) => {
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
      <Button variant="contained">Comments</Button>
      <Button variant="contained">Chats</Button>
      <Button variant="contained">Video</Button>
      <Button variant="contained">Calendar</Button>
    </Box>
  );
};
export default AppPageSideBar;
