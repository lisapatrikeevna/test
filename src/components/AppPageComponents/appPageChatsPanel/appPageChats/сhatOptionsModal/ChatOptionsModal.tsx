import { Modal, Box, Stack, Typography } from '@mui/material';
import styles from './styles.ts';
import {OPTIONS} from "./constants.tsx";

interface ChatOptionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    modalPosition: { top: number; left: number };
}

export const ChatOptionsModal = ({ isOpen, onClose, modalPosition }:ChatOptionsModalProps) => (
    <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box
            display="flex"
            flexDirection="column"
            gap={1}
            sx={{
                ...styles.modalContainer,
                top: modalPosition.top,
                left: modalPosition.left,
            }}
        >
            {OPTIONS.map((item, index) => (
                <Stack
                    key={index}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={styles.iconStack}
                >
                    {item.icon}
                    <Typography>{item.label}</Typography>
                </Stack>
            ))}
        </Box>
    </Modal>
);