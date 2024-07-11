import React, {useState} from 'react';
import {Container, FormControlLabel, Grid, Switch, Toolbar, Typography} from "@mui/material";
import styles from "./styles.ts";
import {PricingCard} from "./PricingCard/PricingCard.tsx";

export const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);

    const toggleYearly = () => {
        setIsYearly(!isYearly);
    };

    // const calculatePrice = (price: number) => {
    //     if (isYearly) {
    //         const yearlyPrice = price * 12 * 0.8;
    //         return (Math.floor(yearlyPrice) + 0.99).toFixed(2);
    //     }
    //     return price.toFixed(2);
    // };
    //
    // const calculateOldPrice = (price: number) => {
    //     if (isYearly) {
    //         const yearlyOldPrice = price * 12;
    //         return (Math.floor(yearlyOldPrice) + 0.99).toFixed(2);
    //     }
    //     return price.toFixed(2);
    // };

    return <Container sx={styles.container}>
        <Toolbar sx={{ flexWrap: 'wrap' }}>
            <Typography variant="h4" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                Select a payment period:
            </Typography>
            <FormControlLabel
                control={<Switch checked={isYearly} onChange={toggleYearly} />}
                label={isYearly ? 'Yearly' : 'Monthly'}
                sx={{ my: 1, mx: 1.5 }}
            />
        </Toolbar>

        <Typography variant="h5" align="center" color="text.secondary" component="p" mt={'20px'}>
            Limits on gigabytes and chats are set until the end of beta testing. We also welcome your suggestions for changes or additions
        </Typography>
        <PricingCard title={"Basic"}/>

        <Grid container spacing={2} alignItems="stretch" justifyContent='center' marginY='2vh'>
            <Grid item xs={12} sm={6} md={3}>
                <PricingCard title={"Basic"}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <PricingCard title={"Basic"}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <PricingCard title={"Basic"}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <PricingCard title={"Basic"}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <PricingCard title={"Basic"}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <PricingCard title={"Basic"}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <PricingCard title={"Basic"}/>
            </Grid>


        </Grid>
    </Container>
}