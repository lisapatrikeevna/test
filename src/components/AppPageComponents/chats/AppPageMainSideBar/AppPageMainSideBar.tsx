import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Box } from '@mui/system';
import {
  AccountCircleOutlined,
  CallOutlined,
  CampaignOutlined,
  ForumOutlined,
  HomeOutlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
  // LogoutOutlined,
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
  const username = useAppSelector(selectUsername) || 'Guest';
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
            width: isOpenMainSideBar ? '405px' : '0px',
            transition: 'width 0.5s ease',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            overflow: 'hidden',
            background: getThemeBackground(customTheme.theme), // Apply the dynamic background here
          }}
      >
        {isOpenMainSideBar && (
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems: 'flex-start'}}>
              <Box
                  sx={{
                    color: 'inherit',
                    textDecoration: 'none',
                    marginTop: themeMui.spacing(2),
                    marginLeft: themeMui.spacing(7),
                    display: 'flex',
                  }}
              >
                {/* User avatar */}
                <Avatar
                    src={userAvatar || ''}
                    sx={{
                      width: 53,
                      height: 53,
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
                            themeMui.palette.background.default,
                          }}
                      />
                  ) : (
                      <KeyboardArrowDownOutlined
                          sx={{
                            color:
                            themeMui.palette.background.default,
                          }}
                      />
                  )}
                </ListItemButton>
              </Box>
              <MyModalProfile
                  open={openProfileModal}
                  onClose={() => setOpenProfileModal(false)}
              />
              {/* Sidebar navigation items */}
              <Box sx={{marginLeft: themeMui.spacing(3), marginTop: themeMui.spacing(2)}}>
                <ListItem
                    onClick={() => changeRenderCentralComponent('home')}
                >
                  <ListItemButton disableRipple >
                    <ListItemIcon>
                      <HomeOutlined fontSize="large"
                                    sx={{
                                      color:
                                      themeMui.palette.background.default,
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
                      disableRipple

                  >
                    <ListItemIcon>
                      <AccountCircleOutlined fontSize="large"
                                             sx={{
                                               color:
                                               themeMui.palette.background.default,
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
                      disableRipple

                  >
                    <ListItemIcon>
                      <ForumOutlined fontSize="large"
                                     sx={{
                                       color:
                                       themeMui.palette.background.default,
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
                      disableRipple
                  >
                    <ListItemIcon>
                      <PeopleOutline fontSize="large"
                                     sx={{
                                       color:
                                       themeMui.palette.background.default,
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
                      disableRipple

                  >
                    <ListItemIcon>
                      <CampaignOutlined fontSize="large"
                                        sx={{
                                          color:
                                          themeMui.palette.background.default,
                                        }}
                      />
                    </ListItemIcon>
                    <ThemedListItemText primary="Start a channel" />
                  </ListItemButton>
                </ListItem>
                <ListItem

                    onClick={() => changeRenderCentralComponent('mevipa')}
                >
                  <ListItemButton disableRipple >
                    <ListItemIcon>
                      <PlayCircleOutline fontSize="large"
                                         sx={{
                                           color:
                                           themeMui.palette.background.default,
                                         }}
                      />
                    </ListItemIcon>
                    <ThemedListItemText primary="Videos" />
                  </ListItemButton>
                </ListItem>
                <ListItem >
                  <ListItemButton disableRipple >
                    <ListItemIcon>
                      <CallOutlined fontSize="large"
                                    sx={{
                                      color:
                                      themeMui.palette.background.default,
                                    }}
                      />
                    </ListItemIcon>
                    <ThemedListItemText primary="Webinars" />
                  </ListItemButton>
                </ListItem>
                <ListItem

                    onClick={() => changeRenderCentralComponent('VR')}
                >
                  <ListItemButton disableRipple >
                    <ListItemIcon>
                      <PlayCircleOutline fontSize="large"
                                         sx={{
                                           color:
                                           themeMui.palette.background.default,
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
                    bottom: '10px',
                    left: 0,
                    width: '100%',
                    textAlign: 'left',
                    paddingLeft: '20px',
                  }}
              >
                <ListItem >
                  <ListItemButton
                      component={Link}
                      to={settingsPath}
                      disableRipple

                  >
                    <ListItemIcon>
                      <SettingsOutlined fontSize="large"
                                        sx={{
                                          color:
                                          themeMui.palette.background.default,
                                        }}
                      />
                    </ListItemIcon>
                    <ThemedListItemText primary="Settings" />
                  </ListItemButton>
                </ListItem>
                <ListItem

                    sx={{ paddingLeft: '17px' }}
                >
                </ListItem>
                {/*<ListItem >*/}
                {/*  <ListItemButton*/}
                {/*      component={Link}*/}
                {/*      to={'/'}*/}
                {/*      disableRipple*/}
                {/*  >*/}
                {/*    <ListItemIcon>*/}
                {/*      <LogoutOutlined fontSize="large"*/}
                {/*                      sx={{*/}
                {/*                        color:*/}
                {/*                        themeMui.palette.background.default,*/}
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
