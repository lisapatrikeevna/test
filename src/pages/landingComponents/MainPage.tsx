
import {Container, useTheme} from '@mui/material';
import Home from './Home';
import Partners from './Partners.tsx';
import Pricing from './Pricing.tsx';
import Contacts from './Contacts';
import News from "./News.tsx";
import AboutUs from "./AboutUs.tsx";
// import Project from './Project';
import Donate from "./Donate.tsx";

const MainPage = () => {
    const theme = useTheme();

    return (
        <Container
            maxWidth={false}
            sx={{
                paddingTop: {
                    xs: theme.spacing(15),
                    sm: theme.spacing(15),
                    md: theme.spacing(15),
                    xl: theme.spacing(20),

                },
                paddingBottom: {
                    xs: '20vh',
                    sm: '20vh',
                    md: theme.spacing(15),
                    xl: theme.spacing(10),
                },
                overflow: 'auto',
                scrollSnapType: 'y mandatory',
            }}
        >
            <Home />
            <AboutUs />
            <Pricing />
            <Partners />
            <Contacts />
            <News onReadMoreClick={() => {}} />
            <Donate />
        </Container>
    );
};

export default MainPage;