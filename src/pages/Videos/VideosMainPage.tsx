import React, { useState } from 'react';
import SearchField from "../../components/VideosComponents/SearchField.tsx";
import AddVideoModal from "../../components/VideosComponents/AddVideoModal.tsx";
import VideoListHorizontal from "../../components/VideosComponents/VideoListHorizontal.tsx";
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
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={6} container justifyContent="center">
                <div style={{ maxWidth: '500px' }}>
                    <SearchField
                        onSearch={() => {
                            // ваша логика поиска
                        }}
                    />
                </div>
            </Grid>
            <Grid item xs={6} container justifyContent="flex-end" alignItems="center">
                <Button
                    style={{ backgroundColor: 'var(--background)', height: '50px', width: '100px', marginRight: '16px' }}
                    variant="contained"
                    onClick={handleOpenAddVideoModal}
                >
                    Add Video
                </Button>
                <Link to={channelPagePrototypePath}>
                    <Button
                        style={{ backgroundColor: 'var(--background)', height: '50px', width: '100px' }}
                        variant="contained"
                    >
                        Channel Page
                    </Button>
                </Link>
            </Grid>
            <Grid item xs={12}>
                <AddVideoModal isOpen={isAddVideoModalOpen} onClose={handleCloseAddVideoModal} />
            </Grid>
            <Grid item xs={12}>
                <VideoListHorizontal />
            </Grid>
        </Grid>
    );
};

export default VideosMainPage;