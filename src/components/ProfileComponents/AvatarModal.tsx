import { Avatar, Badge, Stack, Typography, IconButton, Box } from '@mui/material';
import {useEffect, useState} from 'react';
import SliderModal from './SliderModal';
import AddIcon from '@mui/icons-material/Add';
import UpdateAvatarModal from './UpdateAvatarModal';
import {getUserAvatar} from "../getUserAvatar.tsx";

type Props = {
    none?: boolean;
    name?: string;
    lastname?: string;
    userId?: string;
};

const AvatarModal = ({ none, name, lastname, userId }: Props) => {
    const [userAvatar, setUserAvatar] = useState<string | null>(null);
    const [isOpenPhotoModal, setIsOpenPhotoModal] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [isUpdateAvatarModalOpen, setIsUpdateAvatarModalOpen] = useState(false);

    //Usage of arrows from left and right side of the photo
    const handleClickOutside = () => {
        setIsOpenPhotoModal(false);
    };

    //Usage of dots under the photo
    const handleClickInside = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleUpdateAvatarOpen = () => {
        setIsUpdateAvatarModalOpen(true);
    };

    const handleUpdateAvatarClose = () => {
        setIsUpdateAvatarModalOpen(false);
    };

    //#region useEffect for fetching user avatar
    useEffect(() => {
        const fetchAvatar = async () => {
            if (userId) {
                const userAvatar = await getUserAvatar(userId);
                if (typeof userAvatar === 'string') {
                    setUserAvatar(userAvatar);
                }
            }
        };

        fetchAvatar();
    }, [userId]);
    //#endregion useEffect for fetching user avatar

    return (
        <>
            <SliderModal
                isOpenPhotoModal={isOpenPhotoModal}
                handleClickOutside={handleClickOutside}
                handleClickInside={handleClickInside}
            />
            <UpdateAvatarModal
                open={isUpdateAvatarModalOpen}
                onClose={handleUpdateAvatarClose}
                userId={userId || ''}
            />
            <Stack
                direction="row"
                spacing={2}
                sx={{ display: 'flex', alignItems: 'center' }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Badge
                    color={none ? 'success' : 'default'}
                    variant="dot"
                    overlap="circular"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    sx={{
                        '& .MuiBadge-badge': {
                            width: 15,
                            height: 15,
                            borderRadius: '50%',
                        },
                    }}
                >
                    <Box sx={{ position: 'relative' }}>
                        <Avatar
                            src={userAvatar || ''}
                            alt="avatar"
                            sx={{
                                width: 70,
                                height: 70,
                                cursor: 'pointer',
                                position: 'relative',
                            }}
                            onClick={() => setIsOpenPhotoModal(true)}
                        />
                        {hovered && (
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    top: '80%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                                onClick={handleUpdateAvatarOpen}
                            >
                                <AddIcon />
                            </IconButton>
                        )}
                    </Box>
                </Badge>

                <Stack>
                    <Typography variant="h5">{name}</Typography>
                    <Typography variant="h5">{lastname}</Typography>
                </Stack>
            </Stack>
        </>
    );
};

export default AvatarModal;