import { FC, useState, MouseEvent } from 'react';
import { Grid, Paper, Box, Typography, Link, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import VideoListHorizontal from "../../components/VideoComponents/VideoListHorizontal.tsx";
import avatar from "../../assets/img.webp";
import qrCode from "../../assets/qr-code-group.jpg";
import { blue, grey } from '@mui/material/colors';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonIcon from '@mui/icons-material/Person';
import NeuButton from "../../components/neumorphism/button/NeuButton.tsx";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


// interface Video {
//     id: string;
//     title: string;
//     thumbnail: string;
//     views: number;
// }
const ChannelPage: FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    // const [videos, setVideos] = useState<Video[]>([]);
    // useEffect(() => {
    //     //TODO Выгружать видео конкретно этого пользователя
    //     const fetchVideos = async () => {
    //         try {
    //             const response = await axios.get('/api/videos'); // Substitute your real endpoint.
    //             setVideos(response.data);
    //         } catch (error) {
    //             console.error('Error fetching videos:', error);
    //         }
    //     };
    //
    //     fetchVideos();
    // }, []);
    const videoId = '';

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ backgroundColor: "black" }}>
                    <Box component="section">
                        <Box sx={{ p: 2, height: "250px", position: "relative", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
                            <Box component="section" sx={{ display: "flex", alignItems: "center", marginRight: "35px", position: "relative", top: 0 }}>
                                <img src={avatar} alt="Avatar" style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover" }} />
                                <Box sx={{ display: "flex", alignItems: "center", paddingLeft: "15px" }}>
                                    <Typography variant="h1" sx={{ fontSize: "30px", color: "white", marginRight: "10px" }}>
                                        SHASTUN
                                    </Typography>
                                    <CheckCircleIcon sx={{ color: blue[500], fontSize: "25px", position: "absolute", top: "30px", right: "-14px" }} />
                                </Box>
                            </Box>
                            <Box component="section" sx={{ display: "flex", flexDirection: "column", alignItems: "center", borderLeft: "2px solid white", paddingLeft: "30px", position: "relative", top: 0 }}>
                                <Typography variant="body1" sx={{ fontSize: "20px", color: "white" }}>Lorem,ipsum dolor sit amet</Typography>
                                <Typography variant="body1" sx={{ fontSize: "20px", color: "white" }}>Lorem,ipsum dolor sit amet</Typography>
                                <Typography variant="body1" sx={{ fontSize: "20px", color: "blue" }}>Lorem,ipsum dolor sit amet</Typography>
                                <img src={qrCode} alt="QR Code" style={{ width: "100px", height: "100px", marginLeft: "-120px" }} />
                            </Box>
                        </Box>
                    </Box>
                    <Box component="section" sx={{ display: "flex", position: "relative", bottom: "10px", left: "30px", color: "white" }}>
                        <img src={avatar} alt="Avatar" style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover" }} />
                        <Box component="section">
                            <Typography variant="h1" sx={{ fontSize: "30px", color: "white", paddingLeft: "15px" }}>SHASTUN</Typography>
                            <CheckCircleIcon sx={{ color: grey[500], fontSize: "15px", position: "absolute", top: "10px", left: "280px" }} />
                            <Box component="section" sx={{ display: "flex", color: "white", paddingLeft: "10px" }}>
                                <Typography variant='body1' sx={{ marginLeft: "10px" }}>@Codevolution.</Typography>
                                <Typography variant='body1'>634,000 Abonnenten.</Typography>
                                <Typography variant='body1'>1582 Videos</Typography>
                            </Box>
                            <Typography variant="body1" sx={{ marginLeft: "15px" }}>Tutorials on the latest tech in web development!</Typography>
                            <Typography variant="body1" sx={{ marginLeft: "15px" }}>
                                <Link href="https://www.example.com" sx={{ color: "blue", textDecoration: "none" }}>https://www.example.com</Link>
                            </Typography>
                            <NeuButton
                                variant="contained"
                                startIcon={<NotificationsActiveIcon />}
                                rounded
                                sx={{
                                    margin: "10px",
                                    padding: "5px",
                                    width: "180px",
                                    boxShadow: "none",
                                    '&:hover': {
                                        boxShadow: 'none',
                                        backgroundColor: 'white',
                                    }
                                }}
                                onClick={handleClick}   >
                                Subscribe   <ArrowDropDownIcon fontSize="large" sx={{ color: 'lack' }} />
                            </NeuButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                slotProps={{ paper: { sx: { backgroundColor: 'black', color: 'white' } } }}>
                                <MenuItem onClick={handleClose} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                                    <ListItemIcon>
                                        <NotificationsActiveIcon fontSize="small" sx={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText>All</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleClose} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                                    <ListItemIcon>
                                        <NotificationsActiveIcon fontSize="small" sx={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText>Personalized</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleClose} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                                    <ListItemIcon>
                                        <NotificationsActiveIcon fontSize="small" sx={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText>No</ListItemText>
                                </MenuItem>
                                <MenuItem onClick={handleClose} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                                    <ListItemIcon>
                                        <PersonIcon fontSize="small" sx={{ color: 'white' }} />
                                    </ListItemIcon>
                                    <ListItemText>Cancel Subscription</ListItemText>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <VideoListHorizontal currentVideoId={videoId} />
            </Grid>
        </Grid>
    );
};

export default ChannelPage;