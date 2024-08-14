import { CSSProperties } from '../../../types/common';

export default {
    mainContainer: {
        width: '100%',
        position: 'fixed',
        top: 0,
        paddingLeft: '3vw',
        paddingRight: '3vw',
        '@media (max-width: 830px)': {
            paddingRight: '1vw',
            paddingLeft: '1vw'
        },
        height: '95px',
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: '0.5s',
        overflowY: 'hidden'
    } ,
    rightContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginLeft: '67px',
        '@media (max-width: 1270px)': {
            marginLeft: '8px'
        }
    } ,
    itemsContainer:{
        paddingLeft: '20px',
        transformOrigin: 'left',
        display: { xs: 'none', md: 'flex', lg: 'flex', xl: 'flex', '@media (max-width: 1280px)': { display: 'none' } },
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
    }

} as CSSProperties<'mainContainer' | 'rightContainer' | 'itemsContainer'>;

export const drawerLogoStyles = { width: 50, height: 50 }