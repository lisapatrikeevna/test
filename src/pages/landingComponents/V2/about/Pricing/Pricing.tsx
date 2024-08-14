import React, { useState } from 'react';
import { Container, FormControlLabel, Grid, Switch, Toolbar, Typography } from "@mui/material";
import styles from "./styles.ts";
import { PricingCard, PricingCardProps } from "./PricingCard/PricingCard.tsx";
import { PRICING_ITEMS } from "./constants.tsx";

export const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);

    const toggleYearly = () => {
        setIsYearly(!isYearly);
    };

    return (
        <Container sx={styles.container}>
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

            <Grid container spacing={2} alignItems="stretch" justifyContent="center" marginY="2vh">
                {PRICING_ITEMS.map((item: PricingCardProps, index: number) => (
                    <Grid
                        key={index} // Используем индекс в качестве ключа для простоты
                        item
                        xs={12}
                        sm={item.icon ? 12 : 6}
                        md={item.icon ? 6 : 3}
                        sx={{ display: 'flex' }}
                    >
                        <PricingCard
                            title={item.title}
                            price_M={item.price_M}
                            features={item.features}
                            button={item.button}
                            onButtonClick={item.onButtonClick}
                            icon={item.icon}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
