import React, {ReactNode} from 'react';
import {Box, Button, Typography} from "@mui/material";
import styles from "./styles.ts";

export interface PricingCardProps {
    title?: string;
    icon?: ReactNode,
    price_M?: number;
    features?: string[];
    button?: string;
    onButtonClick?: () => void;
}

export const PricingCard = ({title, icon, price_M,  features, button}: PricingCardProps) => {
    return <Box sx={styles.pricingBox}>
        <Typography variant={'h3'}>{title}</Typography>
        <Box>{icon}</Box>
        <Typography variant={'h3'}>{price_M}</Typography>
        {features?.map((feature ) => (
            <Typography variant={'body1'} textAlign={'start'}>{feature}</Typography>
        ))}
        <Button>{button}</Button>
    </Box>
}