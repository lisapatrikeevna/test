import {
    Drawer,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Link as MuiLink,
    Typography,
    CSSObject
} from '@mui/material';
import styles from './styles';
import {ICON_MAP, MENU_ITEMS} from "../constants.tsx";
import {drawerLogoStyles} from "../styles.ts";
import {styled} from "@mui/material/styles";
import logo from "../../../../assets/partners/neox-logo.svg"

const StyledListItem = styled(ListItem)<{
    isActiveSection: boolean;
}>(styles.drawerItem as CSSObject);

const StyledListItemIcon = styled(ListItemIcon)<{
    isActiveSection: boolean;
}>(styles.drawerIcon as CSSObject);

const StyledListItemText = styled(ListItemText)<{
    isActiveSection: boolean;
}>(styles.drawerText as CSSObject);

type MobileDrawerProps = {
    isDrawerOpen:boolean
    handleDrawerToggle:()=>void
    handleClick:(item:string)=>void
    activeSection: string | null

}

const MobileDrawer = ({ isDrawerOpen, handleDrawerToggle, handleClick, activeSection }: MobileDrawerProps) => (
    <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <Box sx={styles.drawerBox}>
            <List>
                <ListItem onClick={() => { handleClick("#Home"); handleDrawerToggle(); }} sx={styles.drawerItem}>
                    <MuiLink href="#Home" underline="none" color="inherit" onClick={() => { handleClick("#Home"); handleDrawerToggle(); }} sx={styles.drawerLink}>
                        <ListItemIcon sx={styles.drawerIcon}>
                            <img draggable="false" src={logo} alt="NeoXonline" style={drawerLogoStyles} />
                            <Typography variant="h5" alignContent="center" sx={styles.drawerText}>NeoXonline</Typography>
                        </ListItemIcon>
                    </MuiLink>
                </ListItem>
                {MENU_ITEMS.map((item) => (
                    <StyledListItem key={item} onClick={() => { handleClick(item); handleDrawerToggle() }} sx={styles.drawerItem} isActiveSection={activeSection === item.substring(1)}>
                        <MuiLink href={item} underline="none" color="inherit" onClick={() => { handleClick(item); handleDrawerToggle(); }} sx={styles.drawerLink}>
                            <StyledListItemIcon sx={styles.drawerIcon} isActiveSection={activeSection === item.substring(1)}>
                                {ICON_MAP[item]}
                            </StyledListItemIcon>
                            <StyledListItemText primary={item.substring(1)} sx={styles.drawerText} isActiveSection={activeSection === item.substring(1)}/>
                        </MuiLink>
                    </StyledListItem>
                ))}
            </List>
        </Box>
    </Drawer>
);

export default MobileDrawer;
