import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import NeuCard from "../../components/neumorphism/card/NeuCard";
import NeuCardContent from "../../components/neumorphism/card/NeuCardContent";
import NeuCardHeader from "../../components/neumorphism/card/NeuCardHeader";
import NeuButton from "../../components/neumorphism/button/NeuButton";
import useOnScreen from "../../components/hooks/useOnScreen.ts";
import { news } from '../../configs/newsConfig';

interface NewsProps {
    onReadMoreClick: (id: string) => void;
}

const News: React.FC<NewsProps> = ({ onReadMoreClick }) => {
    const [visibleCards, setVisibleCards] = useState<number[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isVisible = useOnScreen(containerRef);

    useEffect(() => {
        let timer: number | undefined;

        if (isVisible && visibleCards.length < news.length) {
            timer = window.setTimeout(() => {
                setVisibleCards((prev) => [...prev, prev.length]);
            }, 150);
        } else if (!isVisible && visibleCards.length !== 0) {
            setVisibleCards([]);
        }

        return () => clearTimeout(timer);
    }, [isVisible, visibleCards.length]);

    return (
        <Container ref={containerRef}>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                {/* <Typography variant="h4" sx={{ paddingBottom: "1.2vw" }}>
                  News
                </Typography> */}
            </Box>
            <Grid container spacing={2}>
                {news.map((item, index) => (
                    <Grid item key={index} xs={6} md={4}>
                        <NeuCard
                            in={visibleCards.includes(index)}
                            elevation={3}
                            rounded
                            sx={{
                                padding: "0",
                                margin: "0.8vw",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: 'start'
                            }}
                        >
                            <NeuCardHeader title={<Typography variant="h4">{item.title}</Typography>} sx={{ pb: 0}} />
                            <NeuCardContent>
                                <Box>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ flexGrow: 1, marginBottom: '10px'}}
                                    >
                                        {item.content}
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <NeuButton
                                            onClick={() => onReadMoreClick(item.id)}
                                            rounded
                                        >
                                            Read more
                                        </NeuButton>
                                    </Box>
                                </Box>
                            </NeuCardContent>
                        </NeuCard>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default News;
