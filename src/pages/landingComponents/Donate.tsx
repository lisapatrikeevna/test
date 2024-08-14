import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Typography, Grid, IconButton } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import NeuCard from "../../components/neumorphism/card/NeuCard";
import NeuCardContent from "../../components/neumorphism/card/NeuCardContent";
import NeuCardHeader from "../../components/neumorphism/card/NeuCardHeader";
import useOnScreen from "../../components/hooks/useOnScreen";
import { cardsData } from '../../configs/DonateConfig';

const copyToClipboard = (text: string) => {
    // Finding ": " in text
    const colonIndex = text.indexOf(': ');

    // If ": " finded and he is not the last in the string
    if (colonIndex !== -1 && colonIndex !== text.length - 1) {
        // Copy substring, begining from symbol after ": "
        const textToCopy = text.substring(colonIndex + 1);
        navigator.clipboard.writeText(textToCopy);
    } else {
        // If symbol ": " not found or he is the last in the string, then copy whole text
        navigator.clipboard.writeText(text);
    }
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

    return (
        <Container id='Donate' sx={{  display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} ref={containerRef}>
            <Box sx={{ paddingLeft: '1vw' }}>
                <Typography variant="h4" sx={{ paddingTop: '1.2vw', paddingBottom: "1.2vw" }}>
                    Dear users, thank you for your support of the project and our team, if you want to donate, you can use any convenient way. We are very grateful to you. Also for consideration of investment and participation in the project, you can get in touch with us at any convenient contact for you. Thank you.
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {cardsData.map((card, index) => (
                    <Grid item key={index} xs={6} md={4}>
                        <NeuCard
                            in={visibleCards.includes(index)} // Giving state of visibility
                            elevation={3}
                            rounded
                            sx={{
                                padding: "0",
                                margin: "16px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: 'start',
                            }}
                        >
                            <NeuCardHeader
                                title={
                                    <Box sx={{ display: 'flex', alignItems: 'center', height: '30px' }}>
                                        {card.titleImage ? (
                                            <img src={card.titleImage} alt={card.title} style={{ width: '100px', height: 'auto', maxWidth: '100%' }} />
                                        ) : (
                                            <Typography variant="h6" sx={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {card.title}
                                            </Typography>
                                        )}
                                        {card.cardTypeImage && (
                                            <img src={card.cardTypeImage} alt={card.cardType} style={{ width: '50px', height: 'auto', maxWidth: '100%', marginLeft: '10px' }} />
                                        )}
                                    </Box>
                                }
                                sx={{ pb: 0, mt: 1, width: '100%' }}
                            />
                            <NeuCardContent sx={{ justifyContent: 'start', alignItems: 'start', flexDirection: 'column', display: 'flex' }}>
                                {card.bic && (
                                    <Box sx={{ display: 'flex',  flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            sx={{ flexGrow: 1}}
                                        >
                                            {card.bic}
                                        </Typography>
                                        <IconButton
                                            sx={{
                                                fontSize: "inherit",
                                                padding: 0,
                                                marginLeft: '10px'
                                            }}
                                            onClick={() => copyToClipboard(card.bic)}
                                        >
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </Box>
                                )}
                                {card.iban && (
                                    <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '16px' }}>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            sx={{ flexGrow: 1 }}
                                        >
                                            {card.iban}
                                        </Typography>
                                        <IconButton
                                            sx={{
                                                fontSize: "inherit",
                                                padding: 0,
                                                marginLeft: '10px'
                                            }}
                                            onClick={() => copyToClipboard(card.iban)}
                                        >
                                            <ContentCopyIcon />
                                        </IconButton>
                                    </Box>
                                )}
                                {card.email && (
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            sx={{ flexGrow: 1}}
                                        >
                                            {card.email}
                                        </Typography>
                                        <IconButton
                                            sx={{
                                                fontSize: "inherit",
                                                padding: 0,
                                                marginLeft: '10px'
                                            }}
                                            onClick={() => copyToClipboard(card.email)}
                                        >
                                            <ContentCopyIcon />
                                        </IconButton>
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
