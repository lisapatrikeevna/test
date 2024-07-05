import { createTheme, ThemeOptions } from '@mui/material/styles';
import {grey} from "@mui/material/colors";
import {deepmerge} from "@mui/utils";

// Base Theme
const baseTheme = createTheme({
    shape: {
        borderRadius: 10,
    },
    spacing: (factor: number) => factor * 8,
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontSize: 14,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        h1: {
            fontSize: '2rem', // default for xs
        },
        h2: {
            fontSize: '1.5rem', // default for xs
        },
        h3: {
            fontSize: '1.17rem', // default for xs
        },
        h4: {
            fontSize: '1rem', // default for xs
        },
        h5: {
            fontSize: '0.83rem', // default for xs
        },
        h6: {
            fontSize: '0.67rem', // default for xs
        },
        body1: {
            fontSize: '1rem', // default for xs
        },
        body2: {
            fontSize: '0.83rem', // default for xs
        },
    },

});

const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',

        background: {
            default: "#F8F8FE",
            paper: grey[200],

        },

        text: {
            primary: '#212121',
        },

        primary: {
            main: '#e0e0e0',
            dark: '#9c9c9c',
            light: '#e6e6e6',

        },
        secondary: {
            main: '#6247BD',
            dark: '#6247BD',
            light: '#8C63FF',
        },
    },
};
    
const darkThemeOptions: ThemeOptions = {

    palette: {
        mode: 'dark',

        background: {
            default: "#211E2C",
            paper: grey[800],

        },

        text: {
            primary: '#e0e0e0',
        },

        primary: {
            main: '#212121',
        },
        secondary: {
            main: '#f3f3f3',
            dark: '#211E2C',
            light: '#E7E0EC',
        },

    },
};

// Customizing typography using breakpoints
baseTheme.typography.h1 = {
    ...baseTheme.typography.h1,
    [baseTheme.breakpoints.up('sm')]: {
        fontSize: '2.5rem', // sm
    },
    [baseTheme.breakpoints.up('md')]: {
        fontSize: '3rem', // md
    },
    [baseTheme.breakpoints.up('lg')]: {
        fontSize: '3.5rem', // lg
    },
    [baseTheme.breakpoints.up('xl')]: {
        fontSize: '4rem', // xl
    },
};


baseTheme.typography.h2 = {
    ...baseTheme.typography.h2,
    [baseTheme.breakpoints.up('sm')]: {
        fontSize: '2rem', // sm
    },
    [baseTheme.breakpoints.up('md')]: {
        fontSize: '2.5rem', // md
    },
    [baseTheme.breakpoints.up('lg')]: {
        fontSize: '3rem', // lg
    },
    [baseTheme.breakpoints.up('xl')]: {
        fontSize: '3.5rem', // xl
    },
};

baseTheme.typography.h3 = {
    ...baseTheme.typography.h3,
    [baseTheme.breakpoints.up('sm')]: {
        fontSize: '1.5rem', // sm
    },
    [baseTheme.breakpoints.up('md')]: {
        fontSize: '1.75rem', // md
    },
    [baseTheme.breakpoints.up('lg')]: {
        fontSize: '2rem', // lg
    },
    [baseTheme.breakpoints.up('xl')]: {
        fontSize: '2.25rem', // xl
    },
};

baseTheme.typography.h4 = {
    ...baseTheme.typography.h4,
    [baseTheme.breakpoints.up('sm')]: {
        fontSize: '1.25rem', // sm
    },
    [baseTheme.breakpoints.up('md')]: {
        fontSize: '1.5rem', // md
    },
    [baseTheme.breakpoints.up('lg')]: {
        fontSize: '1.75rem', // lg
    },
    [baseTheme.breakpoints.up('xl')]: {
        fontSize: '2rem', // xl
    },
};

baseTheme.typography.h5 = {
    ...baseTheme.typography.h5,
    [baseTheme.breakpoints.up('sm')]: {
        fontSize: '1rem', // sm
    },
    [baseTheme.breakpoints.up('md')]: {
        fontSize: '1.25rem', // md
    },
    [baseTheme.breakpoints.up('lg')]: {
        fontSize: '1.5rem', // lg
    },
    [baseTheme.breakpoints.up('xl')]: {
        fontSize: '1.75rem', // xl
    },
};

baseTheme.typography.h6 = {
    ...baseTheme.typography.h6,
    [baseTheme.breakpoints.up('sm')]: {
        fontSize: '0.75rem', // sm
    },
    [baseTheme.breakpoints.up('md')]: {
        fontSize: '0.83rem', // md
    },
    [baseTheme.breakpoints.up('lg')]: {
        fontSize: '1rem', // lg
    },
    [baseTheme.breakpoints.up('xl')]: {
        fontSize: '1.17rem', // xl
    },
};

baseTheme.typography.body1 = {
    ...baseTheme.typography.body1,
    [baseTheme.breakpoints.up('sm')]: {
        fontSize: '1rem', // sm
    },
    [baseTheme.breakpoints.up('md')]: {
        fontSize: '1.17rem', // md
    },
    [baseTheme.breakpoints.up('lg')]: {
        fontSize: '1.33rem', // lg
    },
    [baseTheme.breakpoints.up('xl')]: {
        fontSize: '1.5rem', // xl
    },
};

baseTheme.typography.body2 = {
    ...baseTheme.typography.body2,
    [baseTheme.breakpoints.up('sm')]: {
        fontSize: '0.83rem', // sm
    },
    [baseTheme.breakpoints.up('md')]: {
        fontSize: '0.92rem', // md
    },
    [baseTheme.breakpoints.up('lg')]: {
        fontSize: '1rem', // lg
    },
    [baseTheme.breakpoints.up('xl')]: {
        fontSize: '1.08rem', // xl
    },
};

export const lightTheme = createTheme(deepmerge(baseTheme, lightThemeOptions));
export const darkTheme = createTheme(deepmerge(baseTheme, darkThemeOptions));

