import React, { useEffect, useRef, useContext, useState } from 'react';
import { Box, Typography, Button, Switch } from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Apps, Call, AccountBalance, AttachMoney } from '@mui/icons-material';
import { Link } from "react-router-dom";
import ActiveSectionContext from '../../contexts/ActiveSectionContext.tsx';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';

import LoginModal from '../../components/LoginModal.tsx';
import logo from '../../assets/neox-logo.svg';

const Header: React.FC = () => {
  const { theme, setTheme } = useCustomTheme();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };


  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error('Header must be used within ActiveSectionContext');
  }
  const { activeSection, setActiveSection } = context;

  // Ref for the indicator
  const markerRef = useRef<HTMLDivElement | null>(null);

  // Ref for the links
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Function to move the indicator
  const moveIndicator = (target: HTMLAnchorElement) => {

    // Check if the markerRef is defined
    if (markerRef.current) {
      // Move the indicator to the target's position
      (markerRef.current as HTMLElement).style.left = target.offsetLeft + "px";
      (markerRef.current as HTMLElement).style.width = target.offsetWidth + "px";
    }
  };

  const handleClick = (item: string) => {
    setActiveSection(item.substring(1));
    const sectionElement = document.getElementById(item.substring(1));
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };


  // Initialize the links and set the indicator on first load
  useEffect(() => {
    // Set the links if there are more than four
    linksRef.current = linksRef.current.slice(0, 6);

    // Find the home link
    const homeLink = linksRef.current.find(link => (link as HTMLAnchorElement).dataset.to === "#Home");

    // If the home link is found, move the indicator to it
    if (homeLink) moveIndicator(homeLink as HTMLAnchorElement);
  }, []);

  useEffect(() => {
    // Найти активную ссылку на основе activeSection
    const activeIndex = activeSection ? ["Home", "Pricing", "News", "Contacts", "AboutUs"].indexOf(activeSection) : -1;
    const activeLink = linksRef.current[activeIndex];
    if (activeLink) {
      moveIndicator(activeLink);
    }
  }, [activeSection]); // Отслеживать изменения activeSection

  const [buttonStates, setButtonStates] = useState<{ [key: string]: boolean }>({});

  const handleMouseDown = (id: string) => {
    setButtonStates(prevState => ({ ...prevState, [id]: true }));
  };

  const handleMouseUp = (id: string) => {
    setButtonStates(prevState => ({ ...prevState, [id]: false }));
  };

  const bttnHeight = '50px';
  const bttnWidth = '150px';

  return (
    <Typography variant="body1" sx={{
      width: '100%',
      position: 'absolute',
      top: 0,
      paddingLeft: '1vw',
      paddingRight: '5vw',
      height: '10vh',
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'var(--body)',
      boxShadow: '0 10px 10px var(--shadow_outer_dark)',
      transition: '0.5s',
      borderBottomRightRadius: '25px',
      borderBottomLeftRadius: '25px'
    }}>
      <img src={logo} alt="NeoX" style={{
        width: 70, height: 70,
      }} onClick={() => { handleClick("#Home") }} />
      <Typography variant="body1" sx={{
        transformOrigin: 'left',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }} >
        <List sx={{ display: 'flex', flexDirection: 'row', position: 'absolute', top: '-65px', width: "850px" }}>
          {/* Map over the links and create a list item for each one */}
          {["#Home", "#Pricing", "#News", "#Contacts", "#AboutUs"].map((item, index) => (
            <ListItem key={item} sx={{
              transform: 'translateY(70px)',
            }} >
              <Link to={item}
                ref={el => linksRef.current[index] = el as HTMLAnchorElement} // Save a reference to the element
                data-to={item} // For identification in moveIndicator
                onClick={() => {
                  // Set the active section to the clicked item
                  handleClick(item);
                }}>

                {/* Display the icon based on the link */}
                <ListItemIcon>
                  {item === "#Home" && <Home />}
                  {item === "#Pricing" && <AttachMoney />}
                  {item === "#News" && <Apps />}
                  {item === "#Contacts" && <Call />}
                  {item === "#AboutUs" && <AccountBalance />}
                </ListItemIcon>

                {/* Display the link text */}
                <ListItemText primary={item.substring(1)} />
              </Link>
            </ListItem>
          ))}

          {/* The indicator */}

        </List>
      </Typography>
      <Typography variant='body1'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}>
        <Box component="label" sx={{
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
          color: '#394a56'
        }}>
          <Box sx={{
            isolation: 'isolate',
            position: 'relative',
            height: '30px',
            width: '60px',
            borderRadius: '25px',
            overflow: 'hidden !important',
            background: 'var(--toggle_background)',
            boxShadow: '-10px -10px 25px var(--shadow_outer_light), 10px 10px 25px var(--shadow_outer_dark)'
          }} component="div">
            <span style={{
              position: 'absolute',
              color: 'orange',
              top: '4px',
              left: '4px',
              zIndex: 0,
              width: '24px',
              height: '24px',
              animation: 'rotate 15s linear infinite',
            }}><WbSunnyIcon /></span>
            <span style={{
              position: 'absolute',
              top: '4px',
              right: '0px',
              fill: '#ffffff',
              zIndex: 0,
              width: '24px',
              height: '24px',
              animation: 'tilt 5s linear infinite',
            }}><Brightness2Icon /></span>
            <Switch
              checked={theme === 'light'}
              onChange={toggleTheme}
              name="check"
              color="primary"
              inputProps={{ 'aria-label': 'theme switch' }}
              sx={{
                '& .MuiSwitch-thumb': {
                  width: 30,
                  height: 30,
                  marginTop: "-8px"
                },
                '& .MuiSwitch-track': {
                  backgroundColor: "",
                  paddingTop: '5px',
                  width: 150,
                }
              }}
            />
            <Box
              sx={{
                top: 0,
                height: '100%',
                width: '200%',
                background: 'var(--body)',
                borderRadius: '15px',
                transform: 'translate3d(-75%, 0, 0)',
                transition: 'transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35)',
                boxShadow: '-10px -10px 25px var(--shadow_outer_light), 10px 10px 25px var(--shadow_outer_dark), inset -2px -5px 5px var(--shadow_inner_light), inset 2px 5px 5px var(--shadow_inner_dark)',
              }} component="div"> </Box>
          </Box>
        </Box>
        <Button
          sx={{
            width: bttnWidth,
            height: bttnHeight,
            borderRadius: "25px",
            "&:hover": {
              backgroundColor: "black",
            }
          }}
          onMouseDown={() => handleMouseDown('login')}
          onMouseUp={() => handleMouseUp('login')}
          onMouseLeave={() => handleMouseUp('login')}
          onClick={() => setIsLoginModalOpen(true)}>
          Login
        </Button>
      </Typography>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </Typography >
  );
};

export default Header;