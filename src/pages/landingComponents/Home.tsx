import {FC} from 'react';
import {Typography, Box, List, ListItemIcon, ListItem, ListItemText, useTheme, Divider} from '@mui/material';

import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import ThreeDRotationOutlinedIcon from '@mui/icons-material/ThreeDRotationOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

const Home: FC = () => {

    const theme = useTheme();
    const iconSize = 'large';

    return (
        <Box
            id="Home"
            sx={{
                paddingRight:{
                    xs: theme.spacing(0),
                    sm: theme.spacing(5),
                    lg: theme.spacing(10),
                    xl: theme.spacing(15),
                },
                paddingLeft:{
                    xs: theme.spacing(0),
                    sm: theme.spacing(5),
                    lg: theme.spacing(10),
                    xl: theme.spacing(15),
                },
            }}>

            {/*Header Text*/}
            <Box>
                <Typography variant='h2' sx={{
                    fontSize: {
                        xs: '1.5rem', // 24px
                        sm: '2rem',   // 32px
                        md: '2.5rem', // 40px
                        lg: '3rem',   // 48px
                        xl: '3.5rem'  // 56px
                    }
                }}>
                    Unlock Your Potential with NeoXonline!
                </Typography>
                <Typography variant='h3' sx={{
                    fontSize: {
                        xs: '1rem', // 16px
                        sm: '1.2rem', // 19.2px
                        md: '1.5rem', // 24px
                        lg: '1.8rem', // 28.8px
                        xl: '2.1rem' // 33.6px
                    },
                    // marginBottom: theme.spacing(2)

                }}>
                    Learn, Connect, and Grow with Us!
                </Typography>

                {/*List features of platform & Video Player YouTube*/}
                <Box sx={{display: 'flex',
                    flexDirection: {
                        xs: 'column',
                        sm: 'column',
                        md: 'column',
                        lg: 'row',
                        xl: 'row',
                    },
                    gap: {
                        xs: 0,
                        lg: theme.spacing(4),
                    },
                    justifyContent: 'space-between',
                    alignItems: {
                        xs: 'flex-start',
                        sm: 'flex-start',
                        lg: 'center',
                        xl: 'center',
                    },
                    padding: {
                        // xs: '1vw 1vw',
                        // sm: '1.2vw 1vw',
                        lg: '0.8vh 1.2vw',
                        xl: '1vw 0px 1vw',
                    },
                }}>
                    <List
                        subheader={
                            <Typography variant={'h4'}>
                                All-in-One Platform
                                {<Divider />}
                            </Typography>

                        }
                        sx={{marginTop: theme.spacing(4)}}>
                        <ListItem>
                            <ListItemIcon >
                                <QuestionAnswerOutlinedIcon fontSize={iconSize}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant={'h6'}>
                                    Exchange messages, send photos and videos, and share documents.
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <VideoCallOutlinedIcon fontSize={iconSize}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant={'h6'}>
                                    Easily conduct group video conferences and webinars.
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <VideoLibraryOutlinedIcon fontSize={iconSize}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant={'h6'}>
                                    Platform for hosting and viewing educational videos.
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <ThreeDRotationOutlinedIcon fontSize={iconSize}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant={'h6'}>
                                    Virtual 2D and 3D boards for interactive learning.
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <PsychologyOutlinedIcon fontSize={iconSize}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant={'h6'}>
                                    Artificial intelligence helps quickly find and select the right courses.
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <CalendarMonthOutlinedIcon fontSize={iconSize}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant={'h6'}>
                                    Integrated planning tools: calendar, notes tied to dates.
                                </Typography>
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <PaidOutlinedIcon fontSize={iconSize}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant={'h6'}>
                                    Convenient payment terminal for paying for courses and materials.
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>

                    {/*Video Player YouTube*/}
                    <Box
                        sx={{
                            position: 'relative',

                            width: {
                                xs: '100%',
                                sm: '100%',
                                md: '100%',
                                lg: '70%',
                                xl: '60%'
                            },
                            paddingBottom: {
                                xs: '56.25%',
                                sm: '56.25%',
                                md: '0%',
                                lg: '0%',
                                xl: '0%'
                            },
                            height: {
                                xs: '200px',
                                sm: '200px',
                                md: '460px',
                                lg: '400px',
                                xl: '500px'
                            },
                            marginTop: {
                                md: theme.spacing(4),
                                lg: '0px',
                            },
                            '& iframe': {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                borderRadius: '10px'
                            }
                        }}
                    >
                        <iframe
                            src="https://www.youtube.com/embed/SMAlg2DKCbU?si=esX7eF6Hqj8mNRlu"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
