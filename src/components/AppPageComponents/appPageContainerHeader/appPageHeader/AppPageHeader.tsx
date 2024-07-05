import {
    Badge,
    Box,
    Modal,
    Stack,
    Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { useTheme as useCustomTheme } from '../../../../contexts/ThemeContext.tsx';
import { useTheme } from '@mui/material/styles';
import SearchField from "../../SearchField.tsx";
import {AppPageSwitch} from "./AppPageSwitch.tsx";

// Props type definition for AppPageHeader component
type Props = {
    setIsOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    setIsOpenMainSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    toggleChatsPanel: () => void;
    setIsChatPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Header component for the application page
const AppPageHeader = ({
                           setIsOpenSideBar,
                           setIsOpenMainSideBar,
                           toggleChatsPanel,
                       }: Props) => {
    const [isOpenModalNotifications, setIsOpenModalNotifications] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [searchQuery, setSearchQuery] = useState('');
    const { theme, setTheme } = useCustomTheme();
    const themeMui = useTheme();

    // Handle opening of the notifications modal
    const handleModal = (event: React.MouseEvent<SVGSVGElement>) => {
        const target = event.currentTarget as unknown as HTMLElement;
        const iconPosition = target.getBoundingClientRect();
        const leftOffset = 250;
        const bottomOffset = 20;
        setModalPosition({
            top: iconPosition.bottom + window.scrollY + bottomOffset,
            left: iconPosition.left + window.scrollX - leftOffset,
        });
        setIsOpenModalNotifications(true);
    };

    // Handle search action
    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(
                searchQuery
            )}`;
            window.open(googleSearchUrl, '_blank');
        }
        setSearchQuery('');
    };

    // Toggle the theme between light and dark
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
                zIndex: 1100,
                position: 'relative',
                padding: themeMui.spacing(2),
                height: '85px',
            }}
            style={{ backgroundColor: themeMui.palette.background.default }}
        >
            {/* Left icons */}
            <Stack direction="row" spacing={2} alignItems="center">
                <MenuIcon
                    cursor="pointer"
                    onClick={() => setIsOpenMainSideBar((prev) => !prev)}
                />
                <EmailIcon
                    cursor="pointer"
                    onClick={toggleChatsPanel}
                />
            </Stack>

            {/* Search bar */}
            <Stack direction="row" >
                {/*#region Previous Search bar*/}
                {/*<TextField*/}
                {/*  id="outlined-basic"*/}
                {/*  label="Search"*/}
                {/*  variant="outlined"*/}
                {/*  size="small"*/}
                {/*  sx={{display: 'flex', width: '400px', height: '32px'}}*/}
                {/*  value={searchQuery}*/}
                {/*  onChange={(e) => setSearchQuery(e.target.value)}*/}
                {/*  onKeyPress={handleKeyPress}*/}
                {/*  InputProps={{*/}
                {/*    endAdornment: (*/}
                {/*      <InputAdornment*/}
                {/*        position="end"*/}

                {/*        sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}*/}
                {/*      >*/}
                {/*        /!*<KeyboardAltOutlinedIcon sx={{ cursor: 'pointer' }} />*!/*/}
                {/*        <SearchOutlinedIcon cursor="pointer" onClick={handleSearch} />*/}
                {/*      </InputAdornment>*/}
                {/*    ),*/}
                {/*  }}*/}
                {/*/>*/}
                {/*#endregion Previous Search bar*/}
                <SearchField onSearch={handleSearch} />
                <Box
                    sx={{
                        isolation: 'isolate',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: themeMui.spacing(2),
                        '@media (max-width: 930px)': {
                            width: '70px',
                        },
                        borderRadius: '25px',
                        overflow: 'hidden',
                    }}
                >
                    <AppPageSwitch
                        checked={theme === 'light'}
                        onChange={toggleTheme}
                        name="check"
                        color="secondary"
                        inputProps={{ 'aria-label': 'theme switch' }}
                    />
                </Box>
                {/*<KeyboardVoiceOutlinedIcon*/}
                {/*  sx={{*/}
                {/*    cursor: 'pointer',*/}
                {/*  }}*/}
                {/*/>*/}
            </Stack>
            {/* Right icons */}
            <Stack direction="row" spacing={2} alignItems="center">

                <Badge badgeContent={10} color="primary" max={9}>
                    <NotificationsIcon
                        cursor="pointer"
                        onClick={handleModal}
                        sx={{
                            position: 'relative',
                        }}
                    />
                </Badge>
                <Modal
                    open={isOpenModalNotifications}
                    onClose={() => setIsOpenModalNotifications(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    BackdropProps={{ style: { backgroundColor: 'transparent' } }}
                >
                    <Box
                        sx={{
                            padding: '15px',
                            borderRadius: '15px',
                            width: '300px',
                            background: '#e0e0e0',
                            position: 'absolute',
                            top: modalPosition.top,
                            left: modalPosition.left,
                        }}
                    >
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Text in a modal
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box>
                </Modal>
                <MoreVertIcon
                    cursor="pointer"
                    onClick={() => setIsOpenSideBar((prev) => !prev)}
                    sx={{
                        color: themeMui.palette.mode === 'dark' ? '#bebebe' : '#333333',
                    }}
                />
            </Stack>
        </Stack>
    );
};

export default AppPageHeader;
