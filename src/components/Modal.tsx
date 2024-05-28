import { FC } from "react";
import { Dialog, DialogContent, styled, Theme, Box } from '@mui/material';

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

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    height?: string;
    width?: string;
    children: React.ReactNode;
    showCloseButton?: boolean;
    theme?: Theme;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, height, width, children, theme }) => {
    if (!isOpen) return null;

    return (
        <StyledDialog open={isOpen} onClose={onClose}>
            <StyledDialogContent theme={theme}>
                <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
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
