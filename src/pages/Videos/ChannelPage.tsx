import { FC } from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import VideoListHorizontal from "../../components/VideoComponents/VideoListHorizontal.tsx";
import SearchField from "../../components/VideoComponents/SearchField.tsx";



// interface Video {
//     id: string;
//     title: string;
//     thumbnail: string;
//     views: number;
// }

const ChannelPage: FC = () => {
    // const [videos, setVideos] = useState<Video[]>([]);
    // useEffect(() => {
    //     //TODO Выгружать видео конкретно этого пользователя
    //     const fetchVideos = async () => {
    //         try {
    //             const response = await axios.get('/api/videos'); // Подставьте свой реальный эндпоинт
    //             setVideos(response.data);
    //         } catch (error) {
    //             console.error('Error fetching videos:', error);
    //         }
    //     };
    //
    //     fetchVideos();
    // }, []);

    return (
        <Grid container spacing={2} justifyContent="center" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Grid item xs={6} container justifyContent="center">
                <div style={{ maxWidth: '500px' }}>
                    <SearchField
                        onSearch={() => {
                            // your search logic
                        }}
                    />
                </div>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4" align="center">The User Channel</Typography>
            </Grid>
            <Grid item xs={12}>
                <Paper elevation={3}>
                    <img
                        src="https://cdn.pixabay.com/photo/2020/03/26/19/37/poppies-4971583_640.jpg"
                        alt="Banner"
                        style={{ maxWidth: '1200px', maxHeight: '200px', width: '100%' }}
                    />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <VideoListHorizontal />

            </Grid>
        </Grid>
    );
};

export default ChannelPage;
