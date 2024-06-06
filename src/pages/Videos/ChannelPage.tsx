import { FC, useState, MouseEvent } from 'react';
import { Grid, Box, Typography, Link, Menu, MenuItem, ListItemIcon, ListItemText, Skeleton } from '@mui/material';
import VideoListHorizontal from "../../components/VideoComponents/VideoListHorizontal";
import avatar from "../../assets/img.webp";
import { grey } from '@mui/material/colors';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonIcon from '@mui/icons-material/Person';
import NeuButton from "../../components/neumorphism/button/NeuButton";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import banner from "../../assets/banner.jpg";



const ChannelPage: FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [bannerLoaded, setBannerLoaded] = useState(false);
    const [avatarLoaded, setAvatarLoaded] = useState(false);

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
                <Box component="section">
                    {!bannerLoaded && <Skeleton variant="rectangular" width="100%" height={210}
                        sx={{ borderRadius: "15px" }} />}
                    <img
                        src={banner}
                        alt="banner"
                        style={{
                            width: "100%",
                            height: "210px",
                            objectFit: "cover",
                            padding: 0,
                            margin: 0, borderRadius: "15px", display: bannerLoaded ? 'block' : 'none'
                        }}
                        onLoad={() => setBannerLoaded(true)}
                    />
                </Box>
                <Box component="section" sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    position: "relative",
                    bottom: { xs: "0px", sm: "-20px" },
                    left: "0px",
                    borderBottom: "1px solid grey",
                    alignItems: "center",
                    px: 2
                }}>
                    {!avatarLoaded && <Skeleton variant="circular" width={120} height={120} />}
                    <img
                        src={avatar}
                        alt="Avatar"
                        style={{
                            width: "120px", height: "120px",
                            borderRadius: "50%", objectFit: "cover",
                            display: avatarLoaded ? 'block' : 'none'
                        }}
                        onLoad={() => setAvatarLoaded(true)}
                    />
                    <Box component="section" sx={{
                        ml: { xs: 0, sm: 2 },
                        mt: { xs: 2, sm: 0 }, textAlign: { xs: 'center', sm: 'left' }
                    }}>
                        <Typography variant="h1" sx={{
                            fontSize: { xs: "24px", sm: "30px" },
                            paddingLeft: { xs: "0", sm: "15px" }
                        }}>SHASTUN</Typography>
                        <CheckCircleIcon sx={{
                            color: grey[500], fontSize: { xs: "12px", sm: "15px" },
                            position: "absolute", top: { xs: "8px", sm: "10px" }, left: { xs: "50%", sm: "310px" },
                            transform: { xs: "translateX(-50%)", sm: "none" }
                        }} />
                        <Box component="section" sx={{
                            display: "flex", flexDirection: { xs: "column", sm: "row" },
                            justifyContent: { xs: "center", sm: "flex-start" }, paddingLeft: "10px", mt: 1
                        }}>
                            <Typography variant='body1' sx={{ marginLeft: "10px" }}>@Codevolution</Typography>
                            <Typography variant='body1' sx={{ ml: { xs: 0, sm: 2 } }}>634,000 Abonnenten</Typography>
                            <Typography variant='body1' sx={{ ml: { xs: 0, sm: 2 } }}>1582 Videos</Typography>
                        </Box>
                        <Typography variant="body1" sx={{
                            marginLeft: "15px", fontSize: { xs: "14px", sm: "16px" },
                            mt: 1
                        }}>Tutorials on the latest tech in web development!</Typography>
                        <Typography variant="body1" sx={{
                            marginLeft: "15px", fontSize: { xs: "14px", sm: "16px" },
                            mt: 1
                        }}>
                            <Link href="https://www.example.com" sx={{ color: "blue", textDecoration: "none" }}>
                                https://www.example.com</Link>
                        </Typography>
                        <NeuButton
                            variant="contained"
                            startIcon={<NotificationsActiveIcon />}
                            rounded
                            sx={{
                                margin: "10px",
                                padding: "5px",
                                width: { xs: "160px", sm: "200px" },
                                boxShadow: "none",
                                fontSize: { xs: "14px", sm: "16px" },
                                '&:hover': {
                                    boxShadow: 'none',
                                    backgroundColor: grey[300],
                                }
                            }}
                            onClick={handleClick}   >
                            Subscribe <ArrowDropDownIcon fontSize="large" sx={{ color: 'black' }} />
                        </NeuButton>
                        <NeuButton sx={{
                            margin: "10px",
                            padding: "5px",
                            width: { xs: "160px", sm: "200px" },
                            fontSize: { xs: "14px", sm: "16px" },
                            position: "absolute",
                            right: "0",
                            borderRadius: "20px"
                        }}>Add Video</NeuButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            slotProps={{ paper: { sx: { backgroundColor: 'white', color: 'black' } } }}>
                            <MenuItem onClick={handleClose} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                                <ListItemIcon>
                                    <NotificationsActiveIcon fontSize="small" sx={{ color: 'black' }} />
                                </ListItemIcon>
                                <ListItemText>All</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleClose} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                                <ListItemIcon>
                                    <NotificationsActiveIcon fontSize="small" sx={{ color: 'black' }} />
                                </ListItemIcon>
                                <ListItemText>Personalized</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleClose} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                                <ListItemIcon>
                                    <NotificationsActiveIcon fontSize="small" sx={{ color: 'black' }} />
                                </ListItemIcon>
                                <ListItemText>No</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={handleClose} sx={{ '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                                <ListItemIcon>
                                    <PersonIcon fontSize="small" sx={{ color: 'black' }} />
                                </ListItemIcon>
                                <ListItemText>Cancel Subscription</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: "20px" }}>
                <VideoListHorizontal currentVideoId={videoId} />
            </Grid>
        </Grid>
    );
};

export default ChannelPage;