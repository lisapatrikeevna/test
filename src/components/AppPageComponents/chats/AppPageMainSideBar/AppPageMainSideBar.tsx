import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Box } from '@mui/system';
import {
  ChatBubbleOutline, Close, GroupOutlined,
  HomeOutlined,
  // LogoutOutlined,
  PermIdentity,
  PlayCircleOutline, RemoveRedEyeOutlined,
  SettingsOutlined, VideocamOutlined, WifiTethering,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import {
  chatsPath,
  contactsPath,
  newChannelPath,
  newGroupPath,
  settingsPath,
} from '../../../../configs/RouteConfig.tsx';
import { useEffect, useState } from 'react';
import MyModalProfile from '../../../../pages/MyModalProfile.tsx';
import { useAppSelector } from '../../../../store/hooks.ts';
import { selectUsername } from '../../../../store/user/userSlice.ts';
import { useTheme as useCustomTheme } from '../../../../contexts/ThemeContext.tsx';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { getUserAvatar } from "../../../getUserAvatar.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store.ts";
import {RenderValuesCentralComponent} from "../types.ts";
import { getThemeBackground } from './styles';

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
  const username = useAppSelector(selectUsername) || 'Name Surname';
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [isAccountsDropdownOpen, setIsAccountsDropdownOpen] = useState(false);
  const themeMui = useTheme();
  const customTheme = useCustomTheme(); // Assuming this returns { theme: 'light' | 'dark' }
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const userId = useSelector((state: RootState) => state.user.user?.userId);

  // Handle avatar click to open profile modal
  const handleAvatarClick = () => {
    setOpenProfileModal(true); // Open profile modal
  };

  const ThemedListItemText = styled(ListItemText)(({ theme }) => ({
    color: theme.palette.mode === 'dark' ? '#fff' : '#000',
    '& .MuiListItemText-primary': {
      fontSize: '14px',
    },
  }));

  // Toggle the accounts dropdown menu
  const toggleAccountsDropdown = () => {
    setIsAccountsDropdownOpen(!isAccountsDropdownOpen);
  };

  // Toggle the theme between light and dark

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
            width: isOpenMainSideBar ? '304px' : '0px',
            transition: 'width 0.5s ease',
            display: 'flex',
            overflow: 'hidden',
            borderTopRightRadius: '16px',
            borderBottomRightRadius: '16px',
            background: getThemeBackground(customTheme.theme), // Apply the gradient background here
          }}
      >
        {isOpenMainSideBar && (
            <Box sx={{display:'flex', flexDirection:'column', alignItems: 'flex-start'}}>
              <Box
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    marginTop: themeMui.spacing(2),
                    marginLeft: themeMui.spacing(4),
                    display: 'flex',
                  }}
              >
                {/* User avatar */}
                <Avatar
                    src={userAvatar || ''}
                    sx={{
                      width: 40,
                      height: 40,
                      cursor: 'pointer',
                      position: 'relative',
                      backgroundColor: userAvatar ? (userAvatar.startsWith('#') ? userAvatar : undefined) : undefined
                    }}
                    onClick={handleAvatarClick}
                />
                <ListItemButton onClick={toggleAccountsDropdown} >
                  <ThemedListItemText primary={username} />

                </ListItemButton>
                <Box sx={{display: 'flex', alignItems: 'top', marginLeft: themeMui.spacing(6)}}>
                <Close
                    sx={{
                      color:
                          '#FFFFFF', fontSize: 24
                    }}
                />
                </Box>
              </Box>
              <MyModalProfile
                  open={openProfileModal}
                  onClose={() => setOpenProfileModal(false)}
              />
              {/* Sidebar navigation items */}
              <Box sx={{marginTop: themeMui.spacing(2)}}>
                <ListItem
                    onClick={() => changeRenderCentralComponent('home')}
                >
                  <ListItemButton >
                    <ListItemIcon >
                      <HomeOutlined fontSize="large"
                                    sx={{
                                      color:
                                          '#FFFFFF', fontSize: 24
                                    }}
                      />
                    </ListItemIcon>
                    <ThemedListItemText primary="Home" />
                  </ListItemButton>
                </ListItem>
                <ListItem >
                  <ListItemButton
                      component={Link}
                      to={contactsPath}
                      

                  >
                    <ListItemIcon>
                      <PermIdentity fontSize="large"
                                    sx={{
                                      color:
                                          '#FFFFFF', fontSize: 24
                                    }}
                      />
                    </ListItemIcon>
                    <ThemedListItemText primary="Profile" />
                  </ListItemButton>
                </ListItem>
                <ListItem >
                  <ListItemButton
                      component={Link}
                      to={chatsPath}
                      

                  >
                    <ListItemIcon>
                      <ChatBubbleOutline fontSize="large"
                                         sx={{
                                           color:
                                               '#FFFFFF', fontSize: 24
                                         }}
                      />
                    </ListItemIcon>
                    <ThemedListItemText primary="Chat" />
                  </ListItemButton>
                </ListItem>
                <ListItem >
                  <ListItemButton
                      component={Link}
                      to={newGroupPath}
                      
                  >
                    <ListItemIcon>
                      <GroupOutlined fontSize="large"
                                     sx={{
                                       color:
                                           '#FFFFFF', fontSize: 24
                                     }}
                      />
                    </ListItemIcon>
                    <ThemedListItemText primary="Start a group" />
                  </ListItemButton>
                </ListItem>
                <ListItem >
                  <ListItemButton
                      component={Link}
                      to={newChannelPath}
                      

                  >
                    <ListItemIcon>
                      <WifiTethering fontSize="large"
                                     sx={{
                                       color:
                                           '#FFFFFF', fontSize: 24
                                     }}
                      />
                    </ListItemIcon>
                    <ThemedListItemText primary="Start a channel" />
                  </ListItemButton>
                </ListItem>
                <ListItem

                    onClick={() => changeRenderCentralComponent('mevipa')}
                >
                  <ListItemButton  >
                    <ListItemIcon>
                      <PlayCircleOutline fontSize="large"
                                         sx={{
                                           color:
                                               '#FFFFFF', fontSize: 24
                                         }}
                      />
                    </ListItemIcon>
                    <ThemedListItemText primary="Videos" />
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton  >
                    <ListItemIcon>
                      <VideocamOutlined fontSize="large"
                                        sx={{
                                          color:
                                              '#FFFFFF', fontSize: 24
                                        }}
                      />
                    </ListItemIcon>
                    <ThemedListItemText primary="Webinars" />
                  </ListItemButton>
                </ListItem>
                <ListItem

                    onClick={() => changeRenderCentralComponent('VR')}
                >
                  <ListItemButton  >
                    <ListItemIcon>
                      <RemoveRedEyeOutlined
                                         sx={{
                                           color:
                                               '#FFFFFF', fontSize: 24
                                         }}
                      />
                    </ListItemIcon>
                    <ThemedListItemText primary="VR" />
                  </ListItemButton>
                </ListItem>
                {/* Project support and version information */}
              </Box>
              <Box
                  sx={{
                    position: 'absolute',
                    bottom: themeMui.spacing(1),
                    width: '100%',
                    textAlign: 'left',
                  }}
              >
                <ListItem >
                  <ListItemButton
                      component={Link}
                      to={settingsPath}
                      

                  >
                    <ListItemIcon>
                      <SettingsOutlined fontSize="large"
                                        sx={{
                                          color:
                                              '#FFFFFF', fontSize: 24
                                        }}
                      />
                    </ListItemIcon>
                    <ThemedListItemText primary="Settings" />
                  </ListItemButton>
                </ListItem>
                {/*<ListItem >*/}
                {/*  <ListItemButton*/}
                {/*      component={Link}*/}
                {/*      to={'/'}*/}
                {/*      */}
                {/*  >*/}
                {/*    <ListItemIcon>*/}
                {/*      <LogoutOutlined fontSize="large"*/}
                {/*                      sx={{*/}
                {/*                        color:*/}
                {/*                        '#FFFFFF', fontSize: 24*/}
                {/*                      }}*/}
                {/*      />*/}
                {/*    </ListItemIcon>*/}
                {/*    <ThemedListItemText primary="Logout" />*/}
                {/*  </ListItemButton>*/}
                {/*</ListItem>*/}
              </Box>
            </Box>
        )}
      </Box>
  );
};

export default AppPageMainSideBar;
