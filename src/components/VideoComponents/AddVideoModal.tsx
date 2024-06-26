import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { TextField, Button, Box, Typography } from '@mui/material';
import { uploadVideo } from '../../services/videoServices/video.upload.service.ts';
import Modal from "../Modal.tsx";
import { useTheme } from '@mui/material/styles';

interface AddVideoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddVideoModal: React.FC<AddVideoModalProps> = ({ isOpen, onClose }) => {
    const [videoName, setVideoName] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState<File | null>(null);
    const [selectedVideoName, setSelectedVideoName] = useState<string | null>(null);
    const theme = useTheme();

    useEffect(() => {
        if (video) {
            const reader = new FileReader();
            reader.readAsDataURL(video);
            reader.onloadend = () => {};
        }
    }, [video]);

    if (!isOpen) return null;

    //#region send file with info to server
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

            await uploadVideo(formData);

            toast.success('Video uploaded successfully.');
            setSelectedVideoName(null); // reset selected video name after successful upload
            onClose();
        } catch (error) {
            console.error('Error uploading video:', error);
        }
    };
      //#endregion send file with info to server

    //#region update info about video
    const handleVideoChange = (selectedVideo: File) => {
        setVideo(selectedVideo);
        setVideoName(selectedVideo.name); // use name of file in videoName field
        setSelectedVideoName(selectedVideo.name); // update selected video name
    };
    //endregion update info about video


    return (
        <Modal isOpen={isOpen} onClose={onClose} width="500px">
            <Box sx={{ height: '400px', width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ padding: theme.spacing(3), width: '100%' }}>
                <Typography variant="h4" >
                    Add Video
                </Typography>
                <form onSubmit={handleSubmit} autoComplete='off'>
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Video Name"
                        value={videoName}
                        onChange={(e) => setVideoName(e.target.value)}
                        InputLabelProps={{
                            style: {
                                color: theme.palette.text.primary,
                            },
                        }}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        InputLabelProps={{
                            style: {
                                color: theme.palette.text.primary,
                            },
                        }}
                    />
                    <Button
                        variant="contained"
                        style={{
                            color: theme.palette.text.primary,
                        }}
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
                        style={{
                            color: theme.palette.text.primary,
                        }}
                    >
                        Submit
                    </Button>
                </form>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddVideoModal;

