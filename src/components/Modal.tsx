import React from "react";
import { Dialog, DialogContent, styled } from '@mui/material';

// Импортируем стили
import '../styles/Modal.module.css';
import CardComponent from "./CardComponent.tsx"; // Это файл стилей, где содержатся neumorph стили

// Определяем стили для MUI компонентов
const StyledDialog = styled(Dialog)({
    // Добавляем стили из Modal.module.css для .modal_backdrop
    '&.modal_backdrop': {
        position: 'absolute',
        padding: '20px',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1001,
    },
});

const StyledDialogContent = styled(DialogContent)({
    // Добавляем стили из Modal.module.css для .modal
    '&.modal': {
        padding: '20px',
        borderRadius: '5px',
        zIndex: 1001,
        minHeight: '500px',
        minWidth: '500px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    height?: string;
    width?: string;
    children: React.ReactNode;
    showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, height, width, children, showCloseButton = true }) => {
    console.log('Modal rendered, isOpen:', isOpen);
    if (!isOpen) return null;
    const bttnHeight = '50px';
    const bttnWidth = '150px';
    return (
        <StyledDialog open={isOpen} onClose={onClose} className="modal_backdrop">
            <StyledDialogContent className="modal">
                <CardComponent
                    cardHeight={height ? height : 'auto'}
                    cardWidth={width ? width : 'auto'}
                >
                    <div >
                        {children}

                        {showCloseButton && (
                            <button
                                style={{ width: bttnWidth, height: bttnHeight, color: 'var(--text)', backgroundColor: 'var(--body)' }}
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