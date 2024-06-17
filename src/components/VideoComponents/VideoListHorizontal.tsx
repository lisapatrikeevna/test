import React, { useState, useEffect } from "react";
import {  Outlet } from "react-router-dom";
import { instance } from "../../api/axios.api.ts";
import PreviewImage from "./PreviewImage.tsx";
import { Grid, Card, CardContent, Typography, Box, Button } from "@mui/material";
import { Contacts } from "@mui/icons-material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Skeletons from './Skeletons.tsx';
import { getAllUsers } from "../../services/userServices/getAllUsers.service.ts";
import { RenderValuesCentralComponent } from "../../pages/AppPage.tsx";

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
    ownerId: string; // Add ownerId to IVideo interface
}

interface VideoListHorizontalProps {
    currentVideoId: string;
    changeRenderCentralComponent: (value: RenderValuesCentralComponent, videoId?: string) => void;
}

// Component that show list of Videos
const VideoListHorizontal: React.FC<VideoListHorizontalProps> = ({ currentVideoId, changeRenderCentralComponent }) => {
   const [videos, setVideos] = useState<IVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [visibleCount, setVisibleCount] = useState(0);
    const [users, setUsers] = useState<{ [key: string]: string }>({}); // To store user data

    // Fetch video by id
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

    // Fetch all videos
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

    // Fetch all users
    const fetchUsers = async () => {
        try {
            const usersData = await getAllUsers();
            const usersMap = usersData.reduce((acc, user) => {
                acc[user.id] = user.login;
                return acc;
            }, {} as { [key: string]: string });
            setUsers(usersMap);
        } catch (error) {
            console.error(`Error fetching users:`, error);
        }
    };

    // Load all videos, and give info about Author
    useEffect(() => {
        const loadVideosAndUsers = async () => {
            setLoading(true);
            await Promise.all([fetchVideos(), fetchUsers()]);
            setLoading(false);
        };

        const timer = setTimeout(loadVideosAndUsers, 500);

        return () => clearTimeout(timer);
    }, []);

    //TODO check to simplify

    // Sizes for adaptation
    const isXSmall = useMediaQuery('(max-width:400px)');
    const isSmall = useMediaQuery('(max-width:600px)');
    const isMedium = useMediaQuery('(max-width:960px)');
    const isLarge = useMediaQuery('(max-width:1280px)');
    const isXLarge = useMediaQuery('(max-width:1600px)');

    // Number of columns of videos, depends on size
    const columns = isXSmall ? 1 : isSmall ? 2 : isMedium ? 3 : isLarge ? 4 : isXLarge ? 5 : 6;
    const initialVisibleCount = columns * 2;

    // Showing only initialVisibleCount amount of rows of videos
    useEffect(() => {
        setVisibleCount(initialVisibleCount);
    }, [columns]);

    // Load more videos when button is clicked
    const handleButton = async () => {
        setLoadingMore(true);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulating loading delay
        setVisibleCount((prevCount) => prevCount + columns * 2);
        setLoadingMore(false);
    };

    // Filter out the current video from the list
    const filteredVideos = videos.filter(video => video.id !== currentVideoId);


    return (
        <Box sx={{ padding: "10px" }}>
            <Box sx={{ maxWidth: "100%", margin: "0 auto" }}>
                <Grid container spacing={2} sx={{ justifyContent: "center" }}> {/*Grid container for video list*/}

                    {loading ? (
                        <Skeletons columns={columns} />  // Skeleton if videolist is still loading
                    ) : (
                        filteredVideos.slice(0, visibleCount).map((video) => (
                            <Grid item key={video.id} xs={12 / columns}> {/*Grid item for each video*/}
                                <Card sx={{ height: "100%" }}> {/*View for each video*/}
                                    <PreviewImage
                                        videoId={video.id}
                                        maxWidth={350}
                                        maxHeight={180}
                                        onClick={() => changeRenderCentralComponent('videopage', video.id)}
                                    />
                                    <CardContent sx={{ paddingBottom: '16px !important' }}> {/*Content of each video*/}
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontSize: '16px',
                                                display: '-webkit-box',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 2 // This will limit the text to 2 lines
                                            }}>
                                            {video.videoName}
                                        </Typography>
                                        {/*TODO Avatar*/}
                                        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}> {/*Box for Avatar and AuthorName*/}
                                            <Contacts /> {/*Avatar*/}
                                            <Typography variant="caption" sx={{ fontSize: '14px' }}>
                                                {users[video.ownerId] || 'Unknown User'}
                                            </Typography>
                                        </Box> {/*End of Avatar and AuthorName*/}
                                        <Box style={{ display: "flex", flexDirection: "row", gap: "10px" }}> {/*Box for Views and Date*/}
                                            <Typography variant="caption" sx={{ fontSize: '14px' }}>
                                                {video.videoInfo.contentViewsByUsers ? video.videoInfo.contentViewsByUsers.length : 0} views
                                            </Typography>
                                            <Typography variant="caption" sx={{ fontSize: '14px' }}>2 weeks ago</Typography> {/*Date*/}
                                        </Box> {/*End of Views and Date*/}
                                    </CardContent> {/*End of Content of each video*/}
                                </Card> {/*End of View for each video*/}
                            </Grid> /*End of Grid item for each video*/
                        ))
                    )}
                    {loadingMore && (
                        <Skeletons columns={columns} />
                    )}
                </Grid> {/*End of Grid container for video list*/}
            </Box>
            <Box display="flex" justifyContent="center" mt={2}> {/*Button for loading more videos*/}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleButton}
                    size="large">
                    Load More
                </Button>
            </Box>
            <Outlet /> {/*Outlet for nested routes*/}
        </Box>
    );
};

export default VideoListHorizontal;