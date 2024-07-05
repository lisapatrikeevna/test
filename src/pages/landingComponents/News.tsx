import React, { useEffect, useRef } from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Container,
    Typography,
    useTheme
} from "@mui/material";
import { news } from '../../configs/newsConfig';

const News = () => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const theme = useTheme();

    const onReadMoreClick = (id: string) => () => {
        console.log('Read more clicked', id);
    }

    useEffect(() => {
        if (scrollRef.current && containerRef.current) {
            const container = scrollRef.current;
            const handleScroll = () => {
                const children = container.children;
                const screenCenter = window.innerWidth / 2;

                Array.from(children).forEach((child: Element) => {
                    const rect = child.getBoundingClientRect();
                    const childCenter = rect.left + rect.width / 2;
                    const distanceFromCenter = Math.abs(screenCenter - childCenter);
                    const maxDistance = screenCenter;
                    const scale = Math.max(0.6, 0.95 - distanceFromCenter / maxDistance);
                    const opacity = Math.max(0 , 1 - (distanceFromCenter-300) / (maxDistance/1.7));
                    (child as HTMLElement).style.transform = `scale(${scale})`;
                    (child as HTMLElement).style.opacity = `${opacity}`;
                });
            };

            const animationInterval = setInterval(() => {
                if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                    container.scrollLeft = 0;
                } else {
                    container.scrollLeft += 1;
                }
                handleScroll();
            }, 20);

            handleScroll(); // Initialize on mount

            return () => clearInterval(animationInterval);
        }
    }, []);

    return (
        <Container
            id='News'
            maxWidth={false}
            sx={{
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            }}
            ref={containerRef}>
            <Box
                ref={scrollRef}
                sx={{
                    display: 'flex',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    willChange: 'transform',
                }}
            >
                {[...news, ...news, ...news].map((item, index) => (

                    <Box
                        key={index}
                        sx={{
                            display: 'inline-block',
                            transition: 'transform 0.3s, opacity 0.3s',
                            width: '600px',
                            height: '600px'
                        }}
                    >
                        <Card
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: 'start',
                                height: 'auto',
                                width: '400px',
                                marginX: theme.spacing(-5),
                            }}
                        >
                            <CardHeader
                                title={
                                    <Typography variant="h4">
                                        {item.title}
                                    </Typography>}
                                sx={{ backgroundColor: theme.palette.primary.dark, width: '100%' }}
                            />
                            <CardContent sx={{ flex: 1 }}>
                                <Box>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ marginBottom: '10px', whiteSpace: 'pre-line' }}
                                    >
                                        {item.content}
                                    </Typography>

                                </Box>
                            </CardContent>
                            <CardActions sx={{ mt: 'auto' }} onClick={() => onReadMoreClick(item.id)}>
                                <Button variant='outlined' size='small' color='inherit'>Read more</Button>
                            </CardActions>
                        </Card>
                    </Box>
                ))}
            </Box>
        </Container>
    );
};

export default News;
