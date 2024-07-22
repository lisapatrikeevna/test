import React, { useState, useEffect } from 'react';
import Box from "@mui/material/Box";
import { Container } from "../components/Container/Container.tsx";
import styles from './styles.ts';
import {styled} from "@mui/material/styles";

const Copyright = styled('div')(({ theme }) => ({
    position: 'absolute',
    left: theme.spacing(1),
    bottom: theme.spacing(1),
    fontFamily: theme.typography.fontFamily,
}));

export const Footer = () => {
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

    const handleScroll = () => {
        const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
        setIsScrolledToBottom(isBottom);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Box
            sx={isScrolledToBottom ? styles.expandedFooter : styles.collapsedFooter}
        >
            <Container>
                <Box sx={styles.container}>
                    {isScrolledToBottom ? (
                        <Copyright>&copy; Copyright 2024 NeoXonline</Copyright>
                    ) : (
                        <Copyright>&copy; Copyright 2024 NeoXonline</Copyright>

                    )}
                </Box>
            </Container>
        </Box>
    );
};
