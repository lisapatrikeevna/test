import {CSSProperties} from "../../../../types/common.ts";

export default {
    mainWrapper: ({palette})=> {
        console.log('palette', palette)
        return {
            position: "fixed",
            background: palette.primary.contrastText,
            zIndex: 1,
        }
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: '20px 0'
    }
} as CSSProperties<'mainWrapper' | 'container'>;

