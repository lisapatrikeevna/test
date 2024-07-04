import {CSSProperties} from "../../../../../types/common.ts";

export default {
    mainContainer: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        cursor: 'pointer',
        justifyContent: 'center',
    },
    stack:{
        width: '50px',
        display: 'flex',
        alignItems: 'center'
    }


} as CSSProperties <'mainContainer' | "stack">;