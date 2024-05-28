import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVideo, getVideoMetadata } from '../../services/videoServices/videoShow.service';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setError, setLoading, setVideoUrl, setBuffering } from '../../store/video/videoSlice';
import { Grid, Paper, Typography, Container, Skeleton, Button, Box } from "@mui/material";
import { Contacts, Flag, IosShare, JoinFull, ThumbDown, ThumbUp } from "@mui/icons-material";
import { useLikeHandler } from '../../components/VideoComponents/useVideoHandlers/UseLikeProgress.tsx';
import VideoListHorizontal from "../../components/VideoComponents/VideoListHorizontal";
import { useViewProgress } from '../../components/VideoComponents/useVideoHandlers/UseViewProgress.tsx';

const VideoPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const videoId = id as string;
    const dispatch = useDispatch();
    const { videoUrl, buffering, loading } = useSelector((state: RootState) => state.video);

    const [videoName, setVideoName] = useState('');
    const [description, setDescription] = useState('');
    const [views, setViews] = useState(0);
    const [videoDuration, setVideoDuration] = useState(0);

    const { handleVideoProgress } = useViewProgress(videoDuration, videoId);
    const { likes, hasLiked, handleLike, hasDisliked, handleDislike, setLikes } = useLikeHandler(videoId);

    useEffect(() => {
        const loadVideo = async () => {
            if (videoId) {
                dispatch(setLoading(true));
                try {
                    const videoData = await getVideo(videoId);
                    const metadata = await getVideoMetadata(videoId);
                    setVideoName(metadata.videoName);
                    setDescription(metadata.description);
                    setViews(metadata.videoInfo.contentViewsByUsers.length);
                    setLikes(metadata.videoInfo.contentLikesByUsers.length);

                    let blobUrl = '';
                    if (videoData) {
                        blobUrl = URL.createObjectURL(videoData);
                        dispatch(setVideoUrl(blobUrl));
                    } else {
                        console.error('Video data is null');
                    }
                } catch (error) {
                    const err = error as Error;
                    console.error('Error loading video:', err);
                    dispatch(setError(err.message));
                } finally {
                    dispatch(setLoading(false));
                }
            }
        };

        loadVideo();
    }, [videoId, dispatch, setLikes]);

    if (loading) {
        return (
            <Container>
                <Skeleton variant="rectangular" width={1200} height={800} />
                <Skeleton />
                <Skeleton width="60%" />
            </Container>
        );
    }

    return (
        <Grid container spacing={3} style={{ flexWrap: 'nowrap', justifyContent: 'center' }}>
            <Grid item xs={12} md={8} style={{ display: 'flex', alignItems: 'flex-start', maxWidth: '1200px' }}>
                <Box style={{ padding: 0 }}>
                    {videoUrl ? (
                        <ReactPlayer
                            style={{ margin: 0 }}
                            width='100%'
                            height='auto'
                            url={videoUrl}
                            controls={true}
                            playing={false}
                            type="video/mp4"
                            onBuffer={() => dispatch(setBuffering(true))}
                            onBufferEnd={() => dispatch(setBuffering(false))}
                            config={{ file: { attributes: { preload: 'metadata' } } }}
                            onProgress={(state) => handleVideoProgress(state)}
                            onDuration={setVideoDuration}
                        />
                    ) : (
                        <Typography>Loading...</Typography>
                    )}
                    {buffering && <Typography>Buffering...</Typography>}
                    <Box>
                        <Typography variant="h4">{videoName}</Typography>
                        <Container style={{ display: 'flex', flexDirection: 'row' }}>
                            <Container style={{ display: 'flex', flexDirection: 'row' }}>
                                <Container style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Container style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                        <Typography>{views} views</Typography>
                                        <Typography>2 weeks ago</Typography>
                                    </Container>
                                    <Container style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Contacts />
                                        <Typography>UnknownUser</Typography>
                                    </Container>
                                </Container>
                                <Container style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                                    <Button
                                        variant="outlined"
                                        startIcon={<ThumbUp />}
                                        onClick={handleLike}
                                        color={hasLiked ? 'primary' : 'inherit'}
                                    >
                                        {likes}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        startIcon={<ThumbDown />}
                                        onClick={handleDislike}
                                        color={hasDisliked ? 'primary' : 'inherit'}
                                    />
                                    <Button variant='text' size='small' startIcon={<JoinFull />}>Subscribe</Button>
                                    <Button variant='text' startIcon={<Flag />}>Report</Button>
                                    <Button variant='text' startIcon={<IosShare />}>Share</Button>
                                </Container>
                            </Container>
                        </Container>
                        <Box>
                            <Typography variant='h5'>Description</Typography>
                            <Typography>{description}</Typography>
                        </Box>
                    </Box>
                    <Box style={{ padding: 0 }}>
                        <Paper elevation={3}>
                            <VideoListHorizontal />
                        </Paper>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default VideoPage;
