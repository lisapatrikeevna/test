import React from 'react';
import { IconButton } from '@mui/material';
import {ArrowBackIosNewOutlined, ArrowForwardIosOutlined} from '@mui/icons-material';
import { Box } from '@mui/system';
import { useTheme as useCustomTheme } from '../../../../contexts/ThemeContext.tsx';
import { getThemeBackground } from '../../chats/AppPageMainSideBar/styles.ts';

type LeftSideBarToggleProps = {
    isLeftSideBarOpen: boolean;
    toggleLeftSideBar: () => void;
};

const AppPageLeftSideBarToggle = ({ isLeftSideBarOpen, toggleLeftSideBar }: LeftSideBarToggleProps) => {
    const customTheme = useCustomTheme(); // Assuming this returns { theme: 'light' | 'dark' }

    return (
        <Box
            sx={{
                position: 'absolute',
                left: isLeftSideBarOpen ? 8 : -59,
                top: '50%', // Adjust this to center vertically as needed
                transform: 'translateY(-50%)', // Center vertically
                zIndex: 2, // Ensure it's above other content
            }}
        >
            <IconButton
                onClick={toggleLeftSideBar}
                sx={{
                    width: '81px',
                    height: '81px',
                    background: getThemeBackground(customTheme.theme),
                    color: '#FFFFFF',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}
            >
                {isLeftSideBarOpen ? (
                    <ArrowBackIosNewOutlined
                        sx={{
                            fontSize: '12px',
                            marginLeft: '63px',
                        }}
                    />
                ) : (
                    <ArrowForwardIosOutlined
                        sx={{
                            fontSize: '12px',
                            marginLeft: '63px',
                        }}
                    />
                )}
            </IconButton>
        </Box>
    );
};

export default AppPageLeftSideBarToggle;
