import { FC, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getVideo, getVideoMetadata } from '../../services/videoServices/videoShow.service';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setBuffering, setError, setLoading, setVideoUrl } from '../../store/video/videoSlice';
import VideoListHorizontal from '../../components/VideoComponents/VideoListHorizontal.tsx';
import {Grid, Paper, Typography, Container, Skeleton, Button, Box} from "@mui/material";
import {Contacts, Flag, IosShare, JoinFull, ThumbDown, ThumbUp} from "@mui/icons-material";


const VideoPage: FC = () => {
    const { id } = useParams();
    const videoId = id as string;
    const dispatch = useDispatch();
    const { videoUrl, buffering, loading } = useSelector((state: RootState) => state.video);

    const [videoName, setVideoName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const loadVideo = async () => {
            if (videoId) {
                dispatch(setLoading(true));
                try {
                    const videoData = await getVideo(videoId);
                    const metadata = await getVideoMetadata(videoId);
                    setVideoName(metadata.videoName);
                    setDescription(metadata.description);
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
    }, [videoId, dispatch]);

    // Display a skeleton while loading data
    if (loading) {
        return (
            <Container>
                <Skeleton variant="rectangular" width={1200} height={800} />
                <Skeleton />
                <Skeleton width="60%" />
            </Container>
        );
    }

    // Display real data when it's loaded
    return (
        <Grid container spacing={3} style={{flexWrap: 'nowrap', justifyContent: 'center'}}>
            <Grid item xs={12} md={8} style={{ display: 'flex', alignItems: 'flex-start', maxWidth: '1200px' }}>
                {/*VideoContainer*/}
                <Container style={{ padding: 0 }}>
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
                        />
                    ) : (
                        <Typography>Loading...</Typography>
                    )}
                    {buffering && <Typography>Buffering...</Typography>}
                    {/*Container for video full description*/}
                    <Box>
                        <Typography variant="h4">{videoName}</Typography>
                        {/*Container for video metadata*/}
                        <Container style={{display: 'flex', flexDirection: 'row'}}>
                            {/*Container for all userInfo*/}
                            <Container style={{display: 'flex', flexDirection: 'row'}}>
                                {/*Container for views, data, userAvatar, userName*/}
                                <Container style={{display: 'flex', flexDirection: 'column'}}>
                                    {/*Container for views,data*/}
                                    <Container style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                                        {/*<Typography>{viewCount}</Typography>*/}
                                        <Typography>63555 views</Typography>
                                        {/*<Typography>{viewLikes}</Typography>*/}
                                        <Typography>2 weeks ago</Typography>
                                    </Container>
                                    {/*Container for userAvatar, userName*/}
                                    <Container style={{display: 'flex', flexDirection: 'row'}}>
                                        <Contacts/>
                                        <Typography>UnknownUser</Typography>
                                    </Container>
                                </Container>

                                {/*Container for like, dislike, share*/}
                                <Container style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                                    <ThumbUp/>
                                    <Typography>255</Typography>
                                    <ThumbDown/>
                                    <Button variant='text' size='small' startIcon={<JoinFull/>}>Subscribe</Button>
                                    <Button variant='text' startIcon={<Flag/>}>Report</Button>
                                    <Button variant='text' startIcon={<IosShare/>}>Share</Button>
                                </Container>
                            </Container>
                        </Container>
                        {/*Box for Description*/}
                        <Box>
                            {/*Typography for Description*/}
                            <Typography variant='h5'>Description</Typography>
                            <Typography>
                                {description}
                            </Typography>
                        </Box>
                    </Box>

                    <Container style={{ padding: 0 }}>
                        <Paper elevation={3}>
                            <VideoListHorizontal />
                        </Paper>
                    </Container>

                    {/* Здесь можно добавить компонент комментариев */}
                </Container>
            </Grid>

        </Grid>
    );
}

export default VideoPage;