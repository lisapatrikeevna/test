import {SECTION_PADDING_TOP_PX} from "../constants.ts";
import {Tools} from "./Tools/Tools.tsx";
import {GeneralInfo} from "./GeneralInfo/GeneralInfo.tsx";
import {ProductOffer} from "./ProductOffer/ProductOffer.tsx";
import {Pricing} from "./Pricing/Pricing.tsx";
import {Container} from "@mui/material";
import {Partners} from './Partners/Partners.tsx';
import {SupportUs} from "./SupportUs/SupportUs.tsx";
import {ContactForm} from "./ContactForm/ContactForm.tsx";
import React from "react";

export const About = () => {
    return <Container /*maxWidth={'xl'}*/ sx={{paddingTop: SECTION_PADDING_TOP_PX, justifyContent: 'center', width:'100vw'}} id={'About'}>
        <GeneralInfo/>
        <Tools/>
        <ProductOffer/>
        <Pricing/>
        <Partners/>
        <SupportUs/>
        <ContactForm/>
    </Container>
}