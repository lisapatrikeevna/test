import {Container, useTheme} from '@mui/material';
import Contacts from './Contacts';

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
            {/*<Home />*/}
            {/*<AboutUs />*/}
            {/*<Pricing />*/}
            {/*<Partners />*/}
            {/*<Contacts />*/}
            {/*<News />*/}
        </Container>
    );
};

export default MainPage;