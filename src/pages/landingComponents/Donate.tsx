import React from "react";
import { Box, Container, Typography, Grid, IconButton } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';

import NeuCard from "../../components/neumorphism/card/NeuCard";
import NeuCardContent from "../../components/neumorphism/card/NeuCardContent";
import NeuCardHeader from "../../components/neumorphism/card/NeuCardHeader";

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

                <Grid xs={6} md={4}>
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
                        <NeuCardHeader title="Sparkasse" sx={{ pb: 0, mt: 1 }} />
                        <NeuCardContent sx={{justifyContent: 'start', alignItems: 'start', flexDirection: 'column', display: 'flex'}}>
                            <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{  marginBottom: "16px" }}
                            >
                                Mastercard
                            </Typography>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ flexGrow: 1, marginBottom: "16px" }}
                            >
                                BIC: COKSDE33XXX
                            </Typography>

                            <IconButton onClick={() => copyToClipboard("BIC: COKSDE33XXX")}>
                                <FileCopyIcon />
                            </IconButton>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ flexGrow: 1, marginBottom: "16px" }}
                            >
                                IBAN: DE46370502991329072051
                            </Typography>
                            <IconButton onClick={() => copyToClipboard("IBAN: DE46370502991329072051")}>
                                <FileCopyIcon />
                            </IconButton>
                            </Box>
                        </NeuCardContent>
                    </NeuCard>
                </Grid>

                <Grid xs={6} md={4}>
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
                        <NeuCardHeader title="PostBank" sx={{ pb: 0, mt: 1 }} />
                        <NeuCardContent sx={{justifyContent: 'start', alignItems: 'start', flexDirection: 'column', display: 'flex'}}>
                            <Box>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{  marginBottom: "16px" }}
                                >
                                    Maestro
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ flexGrow: 1, marginBottom: "16px" }}
                                >
                                    BIC: PBNKDEFF
                                </Typography>

                                <IconButton onClick={() => copyToClipboard("BIC: PBNKDEFF")}>
                                    <FileCopyIcon />
                                </IconButton>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ flexGrow: 1, marginBottom: "16px" }}
                                >
                                    IBAN: LT843250050964665543
                                </Typography>
                                <IconButton onClick={() => copyToClipboard("IBAN: LT843250050964665543")}>
                                    <FileCopyIcon />
                                </IconButton>
                            </Box>
                        </NeuCardContent>
                    </NeuCard>
                </Grid>

                <Grid xs={6} md={4}>
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
                        <NeuCardHeader title="Revolut" sx={{ pb: 0, mt: 1 }} />
                        <NeuCardContent sx={{justifyContent: 'start', alignItems: 'start', flexDirection: 'column', display: 'flex'}}>
                            <Box>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{  marginBottom: "16px" }}
                                >
                                    Visa
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ flexGrow: 1, marginBottom: "16px" }}
                                >
                                    BIC: REVOLT21
                                </Typography>

                                <IconButton onClick={() => copyToClipboard("BIC: REVOLT21")}>
                                    <FileCopyIcon />
                                </IconButton>
                            </Box>
                            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ flexGrow: 1, marginBottom: "16px" }}
                                >
                                    IBAN: LT843250050964665543
                                </Typography>
                                <IconButton onClick={() => copyToClipboard("IBAN: LT843250050964665543")}>
                                    <FileCopyIcon />
                                </IconButton>
                            </Box>
                        </NeuCardContent>
                    </NeuCard>
                </Grid>

                <Grid xs={6} md={4}>
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
                        <NeuCardHeader title="Paypal" sx={{ pb: 0, mt: 1 }} />
                        <NeuCardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ flexGrow: 1, marginBottom: "16px" }}
                                >
                                    incomgrp@outlook.com
                                </Typography>
                                <IconButton onClick={() => copyToClipboard("incomgrp@outlook.com")}>
                                    <FileCopyIcon />
                                </IconButton>
                            </Box>
                        </NeuCardContent>
                    </NeuCard>
                </Grid>

                <Grid xs={6} md={4}>
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
                        <NeuCardHeader title="Binance" sx={{ pb: 0, mt: 1 }} />
                        <NeuCardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ flexGrow: 1, marginBottom: "16px" }}
                                >
                                    incomgrp@outlook.com
                                </Typography>
                                <IconButton onClick={() => copyToClipboard("incomgrp@outlook.com")}>
                                    <FileCopyIcon />
                                </IconButton>
                            </Box>
                        </NeuCardContent>
                    </NeuCard>
                </Grid>

                <Grid xs={6} md={4}>
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
                        <NeuCardHeader title="Donate 4.99" sx={{ pb: 0, mt: 1 }} />
                        <NeuCardContent>
                            <Box sx={{}}>
                                <span>
                                    <a href="https://checkout.revolut.com/payment-link/a8d90880-6d89-46d8-96f0-a1d71e6e4fcb" target="_blank"
                                       rel="noopener noreferrer">
                                        Click here
                                    </a>
                                </span>
                            </Box>
                        </NeuCardContent>
                    </NeuCard>
                </Grid>

            </Grid>
        </Container>
    );
};

export default Donate;
