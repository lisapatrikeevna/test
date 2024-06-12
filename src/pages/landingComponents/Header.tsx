import React, { useState, useRef, useEffect, useContext } from 'react';
import { Box, IconButton, List, ListItem, ListItemIcon, ListItemText, Drawer, Link as MuiLink, Typography, useTheme as useMuiTheme } from '@mui/material';
import {
  Menu as MenuIcon,
  Handshake,
  Apps,
  Call,
  AccountBalance,
  EuroSymbol,
  Build,
  LunchDining
} from '@mui/icons-material';
import ActiveSectionContext from '../../contexts/ActiveSectionContext.tsx';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';
import LoginModal from '../../components/LoginModal.tsx';
import logo from '../../assets/partners/neox-logo.svg';
import NeuButton from "../../components/neumorphism/button/NeuButton.tsx";
import NeuSwitch from '../../components/neumorphism/switch/NeuSwitch.tsx';

const Header: React.FC = () => {
  const muiTheme = useMuiTheme();
  const { theme, setTheme } = useCustomTheme();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const context = useContext(ActiveSectionContext);
  if (!context) {
    throw new Error('Header must be used within ActiveSectionContext');
  }
  const { activeSection, setActiveSection } = context;

  const markerRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

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

  useEffect(() => {
    linksRef.current = linksRef.current.slice(0, 7);
    const homeLink = linksRef.current.find(link => link?.dataset.to === "#Home");
    if (homeLink) moveIndicator(homeLink);
  }, []);

  useEffect(() => {
    const activeIndex = activeSection ? ["Home", "AboutUs", "Project", "Pricing", "Partners", "Contacts", "News", "Donate"].indexOf(activeSection) : -1;
    const activeLink = linksRef.current[activeIndex];
    if (activeLink) {
      moveIndicator(activeLink);
    }
  }, [activeSection]);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Box sx={{
      width: '100%',
      position: 'absolute',
      top: 0,
      paddingLeft: '3vw',
      paddingRight: '3vw',
      '@media (max-width: 830px)': {
        paddingRight: '1vw',
        paddingLeft: '1vw'
      },
      height: '95px',
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'var(--body)',
      boxShadow: muiTheme.shadows[1],
      transition: '0.5s',
      borderBottomRightRadius: '25px',
      borderBottomLeftRadius: '25px'
    }}>
      <IconButton sx={{ display: { xs: 'flex', md: 'none', lg: 'none', xl: 'none', '@media (max-width: 1070px)': { display: 'flex' } } }} onClick={handleDrawerToggle}>
        <MenuIcon sx={{ width: '32px', height: '32px' }}/>
      </IconButton>
      <Box sx={{ display: { xs: 'none', md: 'flex', lg: 'flex', xl: 'flex', '@media (max-width: 1070px)': { display: 'none' } }, alignItems: 'center', gap: '10px'}}>
        <img draggable="false" src={logo} alt="NeoXonline" style={{ width: 70, height: 70, cursor: 'pointer' }} onClick={() => { handleClick("#Home") }} />
        <Box sx={{ mt: '5px'}}> 
        <Typography variant="h4" sx={{ cursor: 'pointer', fontWeight: '550', marginBottom: 0, lineHeight: 1 }} onClick={() => { handleClick("#Home") }}>
          NeoX
        </Typography>
        <Typography variant="h6" sx={{ cursor: 'pointer', fontWeight: '500', marginTop: 0, lineHeight: 1, letterSpacing: 6 }} onClick={() => { handleClick("#Home") }}>
          online
        </Typography>
        </Box>
      </Box>
      <Box sx={{
        paddingLeft: '20px',
        transformOrigin: 'left',
        display: { xs: 'none', md: 'flex', lg: 'flex', xl: 'flex', '@media (max-width: 1070px)': { display: 'none' } },
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
      }} >
        <List sx={{
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
          top: '-65px',
          width: "850px",
          '@media (max-width: 1500px)': {
            width: '700px'
          },
          '@media (max-width: 1337px)': {
            width: '640px'
          },
          '@media (max-width: 1160px)': {
            width: '600px'
          },
          '@media (max-width: 1070px)': {
            width: '100%',
            display: 'none'
          },
        }}>
          {["#AboutUs", "#Project", "#Pricing", "#Partners", "#Contacts", "#News", "#Donate"].map((item, index) => (
            <ListItem 
              key={item} 
              sx={{ 
                transform: 'translateY(70px)', 
                position: 'relative',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                padding: '10px 10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                ...(activeSection === item.substring(1) && {
                  color: muiTheme.palette.primary.main,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%', 
                    height: '100%', 
                    borderRadius: '15px',
                    backgroundColor: muiTheme.palette.background.default,
                    boxShadow: theme === 'light'
                      ? muiTheme.shadows[1]
                      : muiTheme.shadows[2],
                    zIndex: -1,
                  }
                }),
                '@media (max-width: 1500px)': {
                  // padding: '5px 5px',
                  '& .MuiListItemText-primary': {
                    fontSize: '0.83rem',
                  },
                  '& .MuiListItemIcon-root': {
                    minWidth: '40px',
                    '& svg': {
                      fontSize: '26px',
                    },
                  },
                }
              }}
            >
              <MuiLink
                href={item}
                ref={el => linksRef.current[index] = el}
                data-to={item}
                onClick={() => { handleClick(item); }}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  textDecoration: 'none', 
                  width: '100%', 
                  height: '100%',
                  zIndex: 1,
                  color: 'inherit',
                }}
              >
                <ListItemIcon sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  minWidth: 'auto', 
                  marginBottom: '2px',
                  color: activeSection === item.substring(1) ? muiTheme.palette.primary.main : 'inherit' 
                }}>
                  {item === "#Partners" && <Handshake />}
                  {item === "#Pricing" && <EuroSymbol />}
                  {item === "#News" && <Apps />}
                  {item === "#Contacts" && <Call />}
                  {item === "#AboutUs" && <AccountBalance />}
                  {item === "#Project" && <Build />} 
                  {item === "#Donate" && <LunchDining />}
                </ListItemIcon>
                <ListItemText 
                primary={item.substring(1)} 
                sx={{ 
                  textAlign: 'center', 
                  color: activeSection === item.substring(1) ? muiTheme.palette.primary.main : 'inherit',
                  padding: '0', 
                  marginBottom: '0',   
                  }} />
              </MuiLink>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px', 
        marginLeft: '67px',
        '@media (max-width: 1270px)': {
          marginLeft: '8px'
        },
        }}>
        <Box component="label" sx={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer'}}>
          <Box sx={{
            isolation: 'isolate',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            height: '60px',
            width: '120px',
            '@media (max-width: 1270px)': {
              width: '70px'
            },
            borderRadius: '25px',
            overflow: 'hidden',
            background: 'var(--toggle_background)',
            boxShadow: '-10px -10px 25px var(--shadow_outer_light), 10px 10px 25px var(--shadow_outer_dark)'
          }} component="div">
            <NeuSwitch
              checked={theme === 'light'}
              onChange={toggleTheme}
              name="check"
              color="primary"
              size='large'
              inputProps={{ 'aria-label': 'theme switch' }}
            />
          </Box>
        </Box>
        <NeuButton
          rounded
          size='large'
          sx={{ 
            padding: "10px", 
            width: "130px",
            '@media (max-width: 1115px)': {
              width: '90px'
            }, 
          }}
          onClick={() => setIsLoginModalOpen(true)}
        >
          Login
        </NeuButton>
      </Box>
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', backgroundColor: 'var(--body)' }}>
          <List>
            <ListItem
              button
              onClick={() => { handleClick("#Home"); handleDrawerToggle(); }}
              sx={{
                padding: '15px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  color: muiTheme.palette.primary.main,
                  backgroundColor: muiTheme.palette.action.hover,
                }
              }}
            >
              <MuiLink
                href="#Home"
                underline="none"
                color="inherit"
                onClick={() => { handleClick("#Home"); handleDrawerToggle(); }}
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  width: '100%',
                  height: '100%',
                  zIndex: 1
                }}
              >
                <ListItemIcon sx={{ minWidth: 'auto', margin: '8px', justifyContent: 'center', display: 'flex' }}>
                  <img draggable="false" src={logo} alt="NeoXonline" style={{ width: 50, height: 50 }} />
                  <Typography variant="h5" alignContent="center" sx={{ marginLeft: '10px', color: muiTheme.palette.text.primary }}>
                    NeoXonline
                  </Typography>
                </ListItemIcon>
              </MuiLink>
            </ListItem>
            {["#AboutUs", "#Project", "#Pricing", "#Partners", "#Contacts", "#News", "#Donate"].map((item) => (
              <ListItem
                button
                key={item}
                onClick={() => { handleClick(item); handleDrawerToggle(); }}
                sx={{
                  padding: '15px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    color: muiTheme.palette.primary.main,
                    backgroundColor: muiTheme.palette.action.hover,
                  },
                  ...(activeSection === item.substring(1) && {
                    color: muiTheme.palette.primary.main,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '100%', 
                      height: '100%', 
                      borderRadius: '15px',
                      backgroundColor: 'var(--body)', 
                      boxShadow: theme === 'light'
                        ? muiTheme.shadows[1]
                        : muiTheme.shadows[2],
                      zIndex: -1,
                    }
                  })
                }}
              >
                <MuiLink
                  href={item}
                  underline="none"
                  color="inherit"
                  onClick={() => { handleClick(item); handleDrawerToggle(); }}
                  sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textDecoration: 'none',
                    width: '100%',
                    height: '100%',
                    zIndex: 1
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 'auto', margin: '8px', justifyContent: 'center', display: 'flex', color: activeSection === item.substring(1) ? muiTheme.palette.primary.main : 'inherit' }}>
                    {item === "#Partners" && <Handshake />}
                    {item === "#Pricing" && <EuroSymbol />}
                    {item === "#News" && <Apps />}
                    {item === "#Contacts" && <Call />}
                    {item === "#AboutUs" && <AccountBalance />}
                    {item === "#Project" && <Build />}
                    {item === "#Donate" && <LunchDining />}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.substring(1)} 
                    sx={{ 
                      textAlign: 'center', 
                      color: activeSection === item.substring(1) ? muiTheme.palette.primary.main : 'inherit',
                      padding: '0', 
                      marginBottom: '0', 
                    }} 
                  />
                </MuiLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </Box>
  );
};

export default Header;
