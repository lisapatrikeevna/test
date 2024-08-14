import {CSSProperties} from "../../../../../../types/common.ts";
import {useTheme} from "@mui/material";

export default {
    container: ()=> {
        return {
            borderRadius: '12px',
            display: 'flex',
            width: '100%',
            height: '100%',
            // eslint-disable-next-line react-hooks/rules-of-hooks
            padding: useTheme().spacing(2),
            flexDirection: 'column',
            // eslint-disable-next-line react-hooks/rules-of-hooks
            backgroundColor: useTheme().palette?.background?.paper,
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

