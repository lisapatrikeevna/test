import {CSSProperties} from "../../../../types/common.ts";

export default {
   mainContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      width: "272px",
      padding: "15px 0",
   },
   btn: {
      width: "100%",
      height: "32px",
      borderRadius: "0px 20px 20px 0px",
      textTransform: "capitalize",
      color: "#000",
      justifyContent: 'flex-start',
      fontFamily: 'Roboto',
      fontWeight: '500',
      fontSize: '11px',
      letterSpacing: '0.5px',
   },
} as CSSProperties<'mainContainer' | 'btn'>


