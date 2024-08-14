import { FC } from 'react';
import VideoListHorizontal from "../../components/VideoComponents/VideoListHorizontal.tsx";
import { Grid, Button } from "@mui/material";
import {RenderValuesCentralComponent} from "../../components/AppPageComponents/chats/types.ts";

// This component is responsible for displaying the main page of the video section
const VideosMainPage: FC<{ panelWidth: number, changeRenderCentralComponent: (value: RenderValuesCentralComponent) => void }> = ({ panelWidth, changeRenderCentralComponent }) => {
    const videoId = '';
    return (

        <Grid container spacing={2} sx={{ position: "relative" }}>
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
            </Grid>

            <Grid item xs={12} sx={{ marginTop: "60px" }} > {/*Start of space for the list of videos*/}
                <VideoListHorizontal
                    currentVideoId={videoId}
                    panelWidth={panelWidth}
                    changeRenderCentralComponent={changeRenderCentralComponent}
                />
            </Grid>
        </Grid>
    );
};

export default VideosMainPage;