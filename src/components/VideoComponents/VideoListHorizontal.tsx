import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { instance } from "../../api/axios.api.ts";
import PreviewImage from "./PreviewImage.tsx";
import {mediaPath} from "../../configs/RouteConfig.tsx";
import { Grid, Card, CardContent, Typography, Skeleton } from "@mui/material";

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
    const [loading, setLoading] = useState(true); // Создайте локальное состояние loading

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
            setLoading(true); // Установите состояние загрузки в true при начале загрузки
            if (videoIds.length === 0) {
                // Запрос на получение всех видео
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
                // Запрос на получение видео по идентификаторам
                const fetchPromises = videoIds.map(fetchVideo);
                const results = await Promise.allSettled(fetchPromises);
                const videos = results
                    .filter((result): result is PromiseFulfilledResult<IVideo> => result.status === 'fulfilled')
                    .map(result => result.value);
                setVideos(videos);
            }
            setLoading(false); // Установите состояние загрузки в false по завершении загрузки
        };

        const timer = setTimeout(() => {
            fetchVideos();
        }, 500);

        // Очистка таймера при размонтировании компонента
        return () => clearTimeout(timer);
    }, []); // Пустой массив зависимостей, чтобы useEffect вызывался только при монтировании компонента


    return (
        <Grid container spacing={2}>
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
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Skeleton variant="rectangular" width="100%" height={180}/>
                        <Skeleton/>
                        <Skeleton width="60%"/>
                    </Grid>
                ))
            )}
        </Grid>
    );
};

export default VideoListHorizontal;