import React from 'react';
import { Switch, styled, SwitchProps } from '@mui/material';

interface AppPageSwitchProps extends SwitchProps {
    // Additional custom props can be defined here
}

const StyledSwitch = styled((props: AppPageSwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 28,
    height: 18,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(170%) translateY(-50%)', // Сдвиг вправо для активного состояния
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.secondary.main,
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&:not(.Mui-checked)': {
            transform: 'translateX(50%) translateY(-50%)', // Сдвиг влево для неактивного состояния
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 8.62,
        height: 8.62,
        color: theme.palette.background.default,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.secondary.main,
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export { StyledSwitch as AppPageSwitch };