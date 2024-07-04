import {CSSProperties} from "../../../types/common.ts";

export default {
    buttonsContainer: {
        position: 'absolute',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
    },
    optionsButtonContainer:{
        width: '300px'
    }

} as CSSProperties<'buttonsContainer' | 'optionsButtonContainer'>;