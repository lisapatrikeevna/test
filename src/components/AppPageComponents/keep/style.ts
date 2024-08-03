import {CSSProperties} from "../../../types/common.ts";


export default {
   containerBox: {
      display: "flex",
      borderRadius: "16px",
      width: "1293px",
      background: "#F8F8FE",
      // border: "0.2px solid #8683B4",
   },
   centredBox: {
      padding: "15px 25px",
   },
   paper: {
      backgroundColor: "white",
      padding: "10px 20px",
      maxWidth: "572px",
      width: "auto",
      height: "max-content",
      minHeight: "32px",
      borderRadius: "8px",
      // border: "0.2px solid #8683B4",
      boxShadow: "0px 1px 6px rgba(54, 52, 69, 0.1)",
   },
   invitationBox: {
      borderBottom: "2px solid #EADDFF",
   },
   closedBox: {
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between",
      color:"#000",
      h3: {
         fontFamily: 'Roboto',
         fontStyle: "normal",
         fontWeight: "500",
         fontSize: "11px",
         letterSpacing: "0.5px",
         width:"90%",
         lineHeight:"38px"
      }
   },
   boxHeading: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      /*borderBottom: "1px solid #EADDFF",*/
   },
   boxHeadingBtn: {
      width: "100px",
      justifyContent: "space-between",
      alignItems: "center",
      display: "flex",
   },
   "css-oy01l3-MuiInputBase-root-MuiInput-root::before": {
      borderBottom: "none",
   },
   wrapInput: {
      width: "100%",
      borderBottom: "1px solid #EADDFF",
   },
   // shotMoreBoxList: {},
   // longMoreBoxList: {},
} as CSSProperties<'containerBox' | 'centredBox' | 'paper' |'closedBox'| 'boxHeading' | 'boxHeadingBtn' | 'invitationBox' | 'wrapInput'>;