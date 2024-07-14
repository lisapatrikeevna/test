import React from 'react';
import {Box, Container, Grid, Typography, useTheme} from "@mui/material";
import {SupportUsCard} from "./SupportUsCard/SupportUsCard.tsx";
import {SUPPORT_US_ITEMS} from "./Constants.tsx";

export const SupportUs = () => {
    return (
        <Container>

            <Typography variant={'h3'}>
                Support us:
            </Typography>
            <Typography variant={'body2'}>
                Dear users, our team thanks you for your continuous support of the project.
                You can support our work in various ways -
                check below whichever is more convenient to you.
            </Typography>
            <Box display={'flex'} flexDirection={'row'}>
                <Typography variant={'body2'} sx={{color: useTheme().palette.secondary.main}}>
                    Donate what you’d like
                </Typography>
                {/* eslint-disable-next-line no-irregular-whitespace */}
                <Typography variant={'body2'}> using the banking details you see below</Typography>
            </Box>
            <Grid container spacing={4} marginY={useTheme().spacing(4)}>
                {SUPPORT_US_ITEMS.map((item) => (
                    <Grid item xs={12} md={6}>
                        <SupportUsCard {...item} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}