import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ActiveSectionContext from './contexts/ActiveSectionContext';
import { FC, useEffect, useState } from 'react';
import AuthContext from './contexts/AuthContext';
import AppPage from './pages/AppPage';
import LoginModal from './components/LoginModal';
import Header from './pages/landingComponents/Header';
import MainPage from './pages/landingComponents/MainPage';
import { useAppDispatch, useAppSelector } from './store/hooks.ts';
import { AuthService } from './services/auth.service.ts';
import { userSliceMapper } from './store/user/utilits/userUtilits.ts';
import { login, selectUsername } from './store/user/userSlice.ts';
import {
  appPagePath,
  certificatePath,
} from './configs/RouteConfig.tsx';
import CertificateGenerator from './pages/cert/CertificateGenerator.tsx';
import {Box, CssBaseline} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme.tsx';
import { ThemeContext } from './contexts/ThemeContext';
import AnimatedRipple from './components/neumorphism/animatedRipple/AnimatedRipple.tsx';
import PrivacyPolicy from "./pages/landingComponents/PrivacyPolicy.tsx";
import Datenschutz from "./pages/landingComponents/Datenschutz.tsx";
import Modal from './components/Modal';
import Impressum from './pages/landingComponents/Impressum.tsx';
import Footer from './pages/landingComponents/Footer';

const App: FC = () => {
  // Initialize theme state with light theme as default
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Object with theme settings
  const muiTheme = theme === 'light' ? lightTheme : darkTheme;

  const [activeSection, setActiveSection] = useState<string | null>('Home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => selectUsername(state)) || 'Guest';

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Function for checking session and refreshing it
    const checkSession = async () => {
      try {
        const data = await AuthService.refresh(dispatch); // Try of refresh session
        dispatch(login(userSliceMapper(data)));
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Failed to refresh session', error);
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, [dispatch, setIsLoggedIn]);

  const allowedUsernames = ['AdrianAdrian', 'Adrian Lieblich', 'RomarioFisch'];

  const [isImpressumModalOpen, setIsImpressumModalOpen] = useState(false);
  const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] = useState(false);
  const [isDatenschutzModalOpen, setIsDatenschutzModalOpen] = useState(false);

  return (
      <ThemeContext.Provider value={{ theme: theme, setTheme }}>

        <ThemeProvider theme={muiTheme}>
          <Router>
            <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
              <CssBaseline />
              {isLoggedIn ? (
                  <Box
                      sx={{
                        display: 'flex',
                        height: '100vh',
                      }}
                  >
                    <Box
                        sx={{
                          flexGrow: 1,
                          overflow: 'auto',
                          width: '100%',
                        }}
                    >
                      <Routes>
                        <Route path={appPagePath} element={<AppPage />} />
                        <Route
                            path={certificatePath}
                            element={
                              allowedUsernames.includes(username) ? (
                                  <CertificateGenerator />
                              ) : (
                                  ''
                              )
                            }
                        />
                      </Routes>
                    </Box>
                  </Box>
              ) : (
                  <>
                    <AnimatedRipple>
                      <HeaderAndMainPage
                          activeSection={activeSection}
                          setActiveSection={setActiveSection}
                          setIsImpressumModalOpen={setIsImpressumModalOpen}
                          setIsPrivacyPolicyModalOpen={setIsPrivacyPolicyModalOpen}
                          setIsDatenschutzModalOpen={setIsDatenschutzModalOpen}
                      />
                    </AnimatedRipple>
                  </>
              )}

              <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
              <Modal
                  isOpen={isImpressumModalOpen}
                  onClose={() => setIsImpressumModalOpen(false)}
                  aria-labelledby="impressum-modal"
                  aria-describedby="impressum-modal-description"
              >
                <Box sx={{ maxWidth: '500px' }}>
                  <Impressum onClose={() => setIsImpressumModalOpen(false)} />
                </Box>
              </Modal>
              <Modal
                  isOpen={isPrivacyPolicyModalOpen}
                  onClose={() => setIsPrivacyPolicyModalOpen(false)}
                  aria-labelledby="privacy-policy-modal"
                  aria-describedby="privacy-policy-modal-description"
              >
                <Box>
                  <PrivacyPolicy />
                </Box>
              </Modal>
              <Modal
                  isOpen={isDatenschutzModalOpen}
                  onClose={() => setIsDatenschutzModalOpen(false)}
                  aria-labelledby="datenschutz-modal"
                  aria-describedby="datenschutz-modal-description"
              >
                <Box>
                  <Datenschutz />
                </Box>
              </Modal>
            </AuthContext.Provider>
          </Router>
        </ThemeProvider>
      </ThemeContext.Provider>
  );
};

const HeaderAndMainPage: React.FC<{
  activeSection: string | null;
  setActiveSection: React.Dispatch<React.SetStateAction<string | null>>;
  setIsImpressumModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPrivacyPolicyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDatenschutzModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
        activeSection,
        setActiveSection,
        setIsImpressumModalOpen,
        setIsPrivacyPolicyModalOpen,
        setIsDatenschutzModalOpen,
      }) => (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      <Header />
      <MainPage />
      <Footer
          onImpressumClick={() => setIsImpressumModalOpen(true)}
          onPrivacyPolicyClick={() => setIsPrivacyPolicyModalOpen(true)}
          onDatenschutzClick={() => setIsDatenschutzModalOpen(true)}
      />
    </ActiveSectionContext.Provider>
);
export default App;