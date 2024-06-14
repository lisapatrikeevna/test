import { FC } from 'react';
import VideoListHorizontal from "../../components/VideoComponents/VideoListHorizontal.tsx";
import { Grid, Button } from "@mui/material";
import {RenderValuesCentralComponent} from "../AppPage.tsx";


const VideosMainPage: FC<{ changeRenderCentralComponent: (value: RenderValuesCentralComponent) => void }> = ({ changeRenderCentralComponent }) => {
    const videoId = '';
    return (

        <Grid container spacing={2} sx={{ position: "relative", }}>
            <Grid item xs={12} sx={{ position: "absolute", right: "15px", top: "20px" }}>
                <Button
                    style={{ backgroundColor: '', marginRight: "15px" }}
                    variant="contained"
                    onClick={() => changeRenderCentralComponent('videoeditpage')}
                >
                    Add Video
                </Button>

                    <Button style={{ backgroundColor: '' }} variant="contained"
                            onClick={() => changeRenderCentralComponent('videochannel')}
                    >Channel Page</Button>

            </Grid>
            <Grid item xs={12} sx={{ marginTop: "60px" }} >
                <VideoListHorizontal currentVideoId={videoId} changeRenderCentralComponent={changeRenderCentralComponent} />
            </Grid>
        </Grid>
    );
};

export default VideosMainPage;