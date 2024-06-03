import { useState, useEffect, FC } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../store/hooks.ts';
import { addVideo, setVideoUrl, setBuffering } from '../../store/video/videoSlice';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';
import {uploadVideo} from "../../services/videoServices/video.upload.service.ts";

interface AddVideoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddVideoModal: FC<AddVideoModalProps> = ({ isOpen, onClose }) => {
    const [videoName, setVideoName] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState<File | null>(null);
    const [selectedVideoName, setSelectedVideoName] = useState<string | null>(null);
    const accessToken = useAppSelector(state => state.user.token.accessToken);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (video) {
            const reader = new FileReader();
            reader.readAsDataURL(video);
            reader.onloadend = () => {};
        }
    }, [video]);

    if (!isOpen) return null;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (!video) {
                toast.error('Please select a video.');
                return;
            }

            const formData = new FormData();
            formData.append('videoName', videoName);
            formData.append('description', description);
            formData.append('file', video);

            if (accessToken) {
                const uploadedVideoUrl = await uploadVideo(formData); // Get the URL of the uploaded video
                if (typeof uploadedVideoUrl === 'string') {
                    dispatch(addVideo({ id: generateId(), title: videoName, file: uploadedVideoUrl })); // use the URL of the uploaded video
                    dispatch(setVideoUrl(uploadedVideoUrl));
                    dispatch(setBuffering(false));
                }
            }

            toast.success('Video uploaded successfully.');
            setSelectedVideoName(null); // reset selected video name after successful upload
            onClose();
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };

    const handleVideoChange = (selectedVideo: File) => {
        setVideo(selectedVideo);
        setSelectedVideoName(selectedVideo.name); // update selected video name
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={{ width: 400, padding: 2, bgcolor: 'background.paper' }}>
                <Typography variant="h6" component="h2">
                    Add Video
                </Typography>
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Video Name"
                        value={videoName}
                        onChange={(e) => setVideoName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload Video
                        <input
                            type="file"
                            hidden
                            accept="video/*"
                            onChange={(event) => {
                                event.target.files && handleVideoChange(event.target.files[0]);
                            }}
                        />
                    </Button>
                    {selectedVideoName && <Typography variant="subtitle1">{selectedVideoName}</Typography>}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AddVideoModal;

function generateId() {
    // Replace this with your actual ID generation logic
    return Math.random().toString(36).substr(2, 9);
}