// import {Container} from "../components/Container/Container.tsx";
import {SECTION_PADDING_TOP_PX} from "../constants.ts";
import {Tools} from "./Tools/Tools.tsx";
import {GeneralInfo} from "./GeneralInfo/GeneralInfo.tsx";
import {ProductOffer} from "./ProductOffer/ProductOffer.tsx";
// import {Pricing} from "./Pricing/Pricing.tsx";
import { Container } from "@mui/material";

export const About = () => {
    return <Container /*maxWidth={'xl'}*/ sx={{paddingTop: SECTION_PADDING_TOP_PX, justifyContent: 'center', width:'100vw'}} id={'About'}>
        <GeneralInfo/>
        <Tools/>
        <ProductOffer/>
        {/*<Pricing/>*/}
    </Container>
}