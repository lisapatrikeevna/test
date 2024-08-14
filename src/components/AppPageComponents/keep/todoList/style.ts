import {CSSProperties} from "../../../../types/common.ts";

export default {
   container:{
      position:"relative",
      p: {
         fontFamily: 'Roboto',
         fontStyle: 'normal',
         fontWeight: '500',
         fontSize: '11px',
         lineHeight: '16px',
         letterSpacing: '0.5px',
         color: '#333333'
      },
      h4: {
         fontFamily: 'Roboto',
         fontStyle: 'normal',
         fontWeight: '500',
         fontSize: '11px',
         lineHeight: '16px',
         letterSpacing: '0.5px',
         color: '#333333'
      },
   },
   todoTitleContainer:{
      display: 'flex',
      justifyContent: 'space-between',
   },
   btnPinned:{
      position:"absolute",
      top:"20px",
      right: "-5px",
   },
   ul:{

   },


}as CSSProperties<'ul'|'btnPinned'|'container'|'todoTitleContainer' >