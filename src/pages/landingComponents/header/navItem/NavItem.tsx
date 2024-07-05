import {ListItem, ListItemIcon, ListItemText, Link as MuiLink, CSSObject} from '@mui/material';
import styles from './styles';
import {forwardRef, Ref} from 'react';
import {ICON_MAP} from "../constans.tsx";
import {styled} from "@mui/material/styles";

const StyledListItem = styled(ListItem)<{
    isActiveSection: boolean
    isDarkTheme:boolean
}>(styles.listItem as CSSObject);

const StyledListItemIcon = styled(ListItemIcon)<{
    isActiveSection: boolean;
    isDarkTheme:boolean
}>(styles.navIcon as CSSObject);

const StyledListItemText = styled(ListItemText)<{
    isActiveSection: boolean;
    isDarkTheme:boolean
}>(styles.navText as CSSObject);

interface NavItemProps {
    item: string;
    isActiveSection: boolean;
    isDarkTheme: boolean;
    handleClick: (item: string) => void;
    ref: Ref<HTMLAnchorElement>;
}

const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
    ({ item, isActiveSection, isDarkTheme, handleClick }, ref) => (
        <StyledListItem
            sx={styles.listItem} isActiveSection={isActiveSection} isDarkTheme={isDarkTheme}
        >
            <MuiLink
                href={item}
                ref={ref}
                data-to={item}
                onClick={() => handleClick(item)}
                sx={styles.navLink}
            >
                <StyledListItemIcon sx={styles.navIcon} isActiveSection={isActiveSection} isDarkTheme={isDarkTheme}>
                    {ICON_MAP[item]}
                </StyledListItemIcon>
                <StyledListItemText primary={item.substring(1)} sx={styles.navText} isActiveSection={isActiveSection} isDarkTheme={isDarkTheme}/>
            </MuiLink>
        </StyledListItem>
    )
);

export default NavItem;
