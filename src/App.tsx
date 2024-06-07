import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ActiveSectionContext from './contexts/ActiveSectionContext';
import { FC, useEffect, useState } from 'react';
import AuthContext from './contexts/AuthContext';
import AppPage from './pages/AppPage';
import LoginModal from './components/LoginModal';
import Header from './pages/landingComponents/Header';
import MainPage from './pages/landingComponents/MainPage';
import VideoPage from './pages/Videos/VideoPage.tsx';
import { useAppDispatch, useAppSelector } from './store/hooks.ts';
import { AuthService } from './services/auth.service.ts';
import { userSliceMapper } from './store/user/utilits/userUtilits.ts';
import { login, selectUsername } from './store/user/userSlice.ts';
import VideosMainPage from './pages/Videos/VideosMainPage.tsx';
import {
  appPagePath,
  channelEditPrototypePath,
  channelPagePrototypePath,
  mediaIdPath,
  mediaPath,
  sideBarPath,
  certificatePath, VideoEditPathPrototype,

} from './configs/RouteConfig.tsx';
import ChannelPage from './pages/Videos/ChannelPage.tsx';
import CertificateGenerator from './pages/cert/CertificateGenerator.tsx';
import UserChannelPage from './pages/Videos/UserChannelPage.tsx';

import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme.tsx';
import { ThemeContext } from './contexts/ThemeContext';
import VideoEditPage from "./pages/Videos/VideoEditPage.tsx";
import AnimatedRipple from "./components/neumorphism/animatedRipple/AnimatedRipple.tsx";

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

  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme }}>
      <ThemeProvider theme={muiTheme}>
        <Router>
          <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
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

                    <Route path={mediaPath} element={<VideosMainPage />} />
                    <Route path={mediaIdPath} element={<VideoPage />} />

                    <Route path={sideBarPath} element={<SideBar />} />
                    <Route path={appPagePath} element={<AppPage />} />
                    <Route
                      path={channelPagePrototypePath}
                      element={<ChannelPage />}
                    />
                    <Route
                      path={channelEditPrototypePath}
                      element={<UserChannelPage />}
                    />
                    <Route path={VideoEditPathPrototype}
                           element={<VideoEditPage/>}
                    />


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
                />
                </AnimatedRipple>
              </>
            )}

            <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
          </AuthContext.Provider>
        </Router>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

const HeaderAndMainPage: React.FC<{
  activeSection: string | null;
  setActiveSection: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({ activeSection, setActiveSection }) => (
  <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
    <Header />
    <MainPage />
  </ActiveSectionContext.Provider>
);
export default App;
