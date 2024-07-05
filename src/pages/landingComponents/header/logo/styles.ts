import {CSSProperties} from "../../../../types/common.ts";

export default {
    titleContainer: {
        mt: '5px'}
    ,
    boldTitle:{
        cursor: 'pointer',
        fontWeight: '550',
        marginBottom: 0,
        lineHeight: 1
    },
    title:{
        cursor: 'pointer',
        fontWeight: '500',
        marginTop: 0,
        lineHeight: 1,
        letterSpacing: 6
    }

} as CSSProperties <'titleContainer'| 'title'>;

export const logoImg= {
    width: 70,
    height: 70,
    cursor: 'pointer'
}

export const mainContainer = { display: { xs: 'none', md: 'flex', lg: 'flex', xl: 'flex',
                                                        '@media (max-width: 1280px)': { display: 'none' }, alignItems: 'center', gap: '10px'}}