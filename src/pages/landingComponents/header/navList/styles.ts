
import {CSSProperties} from "../../../../types/common.ts";

export default {
    navList: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        top: '-65px',
        width: '850px',
        '@media (max-width: 1500px)': {
            width: '700px'
        },
        '@media (max-width: 1337px)': {
            width: '640px'
        },
        '@media (max-width: 1160px)': {
            width: '600px'
        },
        '@media (max-width: 1280px)': {
            width: '100%',
            display: 'none'
        }
    } ,
} as CSSProperties<'navList' >;
