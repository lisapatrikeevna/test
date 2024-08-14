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
import { RenderValuesCentralComponent } from "../types.ts";
import { getThemeBackground } from './styles';

// Props type definition for AppPageMainSideBar component
type Props = {
    isOpenMainSideBar: boolean;
    changeRenderCentralComponent: (value: RenderValuesCentralComponent) => void;
    currentCentralComponent: RenderValuesCentralComponent;
};


// Main side bar component for the application page
const AppPageMainSideBar = ({
                                isOpenMainSideBar,
                                changeRenderCentralComponent,
                                currentCentralComponent,
                            }: Props) => {
    const username = useAppSelector(selectUsername) || 'Name Surname';
    const [openProfileModal, setOpenProfileModal] = useState(false);
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

    const sidebarItems = [
        { label: 'Home', icon: <HomeOutlined />, component: 'home' },
        { label: 'Profile', icon: <PermIdentity />, component: 'profile' },
        { label: 'Chat', icon: <ChatBubbleOutline />, component: 'chat' },
        { label: 'Start a group', icon: <GroupOutlined />, component: 'newGroup' },
        { label: 'Start a channel', icon: <WifiTethering />, component: 'newChannel' },
        { label: 'Videos', icon: <PlayCircleOutline />, component: 'mevipa' },
        { label: 'Webinars', icon: <VideocamOutlined />, component: 'webinars' },
        { label: 'VR', icon: <RemoveRedEyeOutlined />, component: 'VR' },
    ];

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
                background: getThemeBackground(customTheme.theme),
            }}
        >
            {isOpenMainSideBar && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Box
                        sx={{
                            color: 'inherit',
                            textDecoration: 'none',
                            marginTop: themeMui.spacing(2),
                            marginLeft: themeMui.spacing(3),
                            display: 'flex',
                            marginBottom: themeMui.spacing(1),
                        }}
                    >
                        <Avatar
                            src={userAvatar || ''}
                            sx={{
                                width: 40,
                                height: 40,
                                cursor: 'pointer',
                                position: 'relative',
                                backgroundColor: userAvatar?.startsWith('#') ? userAvatar : undefined
                            }}
                            onClick={handleAvatarClick}
                        />
                        <ListItemButton>
                            <ThemedListItemText primary={username} />
                        </ListItemButton>
                        <Box sx={{ display: 'flex', alignItems: 'top', marginLeft: themeMui.spacing(6) }}>
                            <Close sx={{ color: '#FFFFFF', fontSize: 24 }} />
                        </Box>
                    </Box>
                    <MyModalProfile
                        open={openProfileModal}
                        onClose={() => setOpenProfileModal(false)}
                    />
                    <Box>
                        {sidebarItems.map(({ label, icon, component }) => (
                            <ListItem key={label} onClick={() => changeRenderCentralComponent(component as RenderValuesCentralComponent)}
                                      sx={{
                                          padding: '10px 0px 0px 10px'
                            }}
                            >
                                <ListItemButton
                                    sx={{
                                        width: '272px',
                                        height: '56px',
                                        borderRadius: '100px',
                                        backgroundColor: currentCentralComponent === component ? '#FFFFFF' : 'inherit',
                                        '&:hover': {
                                            backgroundColor: '#FFFFFF',
                                            '.MuiListItemIcon-root': { color: '#8C63FF' },
                                            '.MuiListItemText-primary': { color: '#8C63FF' },
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ color: currentCentralComponent === component ? '#8C63FF' : '#FFFFFF', fontSize: 24, minWidth: '36px' }}>
                                        {icon}
                                    </ListItemIcon>
                                    <ThemedListItemText primary={label} sx={{ color: currentCentralComponent === component ? '#8C63FF' : '#FFFFFF' }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: themeMui.spacing(1),
                            width: '100%',
                            textAlign: 'left',
                        }}
                    >
                        <ListItem
                            // onClick={() => changeRenderCentralComponent('settings')}
                            sx={{padding: '10px 0px 0px 10px'}}
                        >
                            <ListItemButton
                                sx={{
                                    width: '272px',
                                    height: '56px',
                                    borderRadius: '100px',
                                    backgroundColor:
                                        // currentCentralComponent === 'settings' ? '#FFFFFF' :
                                        'inherit',
                                    '&:hover': {
                                        backgroundColor: '#FFFFFF',
                                        '.MuiListItemIcon-root': { color: '#8C63FF' },
                                        '.MuiListItemText-primary': { color: '#8C63FF' },
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color:
                                        // currentCentralComponent === 'settings' ? '#8C63FF' :
                                            '#FFFFFF', fontSize: 24, minWidth: '36px' }}>
                                    <SettingsOutlined />
                                </ListItemIcon>
                                <ThemedListItemText primary="Settings" sx={{ color:
                                        // currentCentralComponent === 'settings' ? '#8C63FF' :
                                            '#FFFFFF' }} />
                            </ListItemButton>
                        </ListItem>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default AppPageMainSideBar;
