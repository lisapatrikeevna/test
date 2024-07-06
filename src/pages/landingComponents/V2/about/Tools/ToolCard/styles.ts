import {CSSProperties} from "../../../../../../types/common.ts";
import {Theme} from "@mui/material/styles";
import {ToolCardSize} from "../types.ts";

export default {
    container: ({size, theme}: {size: ToolCardSize, theme: Theme})=> {
        return {
            borderRadius: '12px',
            padding: size === ToolCardSize.Small ? '12px' : '12px 120px',
            height: '260px',
            width: size === ToolCardSize.Small ? '235px' : '490px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme?.palette?.background?.paper,
        }
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 10
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        fontWeight: 500,
        textAlign: 'center'
    }
} as CSSProperties<'container' | 'iconContainer' | 'textContainer'>;

