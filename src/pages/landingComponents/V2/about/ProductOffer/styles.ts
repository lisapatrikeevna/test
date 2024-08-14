import {CSSProperties} from "../../../../../types/common.ts";

export default {
    mainContainer: {
      backgroundColor: '#ECECEC',
        minWidth: '100%',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 10,
    },
} as CSSProperties<'container' | 'mainContainer'>;