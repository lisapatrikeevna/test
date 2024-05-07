import React, { useContext, useState } from 'react';
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
} from '@mui/icons-material';
import avatar from '../assets/img.webp';
// import neumorph from '../styles/Neumorph.module.css';
import sidebar from '../styles/SideBar.module.css';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext.tsx';
import { AuthService } from '../services/auth.service.ts';
import { logout, selectUsername } from '../store/user/userSlice.ts';
import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
// import { ThemeProvider } from '@mui/material/styles';
// import { lightTheme, darkTheme } from '../theme.tsx';
import { useTheme } from '@mui/material/styles';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

// TODO Повесить UserModalProfile на аватар пользователя
// import UserModalProfile from './UserModalProfile.tsx'; 
import MyModalProfile from './MyModalProfile.tsx';
import {
  chatsPath,
  homePath,
  mediaPath,
  profilePath,
  settingsPath,
  callsPath,
  newGroupPath,
  newChannelPath,
  contactsPath,
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
  Switch
} from '@mui/material';

const SideBar: React.FC = () => {
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
    // Логика добавления нового аккаунта
  };

  const handleClick = (id: string) => {
    setActiveItem(id);
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      setIsLoggedIn(false); // Обновление состояния аутентификации
      dispatch(logout()); // Очистка данных пользователя
    } catch (error) {
      console.error('Ошибка при выходе', error);
    }
  };

  // const handleAvatarClick = () => {
  //   setOpenProfileModal(true); // Открываем модальное окно
  // };

  return (
    // <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
    <Box className={`${sidebar.sidebar} ${isActive ? sidebar.active : ''}`}
    sx={{
      backgroundColor: muiTheme.palette.background.default,
      color: muiTheme.palette.text.primary,
      boxShadow: '2px 0 10px rgba(0, 0, 0, 0.5)',
    }}>
      <List>
        <Box
          className={`${sidebar.menuToggle} ${
            isActive ? sidebar.active : ''
          }`}
          onClick={toggleActiveClass}
        >
          <img src={avatar} alt="Avatar" />
        </Box>
      </List>
      <Box
        className={`${sidebar.overlayBackdrop} ${
          isActive ? sidebar.overlayBackdropActive : ''
        }`}
        onClick={toggleActiveClass} // Закрываем overlaySidebar при клике на backdrop
      ></Box>
      <Box
        className={`${sidebar.overlaySidebar} ${
          isActive ? sidebar.overlaySidebarActive : ''
        }`}
        sx={{backgroundColor: muiTheme.palette.background.default,
          color: muiTheme.palette.text.primary,}}
      >
        <List>
          <ListItem
            className={sidebar.profileItem}
          >
            <Link to={profilePath} className={sidebar.imgLink}>
              <img src={avatar} alt="Avatar"/>
              {/* <img src={avatar} alt="Avatar" onClick={handleAvatarClick} /> */}
            </Link>
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
              {/* Здесь должен быть список аккаунтов */}
              {/* <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Account 1" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText primary="Account 2" />
                </ListItemButton> */}
              {/* Кнопка добавления аккаунта */}
              <ListItemButton sx={{ pl: 4 }} onClick={handleAddAccount}>
                <ListItemIcon>
                  <AddCircleOutline />
                </ListItemIcon>
                <ListItemText primary="Add account" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItem
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
            className={sidebar.themeSwitcherWrapper}
            onClick={toggleTheme}
            sx={{ cursor: 'pointer'}}
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
    // </ThemeProvider>
  );
};

export default SideBar;
