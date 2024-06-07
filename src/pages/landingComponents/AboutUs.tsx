import { Typography, Paper, Grid, Card, CardMedia, Box } from '@mui/material';
import aboutUsImage from '../../assets/qrcode.jpg';

const AboutUsPage = () => {

    return (
        <Box style={{ marginTop: '.8rem'  }}>
            <Paper style={{ padding: '1rem' }}>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <Box sx={{ backgroundColor: 'white',justifyContent: 'center', display: 'flex' }}>
                                <CardMedia
                                    component="img"
                                    image={aboutUsImage}
                                    alt="About Us"
                                    sx={{ width: '80%' }}
                                />
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" gutterBottom sx={{ fontSize: '1.34rem' }}>About Us</Typography>
                        <Typography variant="body1" paragraph >
                            We are NeoXonline, a super team dedicated to developing this innovative project. Our mission is to create a platform that seamlessly integrates communication and learning, providing unparalleled opportunities for personal and professional growth.
                        </Typography>

                        <Typography variant="h4" gutterBottom sx={{ fontSize: '1.34rem' }}>Our Vision</Typography>
                        <Typography variant="body1" paragraph >
                            We believe in the power of effective communication and continuous learning. Our team is committed to building a platform that empowers individuals and communities to connect, share knowledge, and grow together.
                        </Typography>

                        <Typography variant="h4" gutterBottom sx={{ fontSize: '1.34rem' }}>Our Team</Typography>
                        <Typography variant="body1" paragraph >
                            Our team consists of passionate professionals with diverse expertise in technology, education, and communication. We are united by a common goal: to create a user-friendly and feature-rich platform that meets the evolving needs of our users.
                        </Typography>

                        <Typography variant="h4" gutterBottom sx={{ fontSize: '1.34rem' }}>Our Commitment</Typography>
                        <Typography variant="body1" paragraph >
                            We are ready to face new challenges and continuously improve our platform to provide the best possible experience for our users. Innovation, dedication, and user satisfaction are at the core of everything we do.
                        </Typography>

                        <Typography variant="h4" gutterBottom sx={{ fontSize: '1.34rem' }}>Join Us</Typography>
                        <Typography variant="body1" paragraph >
                            As we continue to develop NeoXonline, we invite you to join us on this exciting journey. Together, we can achieve great things and make a significant impact in the world of communication and learning.
                        </Typography>

                        <Typography variant="body1" paragraph >
                            NeoXonline — Connecting People, Empowering Growth.
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default AboutUsPage;
