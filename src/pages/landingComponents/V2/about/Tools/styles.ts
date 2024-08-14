import {CSSProperties} from "../../../../../types/common.ts";

export default {
    container: {
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        minWidth: '100%',
    },
} as CSSProperties<'container' | 'iconContainer' | 'textContainer'>;

