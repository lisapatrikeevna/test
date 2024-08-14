import { List } from '@mui/material';
import { useContext, useRef, useEffect } from 'react';

import styles from "./styles.ts"
import ActiveSectionContext from "../../../../contexts/ActiveSectionContext.tsx";
import {MENU_ITEMS} from "../constants.tsx";
import NavItem from "../navItem/NavItem.tsx";


type NavListProps = {
    theme: string
}
const NavList = ({ theme }: NavListProps) => {
    const context = useContext(ActiveSectionContext);
    if (!context) throw new Error('NavList must be used within ActiveSectionContext');

    const markerRef = useRef<HTMLDivElement | null>(null);

    const { activeSection, setActiveSection } = context;
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        linksRef.current = linksRef.current.slice(0, 7);
        const homeLink = linksRef.current.find(link => link?.dataset.to === "#Home");
        if (homeLink) moveIndicator(homeLink);
    }, []);

    useEffect(() => {
        const activeIndex = activeSection ? MENU_ITEMS.indexOf(activeSection) : -1;
        const activeLink = linksRef.current[activeIndex];
        if (activeLink) moveIndicator(activeLink);
    }, [activeSection]);

    const moveIndicator = (target: HTMLAnchorElement) => {
        if (markerRef.current) {
            markerRef.current.style.left = target.offsetLeft + "px";
            markerRef.current.style.width = target.offsetWidth + "px";
        }
    };

    const handleClick = (item: string) => {
        setActiveSection(item.substring(1));
        const sectionElement = document.getElementById(item.substring(1));
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <List sx={styles.navList}>
            {MENU_ITEMS.map((item, index) => (
                <NavItem
                    key={item}
                    item={item}
                    isActiveSection={activeSection === item.substring(1)}
                    isDarkTheme={theme === 'dark'}
                    handleClick={handleClick}
                    ref={el => linksRef.current[index] = el}
                />
            ))}
        </List>
    );
};

export default NavList;
