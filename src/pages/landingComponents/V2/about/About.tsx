import {Container} from "../components/Container/Container.tsx";
import {SECTION_PADDING_TOP_PX} from "../constants.ts";
import {Tools} from "./Tools/Tools.tsx";
import {GeneralInfo} from "./GeneralInfo/GeneralInfo.tsx";

export const About = () => {
    return <Container sx={{paddingTop: SECTION_PADDING_TOP_PX}} id={'About'}>
        <GeneralInfo/>
        <Tools/>
    </Container>
}