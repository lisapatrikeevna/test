import React, {ReactNode} from 'react';
import {Box, Typography} from "@mui/material";
import styles from "./styles.ts";

export interface PricingCardProps {
    title?: string;
    icon?: ReactNode,
    price_M?: string;
    price_Y?: string;
    features?: string[];
    button?: string;
    onClick?: () => void;
}

export const PricingCard = ({title, icon, price_M, price_Y, features, button}: PricingCardProps) => {
    return <Box sx={styles.pricingBox}>
        <Typography variant={'h1'}>{title}</Typography>
        <Box>{icon}</Box>
        <Typography variant={'h2'}>{price_M}</Typography>
        <Typography variant={'h2'}>{price_Y}</Typography>
        {features?.map((feature ) => (
            <Typography variant={'h3'}>{feature}</Typography>
        ))}
        <Typography variant={'h4'}>{button}</Typography>
    </Box>
}