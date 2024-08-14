import { Theme } from '@mui/material/styles';
import {CSSProperties} from "../../../../types/common.ts";

export default {
    listItem: ({ isActiveSection, isDarkTheme, theme }: { isActiveSection: boolean, isDarkTheme: boolean, theme: Theme }) => ({
        transform: 'translateY(70px)',
        position: 'relative',
        borderRadius: '10px',
        transition: 'all 0.3s ease',
        padding: '10px 10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        ...(isActiveSection && {
            color: theme.palette.primary.main,
            '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '15px',
                backgroundColor: theme.palette.background.default,
                boxShadow: isDarkTheme ? theme.shadows[2] : theme.shadows[1],
                zIndex: -1,
                width: '88px',
                height: '72px',
                '@media (max-width: 1500px)': {
                    width: '85px',
                    height: '69px'
                }
            }
        }),
        '@media (max-width: 1500px)': {
            '& .MuiListItemText-primary': {
                fontSize: '0.83rem'
            },
            '& .MuiListItemIcon-root': {
                minWidth: '40px',
                '& svg': {
                    fontSize: '26px'
                }
            }
        },
        '@media (max-width: 1280px)': {
            '& .MuiListItemText-primary': {
                fontSize: '0.75rem'
            },
            '& .MuiListItemIcon-root': {
                minWidth: '30px',
                '& svg': {
                    fontSize: '20px'
                }
            }
        }
    }) ,

    navLink: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textDecoration: 'none',
        width: '100%',
        height: '100%',
        zIndex: 1,
        color: 'inherit',
        '&:hover': {
            color: 'inherit'
        }
    } ,

    navIcon: ({ isActiveSection, theme }: { isActiveSection: boolean, theme: Theme }) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 'auto',
        marginBottom: '2px',
        color: isActiveSection ? theme.palette.primary.main : 'inherit'
    }),

    navText: ({ isActiveSection, theme }: { isActiveSection: boolean, theme: Theme }) => ({
        textAlign: 'center',
        color: isActiveSection ? theme.palette.primary.main : 'inherit',
        padding: '0',
        marginBottom: '0'
    })
} as CSSProperties<'listItem' | 'navText' | 'navIcon' | 'navLink' >;
