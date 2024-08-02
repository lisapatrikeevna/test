import { CSSProperties } from "../../../types/common";

export default {
   containerBox: {
      border: "2px solid red",
      display: "flex",
   },
   centredBox: {},
   paper: {
      backgroundColor: "white",
      padding: "10px 0",
      maxWidth: "572px",
      width: "auto",
      height: "max-content",
   },
   invitationBox: {
      borderBottom: "2px solid #EADDFF",
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
      /*backgroundColor: "red",*/
      width: "100%",
      borderBottom: "1px solid #EADDFF",
   },
   shotMoreBoxList: {},
   longMoreBoxList: {},
} as CSSProperties<any>;