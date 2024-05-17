import { Avatar, Badge, Stack, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { data } from '../ProfileComponents/utils';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const AppPageHeader = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding={2}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <MenuIcon cursor="pointer" />
        <Avatar
          src={data[0].img}
          alt="avatar"
          sx={{
            width: 50,
            height: 50,
            cursor: 'pointer',
            position: 'relative',
          }}
        />
        <EmailIcon cursor="pointer" />
      </Stack>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        sx={{ width: '500px' }}
      />
      <Stack direction="row" spacing={2}>
        <Badge badgeContent={10} color="primary" max={9}>
          <NotificationsIcon cursor="pointer" />
        </Badge>
        <MoreVertIcon cursor="pointer" />
      </Stack>
    </Stack>
  );
};
export default AppPageHeader;
