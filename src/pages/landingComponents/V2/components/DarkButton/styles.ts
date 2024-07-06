import {CSSProperties} from "../../../../../types/common.ts";

export default {
    button: ({palette, typography})=> {
        const mainStyles =  {
            color: palette.primary.contrastText,
            borderColor: palette.common.black,
            backgroundColor: palette.common.black,
        }
        return {
            paddingX: '32px',
            borderRadius: '20px',
            ...mainStyles,
            '&:hover': {
                ...mainStyles
            },
            ...typography.h6,
            textTransform: 'none',
        }
    }
} as CSSProperties<'button'>;

