import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { instance } from "../../api/axios.api.ts";
import PreviewImage from "./PreviewImage.tsx";
import {mediaPath} from "../../configs/RouteConfig.tsx";
import { Grid, Card, CardContent, Typography, Skeleton } from "@mui/material";
import { IVideo } from "./VideoListHorizontal.tsx"; // Import the IVideo interface from VideoListHorizontal.tsx

const VideoListVertical = () => {
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [loading, setLoading] = useState(true); // Create a local loading state to display a loading indicator while fetching videos

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
            setLoading(true); // Initialize the loading state to true at the beginning of fetching videos
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
                // Query to fetch videos by ids
                const fetchPromises = videoIds.map(fetchVideo);
                const results = await Promise.allSettled(fetchPromises);
                const videos = results
                    .filter((result): result is PromiseFulfilledResult<IVideo> => result.status === 'fulfilled')
                    .map(result => result.value);
                setVideos(videos);
            }
            setLoading(false); // Initialize the loading state to false after fetching videos
        };

        const timer = setTimeout(() => {
            fetchVideos();
        }, 500);

        // Clear the timer when the component is unmounted
        return () => clearTimeout(timer);
    }, []); // Empty dependency array to run the effect only once when the component mounts


    return (
        <Grid container spacing={2} direction="column">
            {!loading ? (
                videos.map((video) => (
                    <Grid style={{ textDecoration: 'none', maxWidth: '320px' }} item xs={12} sm={6} md={4} lg={3} key={video.id}>
                        <Link to={`${mediaPath}/${video.id}`} >
                            <Card sx={{maxWidth: '320px'}}>
                                <PreviewImage videoId={video.id}/>
                                <CardContent style={{ backgroundColor: 'var(--background)' }}>
                                    <Typography variant="h5" >{video.videoName}</Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))
            ) : (
                Array.from({length: 5}).map((_, index) => (
                    <Grid item xs={12} key={index}>
                        <Skeleton variant="rectangular" width="100%" height={180}/>
                        <Skeleton/>
                        <Skeleton width="60%"/>
                    </Grid>
                ))
            )}
        </Grid>
    );
};

export default VideoListVertical;