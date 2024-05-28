import {
  Avatar,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Switch,
} from '@mui/material';
import { Box } from '@mui/system';
import avatar from '../../assets/img.webp';
import {
  AccountCircleOutlined,
  AddCircleOutline,
  BlurOnOutlined,
  CallOutlined,
  CampaignOutlined,
  ForumOutlined,
  HomeOutlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
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
import { useState } from 'react';
import MyModalProfile from '../../pages/MyModalProfile';
import { useAppSelector } from '../../store/hooks';
import { selectUsername } from '../../store/user/userSlice';
// import UserModalProfile from '../../pages/UserModalProfile';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';

type Props = {
  isOpenMainSideBar: boolean;
};

const AppPageMainSideBar = ({ isOpenMainSideBar }: Props) => {
  const username = useAppSelector(selectUsername) || 'Guest';
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [isAccountsDropdownOpen, setIsAccountsDropdownOpen] = useState(false);
  const { theme, setTheme } = useCustomTheme();

  const handleAvatarClick = () => {
    setOpenProfileModal(true); // Open profile modal
  };

  const toggleAccountsDropdown = () => {
    setIsAccountsDropdownOpen(!isAccountsDropdownOpen);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // TODO Повесить UserModalProfile на аватар пользователя
  return (
    <Box
      sx={{
        height: '89vh',
        width: isOpenMainSideBar ? '250px' : '0px',
        transition: 'width 0.5s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        background: '#e0e0e0',
        padding: isOpenMainSideBar ? '10px' : '0px',
        overflow: 'hidden',
      }}
    >
      {isOpenMainSideBar && (
        <Box>
          <Box
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              padding: '10px 0px',
              display: 'flex',
            }}
          >
            <Avatar
              src={avatar}
              alt="avatar"
              sx={{
                width: 50,
                height: 50,
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={handleAvatarClick}
            />
            <ListItemButton onClick={toggleAccountsDropdown} disableRipple>
              <ListItemText primary={username} />
              {isAccountsDropdownOpen ? (
                <KeyboardArrowUpOutlined />
              ) : (
                <KeyboardArrowDownOutlined />
              )}
            </ListItemButton>
          </Box>
          <Collapse in={isAccountsDropdownOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AddCircleOutline
                    sx={{ color: theme === 'dark' ? 'black' : 'inherit' }}
                  />
                </ListItemIcon>
                <ListItemText primary="Add account" />
              </ListItemButton>
            </List>
          </Collapse>
          <MyModalProfile
            open={openProfileModal}
            onClose={() => setOpenProfileModal(false)}
          />
          {/* <UserModalProfile
                open={openProfileModal}
                onClose={() => setOpenProfileModal(false)}
              /> */}
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={homePath}
              disableRipple
              sx={{ padding: '0px 16px' }}
            >
              <ListItemIcon>
                <HomeOutlined
                  sx={{ color: theme === 'dark' ? 'black' : 'inherit' }}
                />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={newGroupPath}
              disableRipple
              sx={{ padding: '0px 16px' }}
            >
              <ListItemIcon>
                <PeopleOutline
                  sx={{ color: theme === 'dark' ? 'black' : 'inherit' }}
                />
              </ListItemIcon>
              <ListItemText primary="New group" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={newChannelPath}
              disableRipple
              sx={{ padding: '0px 16px' }}
            >
              <ListItemIcon>
                <CampaignOutlined
                  sx={{ color: theme === 'dark' ? 'black' : 'inherit' }}
                />
              </ListItemIcon>
              <ListItemText primary="New channel" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={contactsPath}
              disableRipple
              sx={{ padding: '0px 16px' }}
            >
              <ListItemIcon>
                <AccountCircleOutlined
                  sx={{ color: theme === 'dark' ? 'black' : 'inherit' }}
                />
              </ListItemIcon>
              <ListItemText primary="Contacts" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={chatsPath}
              disableRipple
              sx={{ padding: '0px 16px' }}
            >
              <ListItemIcon>
                <ForumOutlined
                  sx={{ color: theme === 'dark' ? 'black' : 'inherit' }}
                />
              </ListItemIcon>
              <ListItemText primary="Chats" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={mediaPath}
              disableRipple
              sx={{ padding: '0px 16px' }}
            >
              <ListItemIcon>
                <PlayCircleOutline
                  sx={{ color: theme === 'dark' ? 'black' : 'inherit' }}
                />
              </ListItemIcon>
              <ListItemText primary="Videos" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton disableRipple sx={{ padding: '0px 16px' }}>
              <ListItemIcon>
                <CallOutlined
                  sx={{ color: theme === 'dark' ? 'black' : 'inherit' }}
                />
              </ListItemIcon>
              <ListItemText primary="Calls" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ padding: '0px' }}>
            <ListItemButton component={Link} to={vrPath} disableRipple>
              <ListItemIcon>
                <BlurOnOutlined
                  sx={{ color: theme === 'dark' ? 'black' : 'inherit' }}
                />
              </ListItemIcon>
              <ListItemText primary="VR board" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={settingsPath}
              disableRipple
              sx={{ padding: '0px 16px' }}
            >
              <ListItemIcon>
                <SettingsOutlined
                  sx={{ color: theme === 'dark' ? 'black' : 'inherit' }}
                />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ paddingLeft: '17px' }}
            onClick={toggleTheme}
          >
            <ListItemIcon>
              <NightsStayOutlined
                sx={{ color: theme === 'dark' ? 'black' : 'inherit' }}
              />
            </ListItemIcon>
            <ListItemText primary="Theme" />
            <Switch
              checked={theme === 'dark'}
              name="themeSwitch"
              inputProps={{ 'aria-label': 'theme switch' }}
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={'/'}
              disableRipple
              sx={{ padding: '0px 16px' }}
            >
              <ListItemIcon>
                <LogoutOutlined
                  sx={{ color: theme === 'dark' ? 'black' : 'inherit' }}
                />
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
        </Box>
      )}
    </Box>
  );
};

export default AppPageMainSideBar;
