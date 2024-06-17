import { FC } from 'react';
import VideoListHorizontal from "../../components/VideoComponents/VideoListHorizontal.tsx";
import { Grid, Button } from "@mui/material";
import {RenderValuesCentralComponent} from "../AppPage.tsx";

// This component is responsible for displaying the main page of the video section
const VideosMainPage: FC<{ changeRenderCentralComponent: (value: RenderValuesCentralComponent) => void }> = ({ changeRenderCentralComponent }) => {
    const videoId = '';
    return (

        <Grid container spacing={2} sx={{ position: "relative", }}>
            <Grid item xs={12} sx={{ position: "absolute", right: "15px", top: "20px" }}> {/*Start of space for buttons*/}

                <Button
                    style={{ backgroundColor: '', marginRight: "15px" }}
                    variant="contained"
                    onClick={() => changeRenderCentralComponent('videoeditpage')}
                > {/*After clicking on the button, the page will change to the video edit page and try to add video*/}
                    Add Video
                </Button>

                <Button style={{ backgroundColor: '' }} variant="contained"
                            onClick={() => changeRenderCentralComponent('videochannel')}
                > {/*After clicking on the button, the component will change to the channel page*/}
                    Channel Page
                </Button>
            </Grid> {/*End of space for buttons*/}

            <Grid item xs={12} sx={{ marginTop: "60px" }} > {/*Start of space for the list of videos*/}
                <VideoListHorizontal currentVideoId={videoId} changeRenderCentralComponent={changeRenderCentralComponent} /> {/*The component is responsible for displaying a list of videos*/}
            </Grid> {/*End of space for the list of videos*/}
        </Grid>
    );
};

export default VideosMainPage;