import { createTheme, ThemeOptions } from '@mui/material/styles';
import {grey} from "@mui/material/colors";
import {deepmerge} from "@mui/utils";
// import {shape} from "@mui/system";

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        black: true;
    }
}

// Base Theme
const baseTheme = createTheme({
    shape: {
        borderRadius: 4,
    },
    spacing: (factor: number) => factor * 8,
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif, "Space Grotesk"',
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
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'black' },
                    style: {
                        color: '#fff',
                        backgroundColor: '#000',
                        borderColor: '#000',
                        borderRadius: 50,
                        padding: '10px 30px',
                        textTransform: 'none',
                        fontWeight: 500,
                        fontSize: '1rem',
                        '&:hover': {
                            backgroundColor: '#333',
                        },
                        '&:disabled': {
                            color: '#fff',
                            opacity: 0.6,
                            cursor: 'not-allowed',
                        },
                    },
                },
            ],
            styleOverrides: {
                root: ({ ownerState, theme }) => ({
                    ...(ownerState.variant === 'black' && {
                        ...(ownerState.size === 'small' && {
                            padding: theme.spacing(1),
                            fontSize: '0.875rem',
                        }),
                        ...(ownerState.size === 'medium' && {
                            padding: theme.spacing(1.5),
                            fontSize: '1rem',
                        }),
                        ...(ownerState.size === 'large' && {
                            padding: theme.spacing(2),
                            fontSize: '1.25rem',
                        }),
                    }),
                }),
            },
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
            secondary: '#AF9EC0'
        },

        primary: {
            main: '#e0e0e0',
            dark: '#9c9c9c',
            light: '#e6e6e6',

        },
        secondary: {
            main: '#6247BD',
            dark: '#F8F8FE',
            light: '#FFFFFF',
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
            secondary: '#AF9EC0',
        },

        primary: {
            main: '#211E2C',
            light: '#363445',
        },
        secondary: {
            main: '#f3f3f3',
            dark: '#363445',
            light: '#2A2B39',
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

