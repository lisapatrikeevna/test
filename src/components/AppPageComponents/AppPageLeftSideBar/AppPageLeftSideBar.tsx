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
import MenuIcon from "@mui/icons-material/Menu";

// Props type definition for AppPageMainSideBar component
type Props = {
    setIsOpenMainSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    changeRenderCentralComponent: (value: RenderValuesCentralComponent) => void;
    currentCentralComponent: RenderValuesCentralComponent;
};


// Main side bar component for the application page
const AppPageLeftSideBar = ({
                                changeRenderCentralComponent,
                                currentCentralComponent,
                                setIsOpenMainSideBar,
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
                position: 'relative',
                height: '100vh',
                width: '80px',
                display: 'flex',
                overflow: 'hidden',
                borderTopRightRadius: '16px',
                borderBottomRightRadius: '16px',
                background: getThemeBackground(customTheme.theme),
            }}
        >

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                    <Box sx={{ marginTop: themeMui.spacing(3) }}>
                        <Box sx={{padding: '0px 0px 0px 26px'}}>
                        <MenuIcon
                            sx={{ color:
                                    '#FFFFFF', fontSize: 24 }}
                            cursor="pointer"
                            onClick={() => setIsOpenMainSideBar((prev) => !prev)}
                        />
                        </Box>
                        <Box sx={{marginTop: themeMui.spacing(3)}}>
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
                    </Box>
                    <Box
                        sx={{
                            marginTop: 'auto',
                            marginBottom: themeMui.spacing(3),
                        }}
                    >
                        <ListItem
                            onClick={() => changeRenderCentralComponent('settings')}
                            sx={{padding: '10px 0px 0px 10px'}}
                        >
                            <ListItemButton
                                sx={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '100px',
                                    backgroundColor:
                                    currentCentralComponent === 'settings' ? '#FFFFFF' :
                                        'inherit',
                                    '&:hover': {
                                        backgroundColor: '#FFFFFF',
                                        '.MuiListItemIcon-root': { color: '#8C63FF' },
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color:
                                    currentCentralComponent === 'settings' ? '#8C63FF' :
                                        '#FFFFFF', fontSize: 24, minWidth: '36px' }}>
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
