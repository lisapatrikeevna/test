import React, { useState } from 'react';
import {
    Modal,
    Box,
    Button,
    Typography,
    IconButton,
    Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { updateAvatarService } from '../../services/userServices/updateAvatar.service.ts';

type UpdateAvatarModalProps = {
    open: boolean;
    onClose: () => void;
    userId: string;
};

const UpdateAvatarModal = ({ open, onClose, userId  }: UpdateAvatarModalProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    //#region useEffect handleImageChange
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    //#endregion useEffect handleImageChange

    //#region useEffect handleSubmit
    const handleSubmit = async () => {
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result?.toString().split(',')[1];
                if (base64String) {
                    await updateAvatarService({ id: userId, avatarFile: base64String }); // Pass userId to updateAvatarService
                    onClose();
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    //#endregion useEffect handleSubmit

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="update-avatar-modal"
            aria-describedby="update-avatar-modal-description"
        >
            <Box
                sx={{
                    width: 600,
                    height: 600,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box
                    sx={{
                        width: 600,
                        height: 550,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {selectedImage ? (
                        <Avatar
                            src={selectedImage}
                            alt="Selected avatar"
                            sx={{ width: 200, height: 200 }}
                        />
                    ) : (
                        <Typography variant="h6">No Image Selected</Typography>
                    )}
                </Box>
                <Box
                    sx={{
                        width: 600,
                        height: 50,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Button variant="contained" component="label">
                        Choose Image
                        <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                        />
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={!selectedImage}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UpdateAvatarModal;
