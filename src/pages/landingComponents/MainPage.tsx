import {/*useContext,*/ useEffect } from 'react';
import {Box, Container/*, styled*/} from '@mui/material';
import Home from './Home';
import Partners from './Partners.tsx';
import Pricing from './Pricing.tsx';
import Contacts from './Contacts';
import Cookies from './cookies/Cookies.tsx';
// import ActiveBoxContext from "../../contexts/ActiveBoxContext.tsx";
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
    scrollTime: 500
};

// const PageContainer = styled('div')({
//     display: 'flex',
//     flexDirection: 'column',
//     paddingTop: '10vh',
//     paddingBottom: '10vh',
//     width: '100vw',
//     maxWidth: '100vw',
//     top: 0,
//     left: 0,
//     scrollSnapType: 'y mandatory',
//     overflowY: 'scroll',
//     scrollBehavior: 'smooth',
//     transition: '0.5s',
//     // scrollPaddingTop: '1px',
// });

// const Box = styled(Box)({
//     width: '100%',
//     height: '80vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     scrollSnapAlign: 'start',
//     scrollSnapStop: 'always',
//     transition: '0.5s',
//     //FOR TEST
//     borderTop: '2px solid blue',
//     borderBottom: '2px solid blue',
// });

const MainPage = () => {
    // const context = useContext(ActiveBoxContext);

    // if (!context) {
    //     throw new Error('Header must be used within ActiveBoxContext');
    // }

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
            maxWidth='xl'
            sx={{
                paddingTop: '10vh',
                paddingBottom: '10vh',
            }}
        >
            <Box
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
                 sx={{
                     padding: '1.2vw 0px 1.2vw 0px',
                     height: '80vh',
                     justifyContent: 'center',
                     alignItems: 'center',
                     display: 'flex',
                     flexDirection: 'column'
                 }}
            >
                    <AboutUs />
            </Box>
            <Box id="Project">
                {/*<BoxContent maxWidth="xl">*/}
                    <Project />
                {/*</BoxContent>*/}
            </Box>
            <Box id="Pricing">
                {/*<BoxContent maxWidth="xl">*/}
                    <Pricing />
                {/*</BoxContent>*/}
            </Box>
            <Box id="Partners">
                {/*<BoxContent maxWidth="xl">*/}
                    <Partners />
                {/*</BoxContent>*/}
            </Box>
            <Box id="Contacts">
                {/*<BoxContent maxWidth="xl">*/}
                    <Contacts />
                {/*</BoxContent>*/}
            </Box>
            <Box id="News">
                <News onReadMoreClick={() => {}} />
            </Box>
            <Box id="Donate">
                {/*<BoxContent maxWidth="xl">*/}
                    <Donate />
                {/*</BoxContent>*/}
            </Box>
            <Cookies />
        </Container>
    );
};

export default MainPage;
