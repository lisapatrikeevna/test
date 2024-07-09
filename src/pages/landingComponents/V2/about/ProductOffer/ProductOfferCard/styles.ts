import {CSSProperties} from "../../../../../../types/common.ts";

export default {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 10,
    },
    iconContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 10
    },
    textContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // flex: 5,
        fontWeight: 500,
        textAlign: 'start',
        flexDirection: 'column',
    },
    typographyText: {
        fontFamily: 'Inter',
        fontSize: '16px',
        fontWeight: 500,
        lineHeight: '19.36px',
        textAlign: 'left',
    }
} as CSSProperties<'container' | 'iconContainer' | 'textContainer' | 'typographyText'>;