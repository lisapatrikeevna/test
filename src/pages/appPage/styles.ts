import {CSSProperties} from "../../types/common.ts";

export default {
    mainContainer: {
        display: "flex",
        flexDirection:"column"
    },
    contentContainer: {
        display: "flex",
        position: "relative",
        overflow: "auto",
        height: "calc(100vh - 60px)",
        marginTop: "60px"
    },
    sideBarContainer:{
        position:"fixed",
        top:"60px",
        bottom:0,
        left:0,
        zIndex:1000

    }

} as CSSProperties<'mainContainer' | 'contentContainer' | 'sideBarContainer'>;