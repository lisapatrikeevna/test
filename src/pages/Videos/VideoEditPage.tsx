import { FC, useEffect, useState } from 'react';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Checkbox,
    CircularProgress
} from '@mui/material';
import AddVideoModal from "../../components/VideoComponents/AddVideoModal.tsx";
import { getVideosOfUser } from '../../services/videoServices/videoShow.service';
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.ts";
import PreviewImage from '../../components/VideoComponents/PreviewImage';
import UpdateVideoModal from "../../components/VideoComponents/UpdateVideoModal.tsx";

export interface VideoData {
    id: string;
    videoName: string;
    description: string;
    contentType: string;
    previewUrl: string;
    streamUrl: string;
    ownerId: string;
    videoInfo: {
        usersAccessList: string[];
        isAccessibleToAll: boolean;
        contentViewsByUsers: string[];
        contentLikesByUsers: string[];
        contentDislikesByUsers: string[];
    };
}

const VideoEditPage: FC = () => {
    const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false);
    const [isUpdateVideoModalOpen, setIsUpdateVideoModalOpen] = useState(false);
    const userId = useSelector((state: RootState) => state.user.user?.userId);
    const [editingVideo, setEditingVideo] = useState<VideoData | null>(null);
    const [rows, setRows] = useState<VideoData[]>([]);

    const handlePreviewImageClick = (video: VideoData) => {
        setEditingVideo(video);
        setIsUpdateVideoModalOpen(true);
    };

    const handleVideoUploaded = (newVideo: VideoData) => {
        setRows((prevRows) => {
            // Check if the video already exists in the rows
            const videoIndex = prevRows.findIndex(video => video.id === newVideo.id);
            if (videoIndex !== -1) {
                // Update the existing row with the new video data
                const updatedRows = [...prevRows];
                updatedRows[videoIndex] = newVideo;
                return updatedRows;
            }
            // Add the new video row
            return [...prevRows, newVideo];
        });
    };

    // Code for autoOpen AddVideoModal when click AddVideo on different page
    const [shouldOpenAddVideoModal, setShouldOpenAddVideoModal] = useState(false);
    useEffect(() => {
        if (shouldOpenAddVideoModal) {
            setIsAddVideoModalOpen(true);
            setShouldOpenAddVideoModal(false); // Reset the flag after opening the modal
        }
    }, [shouldOpenAddVideoModal]);

    useEffect(() => {
        if (!isAddVideoModalOpen && editingVideo) {
            setIsUpdateVideoModalOpen(true);
        }
    }, [isAddVideoModalOpen, editingVideo]);

    useEffect(() => {
        if (!userId) {
            // Handle the case where userId is undefined
            console.error('userId is undefined');
            return;
        }

        getVideosOfUser(userId)
            .then(data => {
                if (data) {
                    // If VideoMetadata and VideoData are the same
                    setRows(data as unknown as VideoData[]);

                    // If VideoMetadata and VideoData are not the same
                    // Transform the data to match the VideoData type
                    const transformedData = data.map(video => ({
                        // Copy all properties from the video object
                        ...video,
                        // Add or modify properties to match the VideoData type
                        // For example:
                        // newProperty: video.oldProperty
                    }));
                    setRows(transformedData);
                }
            });
    }, [userId]);

    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <h1>Заглушка для кнопки</h1>
                <Button variant="contained" onClick={() => setIsAddVideoModalOpen(true)}>
                    Add Video
                </Button>
            </Box>
            <AddVideoModal isOpen={isAddVideoModalOpen} onClose={() => setIsAddVideoModalOpen(false)} onVideoUploaded={handleVideoUploaded} />
            <UpdateVideoModal isOpen={isUpdateVideoModalOpen} onClose={() => setIsUpdateVideoModalOpen(false)} video={editingVideo} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Video</TableCell>
                            <TableCell>Name, Description</TableCell>
                            <TableCell>In Progress</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Views</TableCell>
                            <TableCell>% "Like"</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>
                                <TableCell>
                                    {row.previewUrl ? (
                                        <PreviewImage videoId={row.id} maxWidth={153} maxHeight={86} onClick={() => handlePreviewImageClick(row)} />
                                    ) : (
                                        <CircularProgress />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <h5>{row.videoName}</h5>
                                    <h6>{row.description}</h6>
                                </TableCell>
                                <TableCell>
                                    {/* {row.videoInfo.isAccessibleToAll ? 'Доступно всем' : 'Не доступно всем'} */}
                                </TableCell>
                                <TableCell>
                                    Текст
                                </TableCell>
                                <TableCell>
                                    {row.videoInfo.contentViewsByUsers.length}
                                </TableCell>
                                <TableCell>
                                    {row.videoInfo.contentLikesByUsers.length + row.videoInfo.contentDislikesByUsers.length > 0 ?
                                        Math.round((row.videoInfo.contentLikesByUsers.length / (row.videoInfo.contentLikesByUsers.length + row.videoInfo.contentDislikesByUsers.length)) * 100)
                                        : 0
                                    }%
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default VideoEditPage;
