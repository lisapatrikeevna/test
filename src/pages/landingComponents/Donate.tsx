import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Typography, Grid, IconButton } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { useSpring, animated } from 'react-spring';

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
        let timer: number;

        if (isVisible && visibleCards.length < 6) { // Убедитесь, что здесь указано правильное количество карточек
            timer = window.setTimeout(() => {
                setVisibleCards((prev) => [...prev, prev.length]);
            }, 150);
        } else if (!isVisible) {
            setVisibleCards([]);
        }

        return () => clearTimeout(timer);
    }, [isVisible, visibleCards.length]); // Убедитесь, что зависимости указаны корректно

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
            title: "Donate",
            link: "https://checkout.revolut.com/payment-link/a8d90880-6d89-46d8-96f0-a1d71e6e4fcb"
        }
    ];

    const animationProps = useSpring({
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0)',
        config: { tension: 170, friction: 26 },
    });

    return (
        <Container sx={{ padding: "20px 0px 20px",display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} ref={containerRef}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2, flexDirection: 'column' }}>
                <Typography variant="h4" sx={{ paddingBottom: "20px"}}>
                    Donates
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {cardsData.map((card, index) => (
                    <Grid item key={index} xs={6} md={4}>
                        <animated.div style={visibleCards.includes(index) ? animationProps : { opacity: 0, transform: 'scale(0)' }}>
                            <NeuCard
                                in={visibleCards.includes(index)}
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
                        </animated.div>
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h4" sx={{ paddingTop: '25px', paddingBottom: "20px" }}>
                Dear users, thank you for your support of the project and our team, if you want to donate, you can use any convenient way. We are very grateful to you. Also for consideration of investment and participation in the project, you can get in touch with us at any convenient contact for you. Thank you.
            </Typography>
        </Container>
    );
};

export default Donate;
