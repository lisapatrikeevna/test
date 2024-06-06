import { FC } from 'react';
import VideoListHorizontal from "../../components/VideoComponents/VideoListHorizontal.tsx";
import { Link } from "react-router-dom";
import { channelPagePrototypePath, VideoEditPathPrototype } from "../../configs/RouteConfig.tsx";
import { Grid, Button } from "@mui/material";

const VideosMainPage: FC = () => {
    const videoId = '';
    return (
        <Grid container spacing={2} sx={{ position: "relative", }}>
            <Grid item xs={12} sx={{ position: "absolute", right: "15px", top: "20px" }}>
                <Button
                    style={{ backgroundColor: '', marginRight: "15px" }}
                    variant="contained"
                    component={Link}
                    to={VideoEditPathPrototype}
                >
                    Add Video
                </Button>
                <Link to={channelPagePrototypePath}>
                    <Button style={{ backgroundColor: '' }} variant="contained">Channel Page</Button>
                </Link>
            </Grid>
            <Grid item xs={12} sx={{ marginTop: "60px" }} >
                <VideoListHorizontal currentVideoId={videoId} />
            </Grid>
        </Grid>
    );
};

export default VideosMainPage;