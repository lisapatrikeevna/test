import { FC } from 'react';
import SearchField from "../../components/VideoComponents/SearchField.tsx";
import VideoListHorizontal from "../../components/VideoComponents/VideoListHorizontal.tsx";
import {Link} from "react-router-dom";
import {channelPagePrototypePath, VideoEditPathPrototype} from "../../configs/RouteConfig.tsx";
import { Grid, Button} from "@mui/material";

const VideosMainPage: FC = () => {
    const videoId = '';
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SearchField
                    onSearch={() => {
                        // your search logic
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button
                    style={{ backgroundColor: '' }}
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
            <Grid item xs={12}>
                <VideoListHorizontal currentVideoId={videoId} />
            </Grid>
        </Grid>
    );
};

export default VideosMainPage;