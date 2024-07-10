import {
    ListItem,
    ListItemButton,
    ListItemIcon,
} from '@mui/material';
import { Box } from '@mui/system';
import {
    ChatBubbleOutline, GroupOutlined,
    HomeOutlined,
    // LogoutOutlined,
    PermIdentity,
    PlayCircleOutline, RemoveRedEyeOutlined,
    SettingsOutlined, VideocamOutlined, WifiTethering,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { RenderValuesCentralComponent } from "../chats/types.ts";
import { getThemeBackground } from '../chats/AppPageMainSideBar/styles.ts';
import {useTheme as useCustomTheme} from "../../../contexts/ThemeContext.tsx";

// Props type definition for AppPageMainSideBar component
type Props = {
    changeRenderCentralComponent: (value: RenderValuesCentralComponent) => void;
    currentCentralComponent: RenderValuesCentralComponent;
};


// Main side bar component for the application page
const AppPageLeftSideBar = ({
                                changeRenderCentralComponent,
                                currentCentralComponent,
                            }: Props) => {
    const themeMui = useTheme();
    const customTheme = useCustomTheme(); // Assuming this returns { theme: 'light' | 'dark' }

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
                width: '80px',
                display: 'flex',
                overflow: 'hidden',
                borderTopRightRadius: '16px',
                borderBottomRightRadius: '16px',
                background: getThemeBackground(customTheme.theme),
            }}
        >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ marginTop: themeMui.spacing(3) }}>
                        {sidebarItems.map(({ label, icon, component }) => (
                            <ListItem key={label} onClick={() => changeRenderCentralComponent(component as RenderValuesCentralComponent)}
                                      sx={{
                                          padding: '10px 0px 0px 10px'}}
                            >
                                <ListItemButton
                                    sx={{
                                        width: '56px',
                                        height: '56px',
                                        borderRadius: '1000px',
                                        backgroundColor: currentCentralComponent === component ? '#FFFFFF' : 'inherit',
                                        '&:hover': {
                                            backgroundColor: '#FFFFFF',
                                            '.MuiListItemIcon-root': { color: '#8C63FF' },
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ color: currentCentralComponent === component ? '#8C63FF' : '#FFFFFF', fontSize: 24 }}>
                                        {icon}
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: themeMui.spacing(1),
                            width: '100%',
                        }}
                    >
                        <ListItem
                            // onClick={() => changeRenderCentralComponent('settings')}
                        >
                            <ListItemButton
                                sx={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '100px',
                                    backgroundColor:
                                    // currentCentralComponent === 'settings' ? '#FFFFFF' :
                                        'inherit',
                                    '&:hover': {
                                        backgroundColor: '#FFFFFF',
                                        '.MuiListItemIcon-root': { color: '#8C63FF' },
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color:
                                    // currentCentralComponent === 'settings' ? '#8C63FF' :
                                        '#FFFFFF', fontSize: 24 }}>
                                    <SettingsOutlined />
                                </ListItemIcon>
                            </ListItemButton>
                        </ListItem>
                    </Box>
                </Box>
        </Box>
    );
};

export default AppPageLeftSideBar;
