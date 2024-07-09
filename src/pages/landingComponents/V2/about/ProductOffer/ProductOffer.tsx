import {Box, Step, StepButton, Stepper, Container} from "@mui/material";
import React from "react";
import {ProductOfferCard} from "./ProductOfferCard/ProductOfferCard.tsx";
import {OFFER_ITEMS} from "./constants.tsx";
// import styles from "./styles.ts";

export const ProductOffer = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    // const totalSteps = () => OFFER_ITEMS.length;
    //
    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };
    //
    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    return <Container>
        <Stepper nonLinear activeStep={activeStep}>
        {OFFER_ITEMS.map((item, index) => (
            <Step key={item.label}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                    {item.label}
                </StepButton>
            </Step>
        ))}
    </Stepper>
        {OFFER_ITEMS.map((item, index) => (
            <Box key={index}>
                {activeStep === index && (
                    <ProductOfferCard {...item}/>
                )}
            </Box>
        ))}
    </Container>
}

// <ProductOfferCard key={index} {...item}/>