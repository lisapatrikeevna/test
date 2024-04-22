import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#e0e0e0',
        }
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#212121',
        }
    },
});

export { lightTheme, darkTheme };