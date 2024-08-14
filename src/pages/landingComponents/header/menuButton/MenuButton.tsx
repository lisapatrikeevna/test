import { IconButton } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import styles from './styles';

const MenuButton = ({ handleDrawerToggle }: { handleDrawerToggle: () => void }) => (
    <IconButton sx={styles.mobileMenuButton} onClick={handleDrawerToggle}>
        <MenuIcon sx={styles.mobileMenu} />
    </IconButton>
);

export default MenuButton;
