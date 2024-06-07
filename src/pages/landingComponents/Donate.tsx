import React from "react";
import { Box, Container, Typography, Grid, IconButton } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';

import NeuCard from "../../components/neumorphism/card/NeuCard";
import NeuCardContent from "../../components/neumorphism/card/NeuCardContent";
import NeuCardHeader from "../../components/neumorphism/card/NeuCardHeader";


interface DonatesItem {
    title: string;
    content: string;
}

const donates: DonatesItem[] = [
    {
        title: "Sparkasse",
        content:
            `Mastercard\nBIC: COKSDE33XXX\nIBAN: DE46370502991329072051`
    },
    {
        title: "Revolut",
        content: "Visa\nBIC: PBNKDEFF\nIBAN: DE25100100100754785135",
    },
    {
        title: "Paypal",
        content: "incomgrp@outlook.com",
    },
    {
        title: "Binance",
        content: " incomgrp@outlook.com",
    },
    {
        title: "Terminal",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },

];

const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
};

const Donate: React.FC = () => {


    return (
        <Container sx={{ padding: "20px" }}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Typography variant="h4" sx={{ paddingBottom: "20px" }}>
                    Donates
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {donates.map((item, index) => (
                    <Grid key={index} xs={6} md={4}>
                        <NeuCard
                            elevation={3}
                            rounded
                            sx={{
                                padding: "0",
                                margin: "16px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: 'start'
                            }}
                        >
                            <NeuCardHeader title={item.title} sx={{ pb: 0, mt: 1,  }}/>
                            <NeuCardContent>
                                <Box sx={{}}>
                                    {item.content.split('\n').map((line, index) => (
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography
                                                key={index}
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ flexGrow: 1, marginBottom: "16px" }}
                                            >
                                                {line}
                                            </Typography>
                                            
                                            <IconButton onClick={() => copyToClipboard(line)}>
                                                <FileCopyIcon />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Box>
                            </NeuCardContent>
                        </NeuCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Donate;
