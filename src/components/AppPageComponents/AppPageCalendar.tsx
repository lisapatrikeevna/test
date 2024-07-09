import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { Box, useMediaQuery, useTheme } from '@mui/material';

// Component to render a calendar using Material-UI pickers
const AppPageCalendar = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: 2,
                    width: isSmallScreen ? '100%' : 'auto',
                    '& .MuiPickerStaticWrapper-root': {
                        width: isSmallScreen ? '100%' : 'auto',
                        transform: isSmallScreen ? 'scale(0.8)' : 'scale(1)',
                    },
                }}
            >
                <StaticDatePicker sx={{borderRadius: '23px',
                    '& .MuiDateCalendar-root': {
                            backgroundColor: theme.palette.secondary.dark,

                    },
                    '& .MuiPickersToolbar-root': {
                        backgroundColor: theme.palette.secondary.dark,
                    },
                    '& .MuiDialogActions-root': {
                        backgroundColor: theme.palette.secondary.dark
                    }
                }} orientation="portrait" />
            </Box>
        </LocalizationProvider>
    );
};

export default AppPageCalendar;
