import {
    Badge,
    Box,
    Modal,
    Stack,
    Typography,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { useTheme as useCustomTheme } from '../../../../contexts/ThemeContext.tsx';
import { useTheme } from '@mui/material/styles';
import SearchField from "../../SearchField.tsx";
import {AppPageSwitch} from "./AppPageSwitch.tsx";
import {NotificationsOutlined} from "@mui/icons-material";

// Props type definition for AppPageHeader component
type Props = {
    setIsOpenSideBar: React.Dispatch<React.SetStateAction<boolean>>;
    toggleChatsPanel: () => void;
    setIsChatPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// Header component for the application page
const AppPageHeader = ({
                           setIsOpenSideBar,

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
                position: 'relative',
                padding: themeMui.spacing(2),
                height: '64px',
                width: "calc(100vw - 80px)",
            }}
            style={{ backgroundColor: themeMui.palette.background.default }}
        >
            <Box flex={1} />

            {/* Centered Search bar and Theme Switch */}
            <Stack direction="row" justifyContent="center" alignItems="center" flex={1} sx={{marginLeft: themeMui.spacing(9)}}>
                <SearchField onSearch={handleSearch} />
                <Box
                    sx={{
                        isolation: 'isolate',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: themeMui.spacing(5),
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
            </Stack>

            {/* Right icons */}
            <Stack direction="row" spacing={2} flex={1} justifyContent="flex-end">
                <Badge color="primary" max={9}>
                    <NotificationsOutlined
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
