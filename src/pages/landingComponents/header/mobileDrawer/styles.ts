
import { Theme } from '@mui/material/styles';
import {CSSProperties} from "../../../../types/common.ts";

export default {
    drawerBox: {
        width: 250,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px'
    } ,
    drawerItem: (isActiveSection:boolean, theme: Theme) => ({
        padding: '15px 10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.action.hover
        },
        ...(isActiveSection && {
            color: theme.palette.primary.main,
            '&::before': {
                content: '""',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderRadius: '15px',
                boxShadow: theme.shadows[1],
                zIndex: -1,
                width: '88px',
                height: '72px',
                '@media (max-width: 1500px)': {
                    width: '85px',
                    height: '69px'
                }
            }
        })
    }) ,
    drawerLink: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textDecoration: 'none',
        width: '100%',
        height: '100%',
        zIndex: 1
    } ,
    drawerIcon: (isActiveSection:boolean, theme: Theme) => ({
        minWidth: 'auto',
        margin: '8px',
        justifyContent: 'center',
        display: 'flex',
        color: isActiveSection ? theme.palette.primary.main : 'inherit'
    }) ,
    drawerText: (isActiveSection:boolean,  theme: Theme) => ({
        textAlign: 'center',
        color: isActiveSection ? theme.palette.primary.main : 'inherit',
        padding: '0',
        marginBottom: '0'
    })
} as CSSProperties<'drawerBox' | 'drawerItem' | 'drawerLink' | 'drawerIcon' | 'drawerText'>;
