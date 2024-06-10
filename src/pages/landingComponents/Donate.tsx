import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Typography, Grid, IconButton } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import NeuCard from "../../components/neumorphism/card/NeuCard";
import NeuCardContent from "../../components/neumorphism/card/NeuCardContent";
import NeuCardHeader from "../../components/neumorphism/card/NeuCardHeader";
import useOnScreen from "../../components/hooks/useOnScreen";

const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
};

const Donate: React.FC = () => {
    const [visibleCards, setVisibleCards] = useState<number[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isVisible = useOnScreen(containerRef);

    useEffect(() => {
        let timer: number | undefined;

        if (isVisible && visibleCards.length < 6) {
            timer = window.setTimeout(() => {
                setVisibleCards((prev) => [...prev, prev.length]);
            }, 150);
        } else if (!isVisible && visibleCards.length !== 0) {
            setVisibleCards([]);
        }

        return () => clearTimeout(timer);
    }, [isVisible, visibleCards.length]);

    const cardsData = [
        {
            title: "Sparkasse",
            cardType: "Mastercard",
            bic: "BIC: COKSDE33XXX",
            iban: "IBAN: DE46370502991329072051"
        },
        {
            title: "PostBank",
            cardType: "Maestro",
            bic: "BIC: PBNKDEFF",
            iban: "IBAN: LT843250050964665543"
        },
        {
            title: "Revolut",
            cardType: "Visa",
            bic: "BIC: REVOLT21",
            iban: "IBAN: LT843250050964665543"
        },
        {
            title: "Paypal",
            email: "incomgrp@outlook.com"
        },
        {
            title: "Binance",
            email: "incomgrp@outlook.com"
        },
        {
            title: "Donate 4.99",
            link: "https://checkout.revolut.com/payment-link/a8d90880-6d89-46d8-96f0-a1d71e6e4fcb"
        }
    ];

    return (
        <Container sx={{ padding: "20px" }} ref={containerRef}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Typography variant="h4" sx={{ paddingBottom: "20px" }}>
                    Donates
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {cardsData.map((card, index) => (
                    <Grid item key={index} xs={6} md={4}>
                        <NeuCard
                            in={visibleCards.includes(index)} // Передаем состояние видимости
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
                            <NeuCardHeader title={card.title} sx={{ pb: 0, mt: 1 }} />
                            <NeuCardContent sx={{ justifyContent: 'start', alignItems: 'start', flexDirection: 'column', display: 'flex' }}>
                                {card.cardType && (
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ marginBottom: "16px" }}
                                        >
                                            {card.cardType}
                                        </Typography>
                                    </Box>
                                )}
                                {card.bic && (
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ flexGrow: 1, marginBottom: "16px" }}
                                        >
                                            {card.bic}
                                        </Typography>
                                        <IconButton onClick={() => copyToClipboard(card.bic)}>
                                            <FileCopyIcon />
                                        </IconButton>
                                    </Box>
                                )}
                                {card.iban && (
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ flexGrow: 1, marginBottom: "16px" }}
                                        >
                                            {card.iban}
                                        </Typography>
                                        <IconButton onClick={() => copyToClipboard(card.iban)}>
                                            <FileCopyIcon />
                                        </IconButton>
                                    </Box>
                                )}
                                {card.email && (
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ flexGrow: 1, marginBottom: "16px" }}
                                        >
                                            {card.email}
                                        </Typography>
                                        <IconButton onClick={() => copyToClipboard(card.email)}>
                                            <FileCopyIcon />
                                        </IconButton>
                                    </Box>
                                )}
                                {card.link && (
                                    <Box sx={{}}>
                                        <span>
                                            <a href={card.link} target="_blank" rel="noopener noreferrer">
                                                Click here
                                            </a>
                                        </span>
                                    </Box>
                                )}
                            </NeuCardContent>
                        </NeuCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Donate;
