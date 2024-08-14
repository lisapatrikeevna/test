import { useState,useContext } from 'react';
import { Box, useTheme as useMuiTheme } from '@mui/material';
import ActiveSectionContext from '../../../contexts/ActiveSectionContext.tsx';
import { useTheme as useCustomTheme } from '../../../contexts/ThemeContext.tsx';
import LoginModal from '../../../components/LoginModal.tsx';
import styles from './styles';
import MenuButton from "./menuButton/MenuButton.tsx";
import {Logo} from "./logo/Logo.tsx";
import NavList from "./navList/NavList.tsx";
import ThemeSwitch from "./themeSwitch/ThemeSwitch.tsx";
import LoginButton from "./loginButton/LoginButton.tsx";
import MobileDrawer from "./mobileDrawer/MobileDrawer.tsx";

const Header = () => {
  const muiTheme = useMuiTheme();
  const { theme, setTheme } = useCustomTheme();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);



  const context = useContext(ActiveSectionContext);
  if (!context) throw new Error('Header must be used within ActiveSectionContext');

  const { activeSection, setActiveSection } = context;

    const handleClick = (item: string) => {
        setActiveSection(item.substring(1));
        const sectionElement = document.getElementById(item.substring(1));
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
      <Box sx={{ ...styles.mainContainer, boxShadow: muiTheme.shadows[1], backgroundColor: muiTheme.palette.background.default }}>
        <MenuButton handleDrawerToggle={handleDrawerToggle} />
        <Logo handleClick={handleClick} />
        <Box sx={styles.itemsContainer}>
          <NavList theme={theme} />
        </Box>
        <Box sx={styles.rightContainer}>
          <ThemeSwitch theme={theme} toggleTheme={toggleTheme} />
          <LoginButton setIsLoginModalOpen={setIsLoginModalOpen} />
        </Box>
        <MobileDrawer
            isDrawerOpen={isDrawerOpen}
            handleDrawerToggle={handleDrawerToggle}
            handleClick={handleClick}
            activeSection={activeSection}
        />
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      </Box>
  );
};

export default Header;

