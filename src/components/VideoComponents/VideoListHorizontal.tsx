import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { instance } from "../../api/axios.api.ts";
import PreviewImage from "./PreviewImage.tsx";
import { mediaPath } from "../../configs/RouteConfig.tsx";
import { Grid, Card, CardContent, Typography, Skeleton, Box, Button } from "@mui/material";
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
    const [loading, setLoading] = useState(true); // Create a loading state to display a loading indicator while fetching videos

    const fetchVideo = async (id: string) => {
        try {
            const response = await instance.get(`video/${id}`, {
                headers: {

                },
            });
            if (response.status !== 200) {
                throw new Error(`Failed to fetch video with id ${id}`);
            }
            const data = await response.data;
            return data;
        } catch (error) {
            console.error(`Error fetching video with id ${id}:`, error);
            return null;
        }
    };

    useEffect(() => {
        const fetchVideos = async (videoIds: string[] = []) => {
            setLoading(true); // Initialize loading state to true in beginning of fetching videos
            if (videoIds.length === 0) {
                // Query to fetch all videos
                try {
                    const response = await instance.get(`video/all`, {});
                    if (response.status !== 200) {
                        throw new Error(`Failed to fetch all videos`);
                    }
                    const data = await response.data;
                    setVideos(data);
                } catch (error) {
                    console.error(`Error fetching all videos:`, error);
                }
            } else {
                // Fetch videos by ids
                const fetchPromises = videoIds.map(fetchVideo);
                const results = await Promise.allSettled(fetchPromises);
                const videos = results
                    .filter((result): result is PromiseFulfilledResult<IVideo> => result.status === 'fulfilled')
                    .map(result => result.value);
                setVideos(videos);
            }
            setLoading(false); // Initialize loading state to false after fetching videos
        };

        const timer = setTimeout(() => {
            fetchVideos();
        }, 500);

        // Clear the timer when the component is unmounted
        return () => clearTimeout(timer);
    }, []); // Empty dependency array to run the effect only once when the component mounts


    return (
        <Grid container spacing={2}>
            {!loading ? (
                videos.map((video) => (
                    <Grid style={{ textDecoration: 'none', maxWidth: '320px' }} item xs={12} sm={6} md={4} lg={3} key={video.id}>
                        <Link to={`${mediaPath}/${video.id}`} >
                            <Card sx={{ maxWidth: '320px' }}>
                                <PreviewImage videoId={video.id} />
                                <CardContent >
                                    <Box>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography variant="h5">{video.videoName}</Typography>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                                                <Contacts />
                                                <Typography>UnknownUser</Typography>
                                            </Box>
                                        </Box>
                                        <Box style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                            {/*<Typography>{viewCount}</Typography>*/}
                                            <Typography>63555 views</Typography>
                                            {/*<Typography>{viewLikes}</Typography>*/}
                                            <Typography>2 weeks ago</Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))
            ) : (
                Array.from({ length: 5 }).map((_, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Skeleton variant="rectangular" width="100%" height={180} />
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Grid>
                ))
            )}
            <Link to="moreVideosPath">
                <Button variant="contained" color="primary">
                    Load More
                </Button>
            </Link>
            <Outlet />
        </Grid>
    );
};

export default VideoListHorizontal;