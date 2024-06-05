import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { instance } from "../../api/axios.api.ts";
import PreviewImage from "./PreviewImage.tsx";
import { mediaPath } from "../../configs/RouteConfig.tsx";
import { Grid, Card, CardContent, Typography, Box, Button } from "@mui/material";
import { Contacts } from "@mui/icons-material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Skeletons from './Skeletons.tsx';

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

interface VideoListHorizontalProps {
    currentVideoId: string;
}

const VideoListHorizontal: React.FC<VideoListHorizontalProps> = ({ currentVideoId }) => {
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [visibleCount, setVisibleCount] = useState(0);

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

    const fetchVideos = async (videoIds: string[] = []) => {
        if (videoIds.length === 0) {
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
            const fetchPromises = videoIds.map(fetchVideo);
            const results = await Promise.allSettled(fetchPromises);
            const videos = results
                .filter((result): result is PromiseFulfilledResult<IVideo> => result.status === 'fulfilled')
                .map(result => result.value);
            setVideos(videos);
        }
    };

    useEffect(() => {
        const loadVideos = async () => {
            setLoading(true);
            await fetchVideos();
            setLoading(false);
        };

        const timer = setTimeout(loadVideos, 500);

        return () => clearTimeout(timer);
    }, []);

    const isXSmall = useMediaQuery('(max-width:400px)');
    const isSmall = useMediaQuery('(max-width:600px)');
    const isMedium = useMediaQuery('(max-width:960px)');
    const isLarge = useMediaQuery('(max-width:1280px)');
    const isXLarge = useMediaQuery('(max-width:1600px)');

    const columns = isXSmall ? 1 : isSmall ? 2 : isMedium ? 3 : isLarge ? 4 : isXLarge ? 5 : 6;
    const initialVisibleCount = columns * 2;

    useEffect(() => {
        setVisibleCount(initialVisibleCount);
    }, [columns]);

    const handleButton = async () => {
        setLoadingMore(true);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulating loading delay
        setVisibleCount((prevCount) => prevCount + columns * 2);
        setLoadingMore(false);
    };

    const filteredVideos = videos.filter(video => video.id !== currentVideoId);

    return (
        <Box sx={{ padding: "10px" }}>
            <Box sx={{ maxWidth: "100%", margin: "0 auto" }}>
                <Grid container spacing={2} sx={{ justifyContent: "center" }}>
                    {loading ? (
                        <Skeletons columns={columns} />
                    ) : (
                        filteredVideos.slice(0, visibleCount).map((video) => (
                            <Grid item key={video.id} xs={12 / columns}>
                                <Card sx={{ height: "100%" }}>
                                    <Link to={`${mediaPath}/${video.id}`}>
                                        <PreviewImage videoId={video.id} maxWidth={350} maxHeight={180} />
                                    </Link>
                                    <CardContent>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontSize: isXSmall ? "1rem" : isSmall ? "1.1rem" : isMedium ? "1.2rem" : isLarge ? "1.3rem" : "1.4rem"
                                            }}
                                        >
                                            {video.videoName}
                                        </Typography>
                                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                            <Contacts />
                                            <Typography variant="caption">UnknownUser</Typography>
                                        </Box>
                                        <Box style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                                            <Typography variant="caption">{video.videoInfo.contentViewsByUsers ? video.videoInfo.contentViewsByUsers.length : 0} views</Typography>
                                            <Typography variant="caption">2 weeks ago</Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                    {loadingMore && (
                        <Skeletons columns={columns} />
                    )}
                </Grid>
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