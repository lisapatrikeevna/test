import { useEffect, useRef, useContext, useState, FC } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Handshake, Apps, Call, AccountBalance, AttachMoney, Build } from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useTheme as useMuiTheme } from '@mui/material/styles';
import ActiveSectionContext from '../../contexts/ActiveSectionContext.tsx';
import { useTheme as useCustomTheme } from '../../contexts/ThemeContext';
import LoginModal from '../../components/LoginModal.tsx';
import logo from '../../assets/neox-logo.svg';
import NeuButton from "../../components/neumorphism/button/NeuButton.tsx";
import NeuSwitch from '../../components/neumorphism/switch/NeuSwitch.tsx';

const Header: FC = () => {
  const muiTheme = useMuiTheme();
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
    const activeIndex = activeSection ? ["Home", "AboutUs", "Project", "Pricing", "Partners", "Contacts", "News"].indexOf(activeSection) : -1;
    const activeLink = linksRef.current[activeIndex];
    if (activeLink) {
      moveIndicator(activeLink);
    }
  }, [activeSection]);

  return (
    <Box sx={{
      width: '100%',
      position: 'absolute',
      top: 0,
      paddingLeft: '1vw',
      paddingRight: '5vw',
      '@media (max-width: 830px)': {
        paddingRight: '1vw'
      },
      height: '10vh',
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
      <img src={logo} alt="NeoXonline" style={{ width: 70, height: 70, cursor: 'pointer' }} onClick={() => { handleClick("#Home") }} />
      <Box sx={{
        transformOrigin: 'left',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }} >
        <List sx={{
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          top: '-65px',
          width: "850px",
          '@media (max-width: 1250px)': {
            width: '700px'
          },
          '@media (max-width: 1100px)': {
            width: '500px'
          },
        }}>
          {["#AboutUs", "#Project", "#Pricing", "#Partners", "#Contacts", "#News"].map((item, index) => (
            <ListItem 
              key={item} 
              sx={{ 
                transform: 'translateY(70px)', 
                position: 'relative',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                padding: '5px 10px',
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
                    borderRadius: '10px',
                    backgroundColor: muiTheme.palette.background.default,
                    boxShadow: theme === 'light'
                      ? 'inset 5px 5px 10px rgba(0,0,0,0.2), inset -5px -5px 10px rgba(255,255,255,0.5)'
                      : 'inset 5px 5px 10px rgba(0,0,0,0.5), inset -5px -5px 10px rgba(255,255,255,0.1)',
                    zIndex: -1,
                  }
                })
              }}
            >
              <Link to={item}
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
                }}
              >
                <ListItemIcon sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  minWidth: 'auto', 
                  marginBottom: '4px',
                  color: activeSection === item.substring(1) ? muiTheme.palette.primary.main : 'inherit' 
                }}>
                  {item === "#Partners" && <Handshake />}
                  {item === "#Pricing" && <AttachMoney />}
                  {item === "#News" && <Apps />}
                  {item === "#Contacts" && <Call />}
                  {item === "#AboutUs" && <AccountBalance />}
                  {item === "#Project" && <Build />} 
                </ListItemIcon>
                <ListItemText primary={item.substring(1)} sx={{ textAlign: 'center', color: activeSection === item.substring(1) ? muiTheme.palette.primary.main : 'inherit' }} />
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <Box component="label" sx={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer'}}>
          <Box sx={{
            isolation: 'isolate',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            height: '60px',
            width: '120px',
            '@media (max-width: 930px)': {
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
            '@media (max-width: 930px)': {
              width: '90px'
            }, 
          }}
          onClick={() => setIsLoginModalOpen(true)}
        >
          Login
        </NeuButton>
      </Box>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </Box>
  );
};

export default Header;
