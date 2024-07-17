import React, { ReactNode } from 'react';
import { Box, Button, Typography } from "@mui/material";
import styles from "./styles.ts";

export interface PricingCardProps {
    title?: string;
    icon?: ReactNode;
    price_M?: number;
    features?: string[];
    button?: string;
    onButtonClick?: () => void;
}

export const PricingCard = ({ title, icon, price_M, features, button }: PricingCardProps) => {
    return (
        <Box sx={{ ...styles.pricingBox, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
            <Box>
                {title && <Typography variant={'h3'}>{title}</Typography>}
                {icon && <Box>{icon}</Box>}
                {price_M && <Typography variant={'h3'}>{price_M}</Typography>}
                {features?.map((feature, index) => (
                    <Typography key={index} variant={'body1'} textAlign={'start'}>{feature}</Typography>
                ))}
            </Box>
            {button && <Button>{button}</Button>}
        </Box>
    );
};
