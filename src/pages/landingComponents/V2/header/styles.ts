import {CSSProperties} from "../../../../types/common.ts";

export default {
    mainWrapper: ()=> {
        return {
            position: "fixed",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            background: '#FFF',
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

