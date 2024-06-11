import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Typography, Grid, IconButton } from "@mui/material";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import NeuCard from "../../components/neumorphism/card/NeuCard";
import NeuCardContent from "../../components/neumorphism/card/NeuCardContent";
import NeuCardHeader from "../../components/neumorphism/card/NeuCardHeader";
import useOnScreen from "../../components/hooks/useOnScreen";
import { cardsData } from '../../configs/DonateConfig';


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

    return (
        <Container sx={{ padding: "1vw 0px 1vw",display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} ref={containerRef}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2, flexDirection: 'column' }}>
                 <Typography variant="h4" sx={{ paddingBottom: "20px"}}>
                    Donates
                </Typography>
            </Box>
            <Box sx={{paddingLeft: '0.5vw'}}>
                {/*<Typography variant="h4" sx={{ paddingTop: '1.2vw', paddingBottom: "1vw" }}>*/}
                {/*    Dear users, thank you for your support of the project and our team, if you want to donate, you can use any convenient way. We are very grateful to you. Also for consideration of investment and participation in the project, you can get in touch with us at any convenient contact for you. Thank you.*/}
                {/*</Typography>*/}
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
                                alignItems: 'start'
                            }}
                        >
                            <NeuCardHeader
                                title={
                                    card.titleImage ?
                                        <img src={card.titleImage} alt={card.title} style={{ width: '100px', height: 'auto' }} /> :
                                        card.title
                                }
                                sx={{ pb: 0, mt: 1 }}
                            />
                            <NeuCardContent sx={{ justifyContent: 'start', alignItems: 'start', flexDirection: 'column', display: 'flex' }}>
                                {card.cardType && (
                                    <Box>
                                        {card.cardTypeImage ? (
                                            <img src={card.cardTypeImage} alt={card.cardType} style={{ width: '50px', height: 'auto' }} />
                                        ) : (
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ marginBottom: "16px" }}
                                            >
                                                {card.cardType}
                                            </Typography>
                                        )}
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
                                            <a href={card.link} target="_blank" rel="noopener noreferrer"
                                               style={{fontSize: '150%'}}>
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
           <Box sx={{paddingLeft: '0.5vw'}}>
            <Typography variant="h4" sx={{ paddingTop: '1.2vw', paddingBottom: "1vw" }}>
                Dear users, thank you for your support of the project and our team, if you want to donate, you can use any convenient way. We are very grateful to you. Also for consideration of investment and participation in the project, you can get in touch with us at any convenient contact for you. Thank you.
            </Typography>
            </Box>
        </Container>
    );
};

export default Donate;
