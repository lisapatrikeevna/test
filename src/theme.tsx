import { createTheme } from '@mui/material/styles';
import {grey} from "@mui/material/colors";

export const lightTheme = createTheme({
    shape: {
        borderRadius: 10,
    },

    spacing: (factor: number) => factor * 8,

    typography: {
        fontFamily: 'Roboto, sans-serif',
    },

    palette: {
        mode: 'light',

        background: {
            default: grey[300],
            paper: grey[200],
        },

        tonalOffset: {
            light: 0.5,
            dark: 0.2,
        },

        text: {
            primary: '#212121',
        },

        primary: {
            main: '#e0e0e0',
        },

        secondary: {
            main: '#2f65d7',
        },

        error: {
            main: '#f44336',
        }
    },
});

export const darkTheme = createTheme({
    shape: {
        borderRadius: 10,
    },

    spacing: (factor: number) => factor * 8,

    typography: {
        fontFamily: 'Roboto, sans-serif',
    },

    palette: {
        mode: 'dark',

        background: {
            default: grey[900],
            paper: grey[800],
        },

        tonalOffset: {
            light: 0.5,
            dark: 0.2,
        },

        text: {
            primary: '#e0e0e0',
        },

        primary: {
            main: '#212121',
        },

        secondary: {
            main: '#2f65d7',
        }
    },
});