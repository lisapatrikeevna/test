import { createTheme } from '@mui/material/styles';
import { Shadows } from './types/types.tsx'

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

// Function for generation of fixed length shadow array
const generateShadows = (shadow: string): Shadows => {
    return [
        "none", // первая тень
        ...Array(24).fill(shadow)
    ] as Shadows;
};

// Announcing shadows for light and dark themes
const lightShadows = generateShadows('7px 7px 15px #bebebe, -7px -7px 15px #ffffff');
const darkShadows = generateShadows('7px 7px 15px #1a1a1a, -7px -7px 15px #333333');

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
    shadows: lightShadows
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
    shadows: darkShadows
});