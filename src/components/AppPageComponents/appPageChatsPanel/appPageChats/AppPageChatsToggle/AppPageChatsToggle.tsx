import React from 'react';
import { IconButton } from '@mui/material';
import {ArrowBackIosNewOutlined, ArrowForwardIosOutlined} from '@mui/icons-material';
import { Box } from '@mui/system';

type ChatsToggleProps = {
    toggleChatsPanel: () => void;
    isChatPanelOpen: boolean;
};

const AppPageChatsToggle = ({ toggleChatsPanel, isChatPanelOpen }: ChatsToggleProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                top: '50%', // Adjust this to center vertically as needed

                transform: 'translateY(-50%)', // Center vertically
                zIndex: 2, // Ensure it's above other content
            }}
        >
            <IconButton
                onClick={toggleChatsPanel}
                sx={{
                    width: '24px',
                    height: '24px',
                    border: '2px',
                    backgroundColor: '#888888',
                    color: '#FFFFFF',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {isChatPanelOpen ? (
                    <ArrowBackIosNewOutlined
                        sx={{
                            fontSize: '12px',
                        }}
                    />
                ) : (
                    <ArrowForwardIosOutlined
                        sx={{
                            fontSize: '12px',
                        }}
                    />
                )}
            </IconButton>
        </Box>
    );
};

export default AppPageChatsToggle;
