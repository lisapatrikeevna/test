import {CSSProperties} from "../../../../types/common.ts";


export default {
    themeSwitchLabel: {
        display: 'inline-flex',
        alignItems: 'center',
        cursor: 'pointer'
    } ,
    themeSwitchBox: {
        isolation: 'isolate',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: '60px',
        width: '120px',
        '@media (max-width: 1270px)': {
            width: '70px'
        },
        borderRadius: '25px',
        overflow: 'hidden'
    }
} as CSSProperties<'themeSwitchLabel' | 'themeSwitchBox'>;
