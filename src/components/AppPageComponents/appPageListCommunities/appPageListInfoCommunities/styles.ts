import {CSSProperties} from "../../../../types/common.ts";

export default {
    stack: {
        minWidth: '80px',
        position: 'relative',
        padding:1,
        flexDirection: 'column',
        marginTop:1,
    },
    divider:{
        width: '100%',
        height: '2px',
        marginTop: '20px',
        marginBottom:'10px'
    },
    communitiesListContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        marginLeft: '5px',
    },
    userAvatar:{
        width: 50,
        height: 50,
        cursor: 'pointer',
        position: 'relative',
    },
    avatarAndSearchContainer:{
        display: 'flex',
        gap: '16px',
        alignItems: 'center'
    }

} as CSSProperties <'stack' | 'divider' | 'communitiesListContainer' | 'userAvatar' | 'avatarAndSearchContainer'>;