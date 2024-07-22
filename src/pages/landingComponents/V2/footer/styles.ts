import { CSSProperties } from "../../../../types/common.ts";

export default {
    expandedFooter: {
        position: "fixed",
        bottom: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: '#FFF',
        zIndex: 1,
        height: '30vh', // или '40vh', в зависимости от предпочтений
        transition: 'height 0.3s ease-in-out',
    },
    collapsedFooter: {
        position: "fixed",
        bottom: 0,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        background: '#FFF',
        zIndex: 1,
        height: '5vh', // или '3vh', в зависимости от предпочтений
        transition: 'height 0.3s ease-in-out',
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: '20px 0',
    }
} as CSSProperties<'expandedFooter' | 'collapsedFooter' | 'container'>;
