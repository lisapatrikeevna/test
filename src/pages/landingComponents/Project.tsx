import {Box, CardMedia, Grid, Pagination, Typography, useMediaQuery, useTheme} from '@mui/material';
import Fon1 from '../../assets/Fon.jpg';
import Fon2 from '../../assets/Fon2.jpg';
import Fon3 from '../../assets/Fon3.jpg';
import Fon4 from '../../assets/Fon4.jpg';
import Fon5 from '../../assets/Fon5.jpg';
import Fon6 from '../../assets/Fon.jpg';
import NeuCard from "../../components/neumorphism/card/NeuCard.tsx";
import NeuCardContent from "../../components/neumorphism/card/NeuCardContent.tsx";
import React from 'react';

const Project = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [page, setPage] = React.useState(1);

    const title = [
        "Communication and Learning in One Place",
        "Communication: The Key to Success",
        "Features of NeoXonline",
        "The NeoXonline Community",
        "Opportunities and Benefits",
        "Join Us"
    ];

    const text = [
        "NeoXonline is a unique platform where communication and learning come together, creating opportunities for personal and professional growth.",
        "Communication plays a crucial role in our lives, and its importance cannot be overstated. It allows us to convey information, share ideas, thoughts, and feelings, making the exchange of knowledge and experience possible. Effective communication enhances understanding between people, helps resolve conflicts, and builds trustful relationships. In a work environment, it fosters teamwork, increases productivity, and helps achieve common goals. On a personal level, communication strengthens bonds with loved ones, allowing us to express support and care. The ability to clearly and precisely articulate our thoughts helps avoid misunderstandings and dissatisfaction, making communication the foundation for building strong, productive, and harmonious relationships.",
        "NeoXonline offers a wide range of features to make your communication and learning convenient and effective:|• Messenger: exchange messages, send photos and videos, and share documents. |• Conferences: conduct video conferences for group communication and learning. |• Course Payments: a payment terminal for paying for courses and materials.|• Video: a platform for hosting and viewing educational videos.|• Chats and Channels: create group and private chats, and specialized channels for sharing information.",
        "NeoXonline is more than just a project for communication and learning. We are becoming a community where every participant can learn, earn, and invest in their future. By developing our application, we increase user engagement and provide them with all the necessary tools for successful interaction.",
        "With NeoXonline you can: |• Access a convenient messenger and video conference features.|• Pay for courses and materials through a payment terminal.|• Watch and share educational videos.|• Communicate and share experiences with like-minded people through chats and channels.|• And stay updated with the latest news and achievements of the project.",
        "Join the NeoXonline community and discover the power of communication. Learn and earn, invest in your future. Become part of the dynamic and growing NeoXonline community, which opens up new opportunities for growth and development. NeoXonline is your opportunity for personal and professional growth."
    ];

    const splitText: string[][] = text.map(str => str.split('|').map(subStr => subStr.trim()));

    const images = [Fon1, Fon2, Fon3, Fon4, Fon5, Fon6];

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Box
            sx={{
                padding: '20px',
                height: '78vh',
                width: '80vw',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Typography variant={isSmallScreen ? 'h4' : 'h2'} gutterBottom>
                About NeoXonline
            </Typography>
            <NeuCard sx={{display:'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
                <Grid container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {page % 2 === 0 ? (
                        <>
                            <Grid item xs={12} md={6}>
                                <NeuCardContent sx={{display: 'flex',flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'start'}}>
                                    <Typography variant={isSmallScreen ? 'h5' : 'h3'} sx={{ marginBottom: '10px' }}>
                                        {title[page - 1]}
                                    </Typography>
                                    {splitText[page - 1].map((str, index) => (
                                        <Typography key={index} variant="body1" paragraph>
                                            {str}
                                        </Typography>
                                    ))}
                                </NeuCardContent>
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <CardMedia
                                    component="img"
                                    image={images[page - 1]}
                                    alt={`Image ${page}`}
                                    sx={{ maxWidth: '30vw', maxHeight: '30vw' }}
                                />
                            </Grid>
                        </>
                    ) : (
                        <>
                            <Grid item xs={12} md={6} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <CardMedia
                                    component="img"
                                    image={images[page - 1]}
                                    alt={`Image ${page}`}
                                    sx={{ maxWidth: '30vw', maxHeight: '30vw' }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <NeuCardContent sx={{display: 'flex',flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'start'}}>
                                    <Typography variant={isSmallScreen ? 'h5' : 'h3'} sx={{ marginBottom: '10px' }}>
                                        {title[page - 1]}
                                    </Typography>
                                    {splitText[page - 1].map((str, index) => (
                                        <Typography key={index} variant="body1" paragraph>
                                            {str}
                                        </Typography>
                                    ))}
                                </NeuCardContent>
                            </Grid>
                        </>
                    )}
                </Grid>
            </NeuCard>
            <Pagination
                count={title.length}
                color="primary"
                page={page}
                onChange={handleChange}
                style={{ marginTop: "16px" }}
            />
        </Box>
    );
};

export default Project;
