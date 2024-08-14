import {CSSProperties} from "../../../../../types/common.ts";

export default {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: '300px',
        gap: '10px',
    },
} as CSSProperties<'container'>;

