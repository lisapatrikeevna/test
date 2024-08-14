import {CSSProperties} from "../../types/common.ts";

export default {
    sideBarAndMainContainer: {
        display: "flex",
        flexDirection: "row",
    },
    mainContainer: {
        display: "flex",
        flexDirection:"column",
        width: "100%",
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
        bottom:0,
        left:0,
        zIndex:1000
    }

} as CSSProperties<'sideBarAndMainContainer' | 'mainContainer' | 'contentContainer' | 'sideBarContainer'>;