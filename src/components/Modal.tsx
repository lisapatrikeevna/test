import { FC } from "react";
import { Dialog, DialogContent, styled, Theme, Box } from '@mui/material';
import NeuIconButton from "./neumorphism/button/NeuIconButton";
import CloseIcon from '@mui/icons-material/Close';

const StyledDialog = styled(Dialog)({
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(5px)',
});

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme?.palette.background.default,
    padding: '0 !important',
    boxShadow: 'none',
    border: 'none',
}));

const CloseButton = styled(NeuIconButton)(({ theme }) => ({
    position: 'fixed',
    top: theme?.spacing(1),
    right: theme?.spacing(1),
    zIndex: 1000,
    minWidth: '40px',
    padding: '6px',
    '&:hover': {
        backgroundColor: theme?.palette.mode === 'light' ? '#f0f0f0' : '#2c2c2c',
    },
    boxShadow: 'none'
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

    return (
        <StyledDialog open={isOpen} onClose={onClose}>
            <StyledDialogContent theme={theme}>
                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                    {showCloseButton && (
                        <CloseButton
                            rounded
                            onClick={onClose}
                        >
                            <CloseIcon />
                        </CloseButton>
                    )}
                    <Box
                        sx={{
                            height: height ? height : 'auto',
                            width: width ? width : 'auto',
                            overflowY: 'auto',
                            padding: '20px',
                        }}
                    >
                        {children}
                    </Box>
                </Box>
            </StyledDialogContent>
        </StyledDialog>
    );
};

export default Modal;
