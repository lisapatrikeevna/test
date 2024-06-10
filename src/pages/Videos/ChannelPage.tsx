import { FC, useState, MouseEvent } from 'react';
import { Grid, Box, Typography, Link, Menu, MenuItem, Skeleton } from '@mui/material';
import { grey } from '@mui/material/colors';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import banner from "../../assets/banner.jpg";
import avatar from "../../assets/img.webp";
import VideoListHorizontal from "../../components/VideoComponents/VideoListHorizontal";
import NeuButton from '../../components/neumorphism/button/NeuButton';

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
        <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: '1200px', margin: '0 auto', position: "relative" }}>
            <Grid item xs={12}>
                <Box component="section" sx={{ position: "relative" }}>
                    {!bannerLoaded && <Skeleton variant="rectangular" width="100%" height={210} sx={{ borderRadius: "15px" }} />}
                    <Box
                        component="img"
                        src={banner}
                        alt="banner"
                        sx={{
                            width: "100%",
                            height: "auto",
                            maxHeight: "210px",
                            objectFit: "cover",
                            padding: 0,
                            margin: 0,
                            borderRadius: "15px",
                            display: bannerLoaded ? 'block' : 'none',
                            '@media (max-width: 960px)': {
                                maxHeight: "150px",
                            },
                            '@media (max-width: 600px)': {
                                maxHeight: "120px",
                            },
                        }}
                        onLoad={() => setBannerLoaded(true)}
                    />
                </Box>
                <Box component="section" sx={{ px: 2, pt: 2, display: 'flex', alignItems: 'flex-start' }}>
                    {!avatarLoaded && <Skeleton variant="circular" width={120} height={120} sx={{ borderRadius: "50%", mr: 2, mt: 0 }} />}
                    <img
                        src={avatar}
                        alt="Avatar"
                        style={{
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            display: avatarLoaded ? 'block' : 'none'
                        }}
                        onLoad={() => setAvatarLoaded(true)}
                    />
                    <Box sx={{ flexGrow: 1, mt: 0, marginLeft: "10px" }}>
                        <Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 1 }}>SHASTUN  <CheckCircleIcon sx={{ color: grey[500], fontSize: '1.2rem', ml: '5px' }} /></Typography>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: { xs: 'flex-start', md: 'center' },
                            mb: 1
                        }}>
                            <Typography variant="body1" sx={{ mb: { xs: 1, md: 0 }, mr: { md: 2 } }}>@Codevolution</Typography>
                            <Typography variant="body1" sx={{ mb: { xs: 1, md: 0 }, mr: { md: 2 } }}>634,000 Abonnenten</Typography>
                            <Typography variant="body1" sx={{ mb: { xs: 1, md: 0 } }}>1582 Videos</Typography>
                        </Box>

                        <Typography variant="body1" sx={{ mb: { xs: 2, md: 0 }, mr: { md: 2 }, marginLeft: { xs: '-130px', md: '0' } }}>Tutorials on the latest tech in web development!</Typography>
                        <Typography variant="body1" sx={{ color: 'blue', mb: 2, marginLeft: { xs: '-130px', md: '0' } }}>
                            <Link href="https://www.example.com" underline="hover">https://www.example.com</Link>
                        </Typography>
                        <Box>
                            <NeuButton variant="contained" startIcon={<NotificationsActiveIcon />} rounded onClick={handleClick} sx={{ ml: { xs: 0, sm: '-10px' }, marginLeft: { xs: '-130px', sm: '-10px' } }}>
                                Subscribe <ArrowDropDownIcon fontSize="large" sx={{ color: 'black' }} />
                            </NeuButton>

                            <Box sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' },
                                justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                                alignItems: 'center',
                                mt: { xs: 2, sm: 0 },
                            }}>
                                <NeuButton variant="contained" sx={{
                                    mb: { xs: 1, sm: 0 }, marginLeft: { xs: '-270px', sm: '-10px' },
                                    marginTop: { xs: '-5px', sm: '0px' },
                                    width: "180px", padding: "5px", borderRadius: "15px",
                                }}>
                                    Add Video
                                </NeuButton> </Box>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                PaperProps={{ sx: { backgroundColor: 'white', color: 'black' } }}>
                                <MenuItem onClick={handleClose}>All</MenuItem>
                                <MenuItem onClick={handleClose}>Personalized</MenuItem>
                                <MenuItem onClick={handleClose}>No</MenuItem>
                                <MenuItem onClick={handleClose}>Cancel Subscription</MenuItem>
                            </Menu>
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
                <VideoListHorizontal currentVideoId={videoId} />
            </Grid>
        </Grid>
    );
};

export default ChannelPage;