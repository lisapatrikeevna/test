import { FC } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../store/hooks.ts';
import { addVideo, setVideoUrl, setBuffering } from '../../store/video/videoSlice';
import { Modal,  Button, Box, Typography } from '@mui/material';
import {uploadVideo} from "../../services/videoServices/video.upload.service.ts";

interface AddVideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVideoUploaded: () => void;
}

const AddVideoModal: FC<AddVideoModalProps> = ({ isOpen, onClose, onVideoUploaded }) => {
    const accessToken = useAppSelector(state => state.user.token.accessToken);
    const dispatch = useAppDispatch();

    if (!isOpen) return null;

    const handleVideoChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedVideo = event.target.files?.[0];
        if (!selectedVideo) {
            toast.error('Please select a video.');
            return;
        }

        // Generate the video name based on the current date and time
        const videoName = selectedVideo.name;

        // Update the video name and description if they have been changed
        const formData = new FormData();
        formData.append('videoName', videoName);
        formData.append('description', ''); // Set description as empty string
        formData.append('file', selectedVideo);

        if (accessToken) {
            const uploadedVideoUrl = await uploadVideo(formData);
            if (typeof uploadedVideoUrl === 'string') {
                dispatch(addVideo({ id: generateId(), title: videoName, file: uploadedVideoUrl }));
                dispatch(setVideoUrl(uploadedVideoUrl));
                dispatch(setBuffering(false));
            }
        }

        toast.success('Video uploaded successfully.');
        onVideoUploaded(); // Call the onVideoUploaded function
    };

    return (
        <Modal open={isOpen} onClose={onClose} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Box sx={{ width: 400, padding: 2, bgcolor: 'background.paper' }}>
                <Typography variant="h6" color="text.primary" sx={{display: 'flex', justifyContent: 'center'}}>
                    Add Video
                </Typography>
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload Video
                    <input
                        type="file"
                        hidden
                        onChange={handleVideoChange}
                    />
                </Button>
            </Box>
        </Modal>
    );
};

export default AddVideoModal;

function generateId() {
    // Replace this with your actual ID generation logic
    return Math.random().toString(36).substr(2, 9);
}