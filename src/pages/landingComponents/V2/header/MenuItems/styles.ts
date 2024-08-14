import { CSSProperties } from "../../../../../types/common";

export default {
    container: {
        display:"flex",
        gap: '32px',
    },
    link: ({palette})=> {
        return {
            color: palette.common.black
        }
    }
} as CSSProperties<'container' | 'link'>;

