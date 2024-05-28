import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { instance } from "../../api/axios.api.ts";
import PreviewImage from "./PreviewImage.tsx";
import { mediaPath } from "../../configs/RouteConfig.tsx";
import { Grid, Card, CardContent, Typography, Skeleton, Box, Button, Container } from "@mui/material";
import { Contacts } from "@mui/icons-material";
import useMediaQuery from '@mui/material/useMediaQuery';

export interface IVideo {
    id: string;
    previewUrl: string;
    contentType: string;
    description: string;
    videoName: string;
    streamUrl: string;
    videoInfo: {
        contentViewsByUsers: string[];
    };
}

const VideoListHorizontal = () => {
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [moreVideoCount, setMoreVideoCount] = useState(12); // Initial number of videos to display

    const fetchVideo = async (id: string) => {
        try {
            const response = await instance.get(`video/${id}`, {
                headers: {},
            });
            if (response.status !== 200) {
                throw new Error(`Failed to fetch video with id ${id}`);
            }
            const data: IVideo = await response.data;
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

    const handleButton = () => {
        // Check if the current count of displayed videos is less than the total number of videos
        if (moreVideoCount < videos.length) {
            // Update the state "moreVideoCount" by either increasing it by 6
            // or setting it to the total number of videos, whichever is smaller
            setMoreVideoCount((prevCount) => Math.min(prevCount + 6, videos.length));
        }
    };

    // Define media queries for different screen sizes
    const isXSmall = useMediaQuery('(max-width:400px)');
    const isSmall = useMediaQuery('(max-width:600px)');
    const isMedium = useMediaQuery('(max-width:960px)');
    const isLarge = useMediaQuery('(max-width:1280px)');

    // Determine the number of columns based on the screen size
    const columns = isXSmall ? 1 : isSmall ? 2 : isMedium ? 3 : isLarge ? 5 : 6;

    return (
        <Box sx={{ padding: "10px" }} >
            <Box display="grid" gridTemplateColumns={`repeat(${columns}, 1fr)`} gap={2} width="100%" mx="auto">
                {!loading
                    ? videos.slice(0, moreVideoCount).map((video) => (
                        <Card key={video.id} sx={{ width: "320px" }}>
                            <Link to={`${mediaPath}/${video.id}`}>
                                <PreviewImage videoId={video.id} />
                            </Link>
                            <CardContent>
                                <Typography variant="h5">{video.videoName}</Typography>
                                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                    <Contacts />
                                    <Typography>UnknownUser</Typography>
                                </Box>
                                <Box style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                    <Typography>{video.videoInfo.contentViewsByUsers ? video.videoInfo.contentViewsByUsers.length : 0} views</Typography>
                                    <Typography>2 weeks ago</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ))
                    : Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton key={index} variant="rectangular" width="100%" height={180} />
                    ))}
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleButton}
                    size="large">
                    Load More
                </Button>
            </Box>
            <Outlet />
        </Box>
    );
};

export default VideoListHorizontal;