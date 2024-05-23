import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { instance } from "../../api/axios.api.ts";
import PreviewImage from "./PreviewImage.tsx";
import { mediaPath } from "../../configs/RouteConfig.tsx";
import { Grid, Card, CardContent, Typography, Skeleton, Box, Button, Container } from "@mui/material";
import { Contacts } from "@mui/icons-material";

export interface IVideo {
    id: string;
    previewUrl: string;
    contentType: string;
    description: string;
    videoName: string;
    streamUrl: string;
}

const VideoListHorizontal = () => {
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [moreVideoCount, setMoreVideoCount] = useState(0);
    console.log(videos);


    const fetchVideo = async (id: string) => {
        try {
            const response = await instance.get(`video/${id}`);
            if (response.status !== 200) {
                throw new Error(`Failed to fetch video with id ${id}`);
            }
            return response.data;
        } catch (error) {
            console.error(`Error fetching video with id ${id}:`, error);
            return null;
        }
    };

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            try {
                const response = await instance.get('video/all');
                if (response.status !== 200) {
                    throw new Error('Failed to fetch all videos');
                }
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching all videos:', error);
            }
            setLoading(false);
        };

        fetchVideos();
    }, []);

    const handleButton = () => {
        setMoreVideoCount(prevCount => prevCount + 4);
    };

    return (
        <Container>
            <Grid container spacing={2}>
                {!loading ? (
                    videos.slice(0, moreVideoCount + 4).map((video) => (
                        <Grid style={{ textDecoration: 'none', maxWidth: '320px' }} item xs={12} sm={6} md={4} lg={3} key={video.id}>
                            <Link to={`${mediaPath}/${video.id}`}>
                                <Card sx={{ maxWidth: '320px', maxHeight: '280px' }} key={video.id}>
                                    <PreviewImage videoId={video.id} />
                                    <CardContent>
                                        <Box>
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography variant="h5">{video.videoName}</Typography>
                                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                                    <Contacts />
                                                    <Typography>UnknownUser</Typography>
                                                </Box>
                                            </Box>
                                            <Box style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                                <Typography>63555 views</Typography>
                                                <Typography>2 weeks ago</Typography>
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))
                ) : (
                    Array.from({ length: 4 }).map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Skeleton variant="rectangular" width="100%" height={180} />
                            <Skeleton />
                            <Skeleton width="60%" />
                        </Grid>
                    ))
                )}
            </Grid>
            <Box mt={2} textAlign="center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleButton}
                    size="large"
                >
                    Load More
                </Button>
            </Box>
            <Outlet />
        </Container>
    );
};

export default VideoListHorizontal;