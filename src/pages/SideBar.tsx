import { FC, useContext, useState } from 'react';
import {
  HomeOutlined,
  PeopleOutline,
  CampaignOutlined,
  AccountCircleOutlined,
  ForumOutlined,
  PlayCircleOutline,
  CallOutlined,
  SettingsOutlined,
  NightsStayOutlined,
  LogoutOutlined,
  AddCircleOutline,
  KeyboardArrowUpOutlined,
  KeyboardArrowDownOutlined,
  BlurOnOutlined,
} from '@mui/icons-material';
import avatar from '../assets/img.webp';
import sidebar from '../styles/SideBar.module.css';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.tsx';
import { AuthService } from '../services/auth.service.ts';
import { logout, selectUsername } from '../store/user/userSlice.ts';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { useTheme } from '@mui/material/styles';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

// TODO Повесить UserModalProfile на аватар пользователя
// import UserModalProfile from './UserModalProfile.tsx';
import MyModalProfile from './MyModalProfile.tsx';
import {
  chatsPath,
  homePath,
  mediaPath,
  settingsPath,
  callsPath,
  newGroupPath,
  newChannelPath,
  contactsPath,
  vrPath,
} from '../configs/RouteConfig.tsx';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Switch,
} from '@mui/material';

const SideBar: FC = () => {
  const muiTheme = useTheme();
  const { theme, setTheme } = useCustomTheme();
  const [isActive, setIsActive] = useState(false);
  const [activeItem, setActiveItem] = useState('home');
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const { setIsLoggedIn } = useContext(AuthContext);
  const username = useAppSelector(selectUsername) || 'Guest';
  const dispatch = useAppDispatch();

  const [isAccountsDropdownOpen, setIsAccountsDropdownOpen] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleActiveClass = () => {
    setIsActive((prevState) => {
      return !prevState;
    });
  };

  const toggleAccountsDropdown = () => {
    setIsAccountsDropdownOpen(!isAccountsDropdownOpen);
  };

  const handleAddAccount = () => {
    // Logic for adding a new account
  };

  const handleClick = (id: string) => {
    setActiveItem(id);
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      setIsLoggedIn(false); // Updating the authentication status
      dispatch(logout()); // Clear user data
    } catch (error) {
      console.error('Ошибка при выходе', error);
    }
  };

  const handleAvatarClick = () => {
    setOpenProfileModal(true); // Open profile modal
  };

  return (
    <Box
      className={`${sidebar.sidebar} ${isActive ? sidebar.active : ''}`}
      sx={{
        backgroundColor: muiTheme.palette.background.default,
        color: muiTheme.palette.text.primary,
        boxShadow: '2px 0 10px rgba(0, 0, 0, 0.5)',
      }}
    >
      <List>
        <Box
          className={`${sidebar.menuToggle} ${isActive ? sidebar.active : ''}`}
          onClick={toggleActiveClass}
        >
          <img src={avatar} alt="Avatar" />
        </Box>
      </List>
      <Box
        className={`${sidebar.overlayBackdrop} ${
          isActive ? sidebar.overlayBackdropActive : ''
        }`}
        onClick={toggleActiveClass} // Close sidebar on backdrop click
      ></Box>
      <Box
        className={`${sidebar.overlaySidebar} ${
          isActive ? sidebar.overlaySidebarActive : ''
        }`}
        sx={{
          backgroundColor: muiTheme.palette.background.default,
          color: muiTheme.palette.text.primary,
        }}
      >
        <List disablePadding>
          <ListItem className={sidebar.profileItem} disablePadding>
            <Box className={sidebar.imgLink}>
              <img src={avatar} alt="Avatar" onClick={handleAvatarClick} />
              {/* <img src={avatar} alt="Avatar" onClick={handleAvatarClick} /> */}
            </Box>
            {/* <UserModalProfile
                open={openProfileModal}
                onClose={() => setOpenProfileModal(false)}
              /> */}
            <MyModalProfile
              open={openProfileModal}
              onClose={() => setOpenProfileModal(false)}
            />

            <ListItemButton onClick={toggleAccountsDropdown} disableRipple>
              <ListItemText primary={username} />
              {isAccountsDropdownOpen ? (
                <KeyboardArrowUpOutlined />
              ) : (
                <KeyboardArrowDownOutlined />
              )}
            </ListItemButton>
          </ListItem>
          <Collapse in={isAccountsDropdownOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* Here should be the list of accounts */}
              {/* <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Account 1" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Account 2" />
                </ListItemButton> */}
              {/* Button for adding an account */}
              <ListItemButton sx={{ pl: 4 }} onClick={handleAddAccount}>
                <ListItemIcon>
                  <AddCircleOutline />
                </ListItemIcon>
                <ListItemText primary="Add account" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItem
            disablePadding
            className={activeItem === 'home' ? sidebar.active : ''}
            onClick={() => {
              handleClick('home');
              setIsActive(false);
            }}
          >
            <ListItemButton component={Link} to={homePath} disableRipple>
              <ListItemIcon>
                <HomeOutlined />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            className={activeItem === 'newGroup' ? sidebar.active : ''}
            onClick={() => {
              handleClick('newGroup');
              setIsActive(false);
            }}
          >
            <ListItemButton component={Link} to={newGroupPath} disableRipple>
              <ListItemIcon>
                <PeopleOutline />
              </ListItemIcon>
              <ListItemText primary="New group" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            className={activeItem === 'newChannel' ? sidebar.active : ''}
            onClick={() => {
              handleClick('newChannel');
              setIsActive(false);
            }}
          >
            <ListItemButton component={Link} to={newChannelPath} disableRipple>
              <ListItemIcon>
                <CampaignOutlined />
              </ListItemIcon>
              <ListItemText primary="New channel" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            className={activeItem === 'contacts' ? sidebar.active : ''}
            onClick={() => {
              handleClick('contacts');
              setIsActive(false);
            }}
          >
            <ListItemButton component={Link} to={contactsPath} disableRipple>
              <ListItemIcon>
                <AccountCircleOutlined />
              </ListItemIcon>
              <ListItemText primary="Contacts" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            className={activeItem === 'chats' ? sidebar.active : ''}
            onClick={() => {
              handleClick('chats');
              setIsActive(false);
            }}
          >
            <ListItemButton component={Link} to={chatsPath} disableRipple>
              <ListItemIcon>
                <ForumOutlined />
              </ListItemIcon>
              <ListItemText primary="Chats" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            className={activeItem === 'videos' ? sidebar.active : ''}
            onClick={() => {
              handleClick('videos');
              setIsActive(false);
            }}
          >
            <ListItemButton component={Link} to={mediaPath} disableRipple>
              <ListItemIcon>
                <PlayCircleOutline />
              </ListItemIcon>
              <ListItemText primary="Videos" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            className={activeItem === 'calls' ? sidebar.active : ''}
            onClick={() => {
              handleClick('calls');
              setIsActive(false);
            }}
          >
            <ListItemButton component={Link} to={callsPath} disableRipple>
              <ListItemIcon>
                <CallOutlined />
              </ListItemIcon>
              <ListItemText primary="Calls" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            className={activeItem === 'vrBoard' ? sidebar.active : ''}
            onClick={() => {
              handleClick('vrBoard');
              setIsActive(false);
            }}
          >
            <ListItemButton component={Link} to={vrPath} disableRipple>
              <ListItemIcon>
                <BlurOnOutlined />
              </ListItemIcon>
              <ListItemText primary="VR board" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            className={activeItem === 'settings' ? sidebar.active : ''}
            onClick={() => {
              handleClick('settings');
              setIsActive(false);
            }}
          >
            <ListItemButton component={Link} to={settingsPath} disableRipple>
              <ListItemIcon>
                <SettingsOutlined />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            className={sidebar.themeSwitcherWrapper}
            onClick={toggleTheme}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemIcon>
              <NightsStayOutlined />
            </ListItemIcon>
            <ListItemText primary="Theme" />
            <Switch
              checked={theme === 'dark'}
              name="themeSwitch"
              inputProps={{ 'aria-label': 'theme switch' }}
            />
          </ListItem>
          <ListItem
            disablePadding
            className={sidebar.logoutItem}
            onClick={handleLogout}
          >
            <ListItemButton component={Link} to={'/'} disableRipple>
              <ListItemIcon>
                <LogoutOutlined />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <Box className={sidebar.bottom}>
          <Box className={sidebar.donate}>
            <a
              href="https://checkout.revolut.com/payment-link/b6119bca-620b-4007-b726-f9fb91c6acbb"
              rel="noopener noreferrer"
            >
              Support the project
            </a>
          </Box>
          <Box className={sidebar.version}>NeoX version 1.0</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
