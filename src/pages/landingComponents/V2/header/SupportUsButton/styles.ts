import {CSSProperties} from "../../../../../types/common.ts";

export default {
    button: ({palette, typography})=> {
        return {
            color: palette.common.black,
            borderColor: palette.common.black,
            borderRadius: '20px',
            '&:hover': {
                borderColor: palette.common.black,
            },
            ...typography.h6,
            textTransform: 'none',
            marginRight: '32px'
        }
    }
} as CSSProperties<'button'>;

