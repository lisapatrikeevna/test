import {CSSProperties} from "../../../../types/common.ts";


export default {
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop:2,
    },
    userAvatar:{
        width: 50,
        height: 50,
        cursor: 'pointer',
        position: 'relative',
        marginBottom:'10px'
    }

} as CSSProperties <'mainContainer' | 'userAvatar' >;