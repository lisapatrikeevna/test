import {CSSProperties} from "../../../../types/common.ts";


export default {
    mobileMenuButton: {
        display: { xs: 'flex', md: 'none', lg: 'none', xl: 'none', '@media (max-width: 1280px)': { display: 'flex' } }
    } ,
    mobileMenu: {
        width: '32px',
        height: '32px'
    }
} as CSSProperties<'mobileMenuButton' | 'mobileMenu'>;
