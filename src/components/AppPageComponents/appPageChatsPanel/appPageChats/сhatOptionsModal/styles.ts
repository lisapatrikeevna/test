import { CSSProperties } from "../../../../../types/common.ts";

export default {
    modalContainer: {
        position: "absolute",
        padding: "15px",
        borderRadius: "3px",
        background: "#e0e0e0",
    },
    iconStack: {
        cursor: "pointer",
    },
} as CSSProperties<'modalContainer' | 'iconStack'>;
