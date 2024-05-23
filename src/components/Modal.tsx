import { FC } from "react";
import { Dialog, DialogContent, styled, Theme, Box } from '@mui/material';
import NeuButton from './neumorphism/button/NeuButton';
import CardComponent from "./CardComponent.tsx"; 

// Define styles for MUI components
const StyledDialog = styled(Dialog)({
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(5px)',
});

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    padding: '0 !important', // Убираем padding
    boxShadow: 'none', // Убираем тени
    border: 'none', // Убираем бордеры
}));

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    height?: string;
    width?: string;
    children: React.ReactNode;
    showCloseButton?: boolean;
    theme?: Theme;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, height, width, children, theme, showCloseButton = true }) => {
    if (!isOpen) return null;
    const bttnHeight = '50px';
    const bttnWidth = '150px';
    return (
        <StyledDialog open={isOpen} onClose={onClose}>
            <StyledDialogContent theme={theme}>
                <CardComponent
                    cardHeight={height ? height : 'auto'}
                    cardWidth={width ? width : 'auto'}
                >
                    {children}
                    <Box>
                        {showCloseButton && (
                            <NeuButton
                                sx={{ width: bttnWidth, height: bttnHeight }}
                                onClick={onClose}
                            >
                                Close
                            </NeuButton>
                        )}
                    </Box>
                </CardComponent>
            </StyledDialogContent>
        </StyledDialog>
    );
};

export default Modal;
