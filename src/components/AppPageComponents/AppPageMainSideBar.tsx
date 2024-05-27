import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from '@mui/material';
import { Box } from '@mui/system';

import {
  AccountCircleOutlined,
  BlurOnOutlined,
  CallOutlined,
  CampaignOutlined,
  ForumOutlined,
  HomeOutlined,
  LogoutOutlined,
  NightsStayOutlined,
  PeopleOutline,
  PlayCircleOutline,
  SettingsOutlined,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import {
  chatsPath,
  contactsPath,
  homePath,
  mediaPath,
  newChannelPath,
  newGroupPath,
  settingsPath,
  vrPath,
} from '../../configs/RouteConfig';

type Props = {
  isOpenMainSideBar: boolean;
};

const AppPageMainSideBar = ({ isOpenMainSideBar }: Props) => {
  // const handleAvatarClick = () => {};

  return (
    <Box
      sx={{
        height: '100vh',
        width: isOpenMainSideBar ? '250px' : '0px',
        transition: 'width 0.5s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        background: '#e0e0e0',
        padding: isOpenMainSideBar ? '10px' : '0px',
        overflow: 'hidden',
      }}
    >
      {isOpenMainSideBar && (
        <>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={homePath} disableRipple>
              <ListItemIcon>
                <HomeOutlined />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={newGroupPath} disableRipple>
              <ListItemIcon>
                <PeopleOutline />
              </ListItemIcon>
              <ListItemText primary="New group" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={newChannelPath} disableRipple>
              <ListItemIcon>
                <CampaignOutlined />
              </ListItemIcon>
              <ListItemText primary="New channel" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={contactsPath} disableRipple>
              <ListItemIcon>
                <AccountCircleOutlined />
              </ListItemIcon>
              <ListItemText primary="Contacts" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={chatsPath} disableRipple>
              <ListItemIcon>
                <ForumOutlined />
              </ListItemIcon>
              <ListItemText primary="Chats" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={mediaPath} disableRipple>
              <ListItemIcon>
                <PlayCircleOutline />
              </ListItemIcon>
              <ListItemText primary="Videos" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton disableRipple>
              <ListItemIcon>
                <CallOutlined />
              </ListItemIcon>
              <ListItemText primary="Calls" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={vrPath} disableRipple>
              <ListItemIcon>
                <BlurOnOutlined />
              </ListItemIcon>
              <ListItemText primary="VR board" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={settingsPath} disableRipple>
              <ListItemIcon>
                <SettingsOutlined />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ paddingLeft: '17px' }}>
            <ListItemIcon>
              <NightsStayOutlined />
            </ListItemIcon>
            <ListItemText primary="Theme" />
            <Switch
              name="themeSwitch"
              inputProps={{ 'aria-label': 'theme switch' }}
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component={Link} to={'/'} disableRipple>
              <ListItemIcon>
                <LogoutOutlined />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>

          <Box
            sx={{
              position: 'absolute',
              bottom: '10px',
              left: 0,
              width: '100%',
              textAlign: 'left',
              paddingLeft: '20px',
              color: 'black',
            }}
          >
            <Box sx={{ marginBottom: '5px' }}>
              <a
                href="https://checkout.revolut.com/payment-link/b6119bca-620b-4007-b726-f9fb91c6acbb"
                rel="noopener noreferrer"
              >
                Support the project
              </a>
            </Box>
            <Box>NeoX version 1.0</Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AppPageMainSideBar;
