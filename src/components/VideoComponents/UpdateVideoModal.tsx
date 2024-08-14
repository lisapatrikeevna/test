// UpdateVideoModal.tsx
import { useState, FC } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector} from '../../store/hooks.ts';
import { updateVideo } from '../../services/videoServices/video.upload.service.ts';
import {Modal, TextField, Button, Box, Typography, Select, MenuItem} from '@mui/material';
import {VideoData} from "../../pages/Videos/VideoEditPage.tsx";

interface UpdateVideoModalProps {
    isOpen: boolean;
    onClose: () => void;
    video: VideoData | null;
}

const UpdateVideoModal: FC<UpdateVideoModalProps> = ({ isOpen, onClose, video }) => {
    const [videoName, setVideoName] = useState(video?.videoName || '');
    const [description, setDescription] = useState(video?.description || '');
    const accessToken = useAppSelector(state => state.user.token.accessToken);
    const [isAccessibleToAll, setIsAccessibleToAll] = useState(video?.videoInfo.isAccessibleToAll || false);

    if (!isOpen || !video) return null;

    //#region updateVideo info on server
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const videoDetails = {
                videoId: video?.id,
                videoName,
                description,
                isAccessibleToAll
            };

            if (accessToken) {
                await updateVideo(videoDetails);
            }

            toast.success('Video updated successfully.');
            onClose();
        } catch (error) {
            console.error('Error updating video:', error);
        }
    };
    //#endregion updateVideo info on server

    return (
        <Modal open={isOpen} onClose={onClose} sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Box sx={{ width: 400, padding: 2, bgcolor: 'background.paper' }}>
                <Typography variant="h6" color="text.primary" sx={{display: 'flex', justifyContent: 'center'}}>
                    Update Video
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
                    <Box sx={{marginLeft: '12px'}}>
                    <Typography>Access settings</Typography>
                    <Select
                        value={isAccessibleToAll ? 'all' : 'subs'}
                        onChange={(event) => setIsAccessibleToAll(event.target.value === 'all')}
                    >
                        <MenuItem value={'all'}>All</MenuItem>
                        <MenuItem value={'subs'}>Subs</MenuItem>
                    </Select>
                    </Box>
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

export default UpdateVideoModal;