import { useState, FC } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector} from '../../store/hooks.ts';
import { Modal, Button, Box, Typography, CircularProgress } from '@mui/material';
import { uploadVideo } from '../../services/videoServices/video.upload.service.ts';
import { VideoData } from '../../pages/Videos/VideoEditPage.tsx';

interface AddVideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVideoUploaded: (video: VideoData) => void;
}

//TODO убрать логику вызова edit так как система бэка пока не позволяет этим пользоваться

const AddVideoModal: FC<AddVideoModalProps> = ({ isOpen, onClose, onVideoUploaded }) => {
    const accessToken = useAppSelector(state => state.user.token.accessToken);
    const [isUploading, setIsUploading] = useState(false);


    if (!isOpen) return null;

    const handleVideoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedVideo = event.target.files?.[0];
        if (!selectedVideo) {
            toast.error('Please select a video.');
            return;
        }

        setIsUploading(true);

        // Generate the video name based on the current date and time
        const videoName = selectedVideo.name;

        // Add a new row with the loader
        const newVideo: VideoData = {
            id: generateId(),
            videoName,
            description: '',
            contentType: selectedVideo.type,
            previewUrl: '', // Empty for now
            streamUrl: '',
            ownerId: '',
            videoInfo: {
                usersAccessList: [],
                isAccessibleToAll: false,
                contentViewsByUsers: [],
                contentLikesByUsers: [],
                contentDislikesByUsers: [],
            },
        };
        onVideoUploaded(newVideo);

        // Update the video name and description if they have been changed
        const formData = new FormData();
        formData.append('videoName', videoName);
        formData.append('description', '');
        formData.append('file', selectedVideo);

        if (accessToken) {
            try {
                const uploadedVideoUrl = await uploadVideo(formData);
                if (typeof uploadedVideoUrl === 'string') {
                    // Update the new video with the uploaded URL
                    newVideo.previewUrl = uploadedVideoUrl;
                    onVideoUploaded(newVideo);
                    toast.success('Video uploaded successfully.');
                }
            } catch (error) {
                toast.error('Error uploading video.');
            } finally {
                setIsUploading(false);
            }
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Box sx={{ width: 400, padding: 2, bgcolor: 'background.paper' }}>
                <Typography variant="h6" color="text.primary" sx={{ display: 'flex', justifyContent: 'center' }}>
                    Add Video
                </Typography>
                <Button
                    variant="contained"
                    component="label"
                    disabled={isUploading}
                >
                    Upload Video
                    <input
                        type="file"
                        hidden
                        onChange={handleVideoUpload}
                    />
                </Button>
                {isUploading && <CircularProgress />}
            </Box>
        </Modal>
    );
};

export default AddVideoModal;

function generateId() {
    // Replace this with your actual ID generation logic
    return Math.random().toString(36).substr(2, 9);
}
