import {CSSProperties} from "../../../../types/common.ts";

export default {
  mainContainer: {
      width: "100%",
      borderRadius: "5px",
      height: "100%",
  },
    chatContainer:{
        flexGrow: 1,
        position: "relative",
        padding:1,
        width:"100%"
    },
    divider:{
        color: "black"
    },
    headerMessageContainer:{
        flexGrow: 1
    }

} as CSSProperties <'mainContainer' | 'divider' | 'headerMessageContainer' | 'chatContainer'>;