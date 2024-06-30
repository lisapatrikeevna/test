import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

type MessageActionsMenuProps = {
    anchorEl: null | HTMLElement;
    handleCloseMenu: () => void;
    handleDeleteMessage: (messageId: number) => void;
    selectedMessageId: number | null;
}

export const MessageActionsMenu = ({anchorEl, handleCloseMenu, handleDeleteMessage, selectedMessageId,}:MessageActionsMenuProps) => {
    return (
        <Menu
            id="message-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
        >
            <MenuItem onClick={() => handleDeleteMessage(selectedMessageId!)}>
                Delete
            </MenuItem>
            {/* Добавьте здесь дополнительные действия */}
        </Menu>
    );
};

