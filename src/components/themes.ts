// theme.tsx
import { createTheme } from '@mui/material/styles';

export interface Theme {
    // Add more colors if needed
    shape: {
        borderRadius: number;
    };

    shadows: string[];



    spacing: (factor: number) => number;

    typography: {
        fontFamily: string;
    };

    palette: {
        mode: 'light' | 'dark';
        background: {
            default: string;
        }
        text: {
            primary: string;
        };

        primary: {
            main: string;
        };

        secondary: {
            main: string;
        }
    };
}

export const lightTheme = createTheme({
    shape: {
        borderRadius: 25,
    },



    spacing: (factor: number) => factor * 8,

    typography: {
        fontFamily: 'Roboto, sans-serif',
    },

    palette: {
        mode: 'light',
        background: {
            default: '#e0e0e0',
        },
        text: {
            primary: '#222222',
        },

        primary: {
            main: '#F22874',
        },

        secondary: {
            main: '#2f65d7',
        }

        // Add more colors if needed
    },
});

export const darkTheme = createTheme({
    shape: {
        borderRadius: 25,
    },

    spacing: (factor: number) => factor * 8,

    typography: {
        fontFamily: 'Roboto, sans-serif',
    },

    palette: {
        mode: 'dark',
        background: {
            default: '#222222',
            paper: '#222222',
        },
        text: {
            primary: '#e0e0e0',
        },

        primary: {
            main: '#cb27d1',
        },

        secondary: {
            main: '#2f65d7',
        }

        // Add more colors if needed
    },
});