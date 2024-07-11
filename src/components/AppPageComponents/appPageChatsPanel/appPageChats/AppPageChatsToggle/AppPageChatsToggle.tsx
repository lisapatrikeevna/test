import React from 'react';
import { IconButton } from '@mui/material';
import { ArrowBackIosNewOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import { useTheme as useCustomTheme } from '../../../../../contexts/ThemeContext.tsx';
import { getThemeBackground } from '../../../chats/AppPageMainSideBar/styles.ts';

type ChatsToggleProps = {
    isChatsOpen: boolean;
    toggleChats: () => void;
};

const AppPageChatsToggle = ({ isChatsOpen, toggleChats }: ChatsToggleProps) => {
    const customTheme = useCustomTheme(); // Assuming this returns { theme: 'light' | 'dark' }

    return (
        <Box
            sx={{
                position: 'absolute',
                left: isChatsOpen ? 18 : -63,
                top: '50%', // Adjust this to center vertically as needed
                transform: 'translateY(-50%)', // Center vertically
                zIndex: 2, // Ensure it's above other content
            }}
        >
            <IconButton
                onClick={toggleChats}
                sx={{
                    width: '81px',
                    height: '81px',
                    background: getThemeBackground(customTheme.theme),
                    color: '#FFFFFF',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}
            >
                <ArrowBackIosNewOutlined
                    sx={{
                        fontSize: '12px',
                        transform: isChatsOpen ? 'rotate(0deg)' : 'rotate(180deg)',
                    }}
                />
            </IconButton>
        </Box>
    );
};

export default AppPageChatsToggle;
