import {useEffect } from 'react';
import {Box, Container} from '@mui/material';
import Home from './Home';
import Partners from './Partners.tsx';
import Pricing from './Pricing.tsx';
import Contacts from './Contacts';
import Cookies from './cookies/Cookies.tsx';
import News from "./News.tsx";
import AboutUs from "./AboutUs.tsx";
import Project from './Project';
import Donate from "./Donate.tsx";

import ScrollSnap from "scroll-snap";

declare module "scroll-snap" {
    export default class ScrollSnap {
        constructor(element: unknown, config: object);
        bind(callback: () => void): void;
    }
}

const snapConfig = {
    scrollSnapDestination: "10% 90%",
    scrollTimeout: 100,
    scrollTime: 500,
};

const MainPage = () => {

    const bindScrollSnap = () => {

        const htmlElement = document.querySelector<HTMLDivElement>('div');
        new ScrollSnap(htmlElement, snapConfig);
    }

    const componentDidMount = () => {
        bindScrollSnap();
    }

    useEffect(() => {
        componentDidMount();
    }, []);

    return (
        <Container
            maxWidth="xl"
            sx={{
                paddingTop: {
                    xs: '13vh',
                    sm: '12vh',
                    lg: '10vh',
                    xl: '10vh',
                },
                paddingBottom: {
                    xs: '20vh',
                    sm: '20vh',
                    md: '10vh',
                    lg: '10vh',
                    xl: '10vh',
                },
                overflow: 'auto',
            }}
        >

            <Box
                id="Home"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '80vh',
                    padding: {
                        xs: '1vw 0.8vw',
                        sm: '1vw 0.8vw',
                        lg: '0.8vh 1.2vw',
                        xl: '1vw 0px 0.8vw',
                    },

                }}
            >
                <Home />
            </Box>
            <Box
                id="AboutUs"
                sx={{
                    height: '80vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <AboutUs />
            </Box>
            <Box
                id="Project"
                sx={{
                    height: '80vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                <Project />
            </Box>
            <Box
                id="Pricing"
                sx={{
                    display: 'flex',
                    overflowY: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                <Pricing />
            </Box>
            <Box
                id="Partners">
                <Partners />
            </Box>
            <Box
                id="Contacts">
                <Contacts />
            </Box>
            <Box
                id="News">
                <News onReadMoreClick={() => {}} />
            </Box>
            <Box
                id="Donate">
                <Donate />
            </Box>
            <Cookies />
        </Container>
    );
};

export default MainPage;