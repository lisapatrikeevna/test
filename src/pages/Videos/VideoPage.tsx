import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getVideo, getVideoMetadata } from '../../services/videoServices/videoShow.service';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { setBuffering, setError, setLoading, setVideoUrl } from '../../store/video/videoSlice';
import VideoListVertical from '../../components/VideosComponents/VideoListVertical';
import {Grid, Paper, Typography, Container, Skeleton} from "@mui/material";


const VideoPage: React.FC = () => {
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

    // Отображение скелетона во время загрузки данных
    if (loading) {
        return (
            <Container>
                <Skeleton variant="rectangular" width={1200} height={800} />
                <Skeleton />
                <Skeleton width="60%" />
            </Container>
        );
    }

    //Отображение реальных данных после загрузки
    return (
        <Grid container spacing={3} style={{flexWrap: 'nowrap', justifyContent: 'space-between'}}>
            <Grid item xs={12} md={8} style={{ display: 'flex', alignItems: 'flex-start', maxWidth: '1200px' }}>
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
                    <Typography variant="h4">{videoName}</Typography>
                    <Typography>{description}</Typography>
                    {/* Здесь можно добавить компонент комментариев */}
                </Container>
            </Grid>
            <Grid item xs={12} md={4} style={{ display: 'flex', alignItems: 'flex-start', maxWidth: '300px', marginRight: '100px' }}>
                <Container style={{ padding: 0 }}>
                    <Paper elevation={3}>
                        <VideoListVertical />
                    </Paper>
                </Container>
            </Grid>
        </Grid>
    );
}

export default VideoPage;