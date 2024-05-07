import React, { useState } from 'react';
import SearchField from "../../components/VideoComponents/SearchField.tsx";
import AddVideoModal from "../../components/VideoComponents/AddVideoModal.tsx";
import VideoListHorizontal from "../../components/VideoComponents/VideoListHorizontal.tsx";
import {Link} from "react-router-dom";
import {channelPagePrototypePath} from "../../configs/RouteConfig.tsx";
import { Grid, Button} from "@mui/material";

const VideosMainPage: React.FC = () => {
    const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false);
    const handleOpenAddVideoModal = () => {
        setIsAddVideoModalOpen(true);
    };

    const handleCloseAddVideoModal = () => {
        setIsAddVideoModalOpen(false);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <SearchField
                    onSearch={() => {
                        // ваша логика поиска
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <Button style={{ backgroundColor: '' }} variant="contained" onClick={handleOpenAddVideoModal}>Add Video</Button>
                <Link to={channelPagePrototypePath}>
                    <Button style={{ backgroundColor: '' }} variant="contained">Channel Page</Button>
                </Link>
            </Grid>
            <Grid  item xs={12}>
                <AddVideoModal isOpen={isAddVideoModalOpen} onClose={handleCloseAddVideoModal}/>
            </Grid>
            <Grid item xs={12}>
                <VideoListHorizontal/>
            </Grid>
        </Grid>
    );
};

export default VideosMainPage;