import {CSSProperties} from "../../../../../types/common.ts";

export default {
    container: {
        marginBottom: '100px'
    },
    descriptionSection: {
        paddingRight: '36px'
    },
    videoSection: {
        position:'relative',
        '& iframe': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '10px'
        }
    }
} as CSSProperties<'container'|'descriptionSection' | 'videoSection'>;