import React from "react";
import { Dialog, DialogContent, styled, Theme } from '@mui/material';

import CardComponent from "./CardComponent.tsx"; //

// Определяем стили для MUI компонентов
const StyledDialog = styled(Dialog)({
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(5px)',

});

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.background.default,

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

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, height, width, children, theme, showCloseButton = true }) => {
    console.log('Modal rendered, isOpen:', isOpen);
    if (!isOpen) return null;
    const bttnHeight = '50px';
    const bttnWidth = '150px';
    return (
        <StyledDialog open={isOpen} onClose={onClose} >
            <StyledDialogContent theme={theme} >
                <CardComponent
                    cardHeight={height ? height : 'auto'}
                    cardWidth={width ? width : 'auto'}
                >
                    {children}
                    <div>
                        {showCloseButton && (
                            <button
                                style={{ width: bttnWidth, height: bttnHeight }}
                                onClick={onClose}
                            >
                                Close
                            </button>
                        )}
                    </div>
                </CardComponent>
            </StyledDialogContent>
        </StyledDialog>
    );
};
export default Modal;