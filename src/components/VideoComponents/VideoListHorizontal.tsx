import React, { useState, useEffect } from "react";
import {  Outlet } from "react-router-dom";
import { instance } from "../../api/axios.api.ts";
import PreviewImage from "./PreviewImage.tsx";
import {Grid, Card, CardContent, Typography, Box, Button, Avatar} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import VideoListHorizontalSkeleton from './VideoListHorizontalSkeleton.tsx';
import { getAllUsers } from "../../services/userServices/getAllUsers.service.ts";
import { RenderValuesCentralComponent } from "../../pages/AppPage.tsx";
import { getUserAvatar } from "../getUserAvatar.tsx";

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
    panelWidth: number;
    changeRenderCentralComponent: (value: RenderValuesCentralComponent, videoId?: string) => void;
}

const VideoListHorizontal: React.FC<VideoListHorizontalProps> = ({ currentVideoId, panelWidth, changeRenderCentralComponent }) => {
    const [videos, setVideos] = useState<IVideo[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [visibleCount, setVisibleCount] = useState(0);
    const [users, setUsers] = useState<{ [key: string]: string }>({}); // To store user data
    const currentWidth = window.innerWidth * (panelWidth / 100) - (65 * panelWidth/100);
    const [userAvatar, setUserAvatar] = useState<string | null>(null);
    const userId = videos[0]?.ownerId;

    //#region get info about one Video
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
    //#endregion get info about one Video

    //#region get info about all Videos
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
    //#endregion get info about all Videos

    //#region get all Users
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
    //#endregion get all Users

    //#region Give the user some time to load the videos and users
    useEffect(() => {
        const loadVideosAndUsers = async () => {
            setLoading(true);
            await Promise.all([fetchVideos(), fetchUsers()]);
            setLoading(false);
        };
        const timer = setTimeout(loadVideosAndUsers, 500);
        return () => clearTimeout(timer);
    }, []);
    //#endregion Give the user some time to load the videos and users

    //#region Sizes for adaptation
    //TODO check to simplify
    const isXSmall = useMediaQuery(`(${currentWidth}:400px)`);
    const isSmall = useMediaQuery(`(${currentWidth}:600px)`);
    const isMedium = useMediaQuery(`(${currentWidth}:960px)`);
    const isLarge = useMediaQuery(`(${currentWidth}:1280px)`);
    const isXLarge = useMediaQuery(`(${currentWidth}:1600px)`);
    //#endregion Sizes for adaptation

    //#region getting avatar of every user
    useEffect(() => {
        const fetchAvatar = async () => {
            if (userId) {
                const userAvatar = await getUserAvatar(userId);
                if (typeof userAvatar === 'string') {
                    setUserAvatar(userAvatar);
                }
            }
        };

        fetchAvatar();
    }, [userId]);
    //#endregion getting avatars of every user

    //Number of columns of videos, depends on size
    const columns = isXSmall ? 1 : isSmall ? 2 : isMedium ? 3 : isLarge ? 4 : isXLarge ? 5 : 6;
    const initialVisibleCount = columns * 2;

    useEffect(() => {
        setVisibleCount(initialVisibleCount);
    }, [columns]);

    //#region button loadMore that show us more Videos
    const handleLoadMore = async () => {
        setLoadingMore(true);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulating loading delay
        setVisibleCount((prevCount) => prevCount + columns * 2);
        setLoadingMore(false);
    };
    //#endregion button loadMore that show us more Videos

    // Filter out the current video from the list
    const filteredVideos = videos.filter(video => video.id !== currentVideoId);

    return (
        <Box sx={{ padding: "10px"}}>
            <Box sx={{ maxWidth: "100%", margin: "0 auto" }}>
                <Grid container spacing={2} sx={{ justifyContent: "center"}}> {/*Grid container for video list*/}

                    {loading ? (
                        <VideoListHorizontalSkeleton columns={columns} />
                    ) : (
                        filteredVideos.slice(0, visibleCount).map((video) => (
                            <Grid item key={video.id} xs={12 / columns}>
                                <Card sx={{ height: "100%" }}> {/*View of each video*/}
                                    <PreviewImage
                                        videoId={video.id}
                                        maxWidth={350}
                                        maxHeight={180}
                                        onClick={() => changeRenderCentralComponent('videopage', video.id)}
                                    />
                                    <CardContent sx={{ paddingBottom: '16px !important' }}>
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
                                            <Avatar
                                                src={userAvatar || ''}
                                                sx={{
                                                    cursor: 'pointer',
                                                    position: 'relative',
                                                    backgroundColor: userAvatar ? (userAvatar.startsWith('#') ? userAvatar : undefined) : undefined
                                                }}
                                            />
                                            <Typography variant="caption" sx={{ fontSize: '14px' }}>
                                                {users[video.ownerId] || 'Deleted User'}
                                            </Typography>
                                        </Box>
                                        <Box style={{ display: "flex", flexDirection: "row", gap: "10px" }}> {/*Box for Views and Date*/}
                                            <Typography variant="caption" sx={{ fontSize: '14px' }}>
                                                {video.videoInfo.contentViewsByUsers ? video.videoInfo.contentViewsByUsers.length : 0} views
                                            </Typography>
                                            <Typography variant="caption" sx={{ fontSize: '14px' }}>2 weeks ago</Typography> {/*Date*/}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                    {loadingMore && (
                        <VideoListHorizontalSkeleton columns={columns} />
                    )}
                </Grid>
            </Box>
            <Box display="flex" justifyContent="center" mt={2}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLoadMore}
                    size="large">
                    Load More
                </Button>
            </Box>
            <Outlet />
        </Box>
    );
};

export default VideoListHorizontal;