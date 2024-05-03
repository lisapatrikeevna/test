
import { Container, Typography, Paper, ThemeProvider, createTheme, Grid, Card, CardMedia } from '@mui/material';
import aboutUsImage from '../../assets/qrcode.jpg';

const theme = createTheme({
    typography: {
        fontFamily: 'Roboto, sans-serif',

    },
});

const AboutUsPage = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container style={{ marginTop: '.8rem' }}>
                <Paper style={{ padding: '1rem' }}>
                    <Typography variant="h4" gutterBottom>About Us</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="auto"
                                    image={aboutUsImage}
                                    alt="About Us"
                                />
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body1" gutterBottom>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula augue vel felis hendrerit, ac
                                tincidunt leo vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                                Curae; In hac habitasse platea dictumst.
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Fusce vitae placerat lorem. Nullam id erat a ante vestibulum fringilla. Nam dignissim, felis nec convallis
                                bibendum, dui purus sagittis urna, et pharetra sapien ex vel libero. Donec nec mi ac leo auctor bibendum.
                            </Typography>
                            <Typography variant="body1">
                                Integer lobortis, libero et pellentesque pellentesque, leo enim efficitur lacus, id fermentum urna libero
                                vel libero. Nam ut odio nec nisi efficitur sodales. Duis dapibus orci non velit tristique, non suscipit sem
                                egestas.
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula augue vel felis hendrerit, ac
                                tincidunt leo vulputate. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                                Curae; In hac habitasse platea dictumst.
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Fusce vitae placerat lorem. Nullam id erat a ante vestibulum fringilla. Nam dignissim, felis nec convallis
                                bibendum, dui purus sagittis urna, et pharetra sapien ex vel libero. Donec nec mi ac leo auctor bibendum.
                            </Typography>
                            <Typography variant="body1">
                                Integer lobortis, libero et pellentesque pellentesque, leo enim efficitur lacus, id fermentum urna libero
                                vel libero. Nam ut odio nec nisi efficitur sodales. Duis dapibus orci non velit tristique, non suscipit sem
                                egestas.
                            </Typography>


                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default AboutUsPage;