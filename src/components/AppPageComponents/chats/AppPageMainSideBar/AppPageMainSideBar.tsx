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
import {
  AccountCircleOutlined,
  AddCircleOutline,
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
  newChannelPath,
  newGroupPath,
  settingsPath,
} from '../../configs/RouteConfig';
import { useEffect, useState } from 'react';
import MyModalProfile from '../../pages/MyModalProfile';
import { useAppSelector } from '../../store/hooks';
import { selectUsername } from '../../store/user/userSlice';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { getUserAvatar } from "../getUserAvatar.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import {RenderValuesCentralComponent} from "./chats/types.ts";

// Props type definition for AppPageMainSideBar component
type Props = {
  isOpenMainSideBar: boolean;
  changeRenderCentralComponent: (value: RenderValuesCentralComponent) => void;
};

// Main side bar component for the application page
const AppPageMainSideBar = ({
  isOpenMainSideBar,
  changeRenderCentralComponent,
}: Props) => {
  const username = useAppSelector(selectUsername) || 'Guest';
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [isAccountsDropdownOpen, setIsAccountsDropdownOpen] = useState(false);
  const { theme, setTheme } = useCustomTheme();
  const themeMui = useTheme();
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const userId = useSelector((state: RootState) => state.user.user?.userId);

  // Handle avatar click to open profile modal
  const handleAvatarClick = () => {
    setOpenProfileModal(true); // Open profile modal
  };

  const ThemedListItemText = styled(ListItemText)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  }));

  // Toggle the accounts dropdown menu
  const toggleAccountsDropdown = () => {
    setIsAccountsDropdownOpen(!isAccountsDropdownOpen);
  };

  // Toggle the theme between light and dark
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Fetch the user's avatar
  useEffect(() => {
    const fetchAvatar = async () => {
      if (userId) {
        const userAvatar = await getUserAvatar(userId);
        if (typeof userAvatar === 'string') {
          setUserAvatar(userAvatar);
        }
      }
    };

    fetchAvatar();
  }, [userId]);

  return (
    <Box
      sx={{
        height: '100vh',
        width: isOpenMainSideBar ? '250px' : '0px',
        transition: 'width 0.5s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        background: '#e0e0e0',
        padding: isOpenMainSideBar ? '7px' : '0px',
        overflow: 'hidden',
        backgroundColor: themeMui.palette.background.default,
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
            {/* User avatar */}
            <Avatar
              src={userAvatar || ''}
              sx={{
                width: 50,
                height: 50,
                cursor: 'pointer',
                position: 'relative',
                backgroundColor: userAvatar ? (userAvatar.startsWith('#') ? userAvatar : undefined) : undefined
              }}
              onClick={handleAvatarClick}
            />
            <ListItemButton onClick={toggleAccountsDropdown} disableRipple>
              <ThemedListItemText primary={username} />
              {isAccountsDropdownOpen ? (
                <KeyboardArrowUpOutlined
                  sx={{
                    color:
                      themeMui.palette.mode === 'dark' ? '#bebebe' : '#333333',
                  }}
                />
              ) : (
                <KeyboardArrowDownOutlined
                  sx={{
                    color:
                      themeMui.palette.mode === 'dark' ? '#bebebe' : '#333333',
                  }}
                />
              )}
            </ListItemButton>
          </Box>
          {/* Accounts dropdown menu */}
          <Collapse in={isAccountsDropdownOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <AddCircleOutline
                    sx={{
                      color:
                        themeMui.palette.mode === 'dark'
                          ? '#bebebe'
                          : '#333333',
                    }}
                  />
                </ListItemIcon>
                <ThemedListItemText primary="Add account" />
              </ListItemButton>
            </List>
          </Collapse>
          <MyModalProfile
            open={openProfileModal}
            onClose={() => setOpenProfileModal(false)}
          />
          {/* Sidebar navigation items */}
          <ListItem
            disablePadding
            onClick={() => changeRenderCentralComponent('home')}
          >
            <ListItemButton disableRipple sx={{ padding: '5px 16px' }}>
              <ListItemIcon
                sx={{
                  minWidth: '45px',
                }}
              >
                <HomeOutlined
                  sx={{
                    color:
                      themeMui.palette.mode === 'dark' ? '#bebebe' : '#333333',
                  }}
                />
              </ListItemIcon>
              <ThemedListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={newGroupPath}
              disableRipple
              sx={{ padding: '5px 16px' }}
            >
              <ListItemIcon sx={{ minWidth: '45px' }}>
                <PeopleOutline
                  sx={{
                    color:
                      themeMui.palette.mode === 'dark' ? '#bebebe' : '#333333',
                  }}
                />
              </ListItemIcon>
              <ThemedListItemText primary="New group" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={newChannelPath}
              disableRipple
              sx={{ padding: '5px 16px' }}
            >
              <ListItemIcon sx={{ minWidth: '45px' }}>
                <CampaignOutlined
                  sx={{
                    color:
                      themeMui.palette.mode === 'dark' ? '#bebebe' : '#333333',
                  }}
                />
              </ListItemIcon>
              <ThemedListItemText primary="New channel" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={contactsPath}
              disableRipple
              sx={{ padding: '5px 16px' }}
            >
              <ListItemIcon sx={{ minWidth: '45px' }}>
                <AccountCircleOutlined
                  sx={{
                    color:
                      themeMui.palette.mode === 'dark' ? '#bebebe' : '#333333',
                  }}
                />
              </ListItemIcon>
              <ThemedListItemText primary="Contacts" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={chatsPath}
              disableRipple
              sx={{ padding: '5px 16px' }}
            >
              <ListItemIcon sx={{ minWidth: '45px' }}>
                <ForumOutlined
                  sx={{
                    color:
                      themeMui.palette.mode === 'dark' ? '#bebebe' : '#333333',
                  }}
                />
              </ListItemIcon>
              <ThemedListItemText primary="Chats" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => changeRenderCentralComponent('mevipa')}
          >
            <ListItemButton disableRipple sx={{ padding: '5px 16px' }}>
              <ListItemIcon sx={{ minWidth: '45px' }}>
                <PlayCircleOutline
                  sx={{
                    color:
                      themeMui.palette.mode === 'dark' ? '#bebebe' : '#333333',
                  }}
                />
              </ListItemIcon>
              <ThemedListItemText primary="Videos" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton disableRipple sx={{ padding: '5px 16px' }}>
              <ListItemIcon sx={{ minWidth: '45px' }}>
                <CallOutlined
                  sx={{
                    color:
                      themeMui.palette.mode === 'dark' ? '#bebebe' : '#333333',
                  }}
                />
              </ListItemIcon>
              <ThemedListItemText primary="Calls" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            onClick={() => changeRenderCentralComponent('VR')}
          >
            <ListItemButton disableRipple sx={{ padding: '5px 16px' }}>
              <ListItemIcon sx={{ minWidth: '45px' }}>
                <PlayCircleOutline
                  sx={{
                    color:
                      themeMui.palette.mode === 'dark' ? '#bebebe' : '#333333',
                  }}
                />
              </ListItemIcon>
              <ThemedListItemText primary="VR" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={settingsPath}
              disableRipple
              sx={{ padding: '5px 16px' }}
            >
              <ListItemIcon sx={{ minWidth: '45px' }}>
                <SettingsOutlined
                  sx={{
                    color:
                      themeMui.palette.mode === 'dark' ? '#bebebe' : '#333333',
                  }}
                />
              </ListItemIcon>
              <ThemedListItemText primary="Settings" />
            </ListItemButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{ paddingLeft: '17px' }}
            onClick={toggleTheme}
          >
            <ListItemIcon sx={{ minWidth: '45px' }}>
              <NightsStayOutlined
                sx={{
                  color:
                    themeMui.palette.mode === 'dark' ? '#bebebe' : '#333333',
                }}
              />
            </ListItemIcon>
            <ThemedListItemText primary="Theme" />
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
              sx={{ padding: '5px 16px' }}
            >
              <ListItemIcon sx={{ minWidth: '45px' }}>
                <LogoutOutlined
                  sx={{
                    color:
                      themeMui.palette.mode === 'dark' ? '#bebebe' : '#333333',
                  }}
                />
              </ListItemIcon>
              <ThemedListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
          {/* Project support and version information */}
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
                href="https://checkout.revolut.com/payment-link/27a3d78a-db95-4d93-b2be-06b72488adb8"
                rel="noopener noreferrer"
              >
                Support the project
              </a>
            </Box>
            <Box
              sx={{
                color: themeMui.palette.mode === 'dark' ? '#bebebe' : '#333333',
              }}
            >
              NeoX version 1.0
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AppPageMainSideBar;
