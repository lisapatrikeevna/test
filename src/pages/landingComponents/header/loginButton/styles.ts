import {CSSProperties} from "../../../../types/common.ts";

export default {
    loginButton: {
        padding: '10px',
        width: '130px',
        '@media (max-width: 1115px)': {
            width: '90px'
        }
    }
} as CSSProperties<'loginButton'>;
