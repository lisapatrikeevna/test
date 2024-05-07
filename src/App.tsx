import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import ActiveSectionContext from "./contexts/ActiveSectionContext";
import { useEffect, useState } from "react";
import AuthContext from "./contexts/AuthContext";
import SideBar from "./pages/SideBar";
import Home from "./pages/landingComponents/Home.tsx";
import Chats from "./pages/Chats";
import AboutUs from "./pages/landingComponents/AboutUs.tsx";
import Calls from "./pages/Calls.tsx";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import AppPage from "./pages/AppPage";
import ElementsShowroom from "./pages/ElementsShowroom";
import LoginModal from "./components/LoginModal";
import Header from "./pages/landingComponents/Header";
import MainPage from "./pages/landingComponents/MainPage";
import VideoPage from "./pages/Videos/VideoPage.tsx";
import { useAppDispatch, useAppSelector } from "./store/hooks.ts";
import { AuthService } from "./services/auth.service.ts";
import { userSliceMapper } from "./store/user/utilits/userUtilits.ts";
import { login, selectUsername } from "./store/user/userSlice.ts";
// import styles from "./styles/App.module.css";
import VideosMainPage from "./pages/Videos/VideosMainPage.tsx";
import {
  appPagePath, channelEditPrototypePath, channelPagePrototypePath,
  chatsPath,
  homePath,
  mediaIdPath,
  aboutUsPath,
  mediaPath,
  productsPath, profilePath,
  settingsPath,
  callsPath, sideBarPath, certificatePath,
  newGroupPath,
  newChannelPath,
  contactsPath
} from "./configs/RouteConfig.tsx";
import ChannelPage from "./pages/Videos/ChannelPage.tsx";
import CertificateGenerator from "./pages/cert/CertificateGenerator.tsx";
import UserChannelPage from "./pages/Videos/UserChannelPage.tsx";
import NewGroup from "./pages/NewGroup.tsx";
import NewChannel from "./pages/NewChannel.tsx";
import Contacts from "./pages/Contacts.tsx";
import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme.tsx';
import { ThemeContext } from "./contexts/ThemeContext.tsx";

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Новое состояние для темы

  const [activeSection, setActiveSection] = useState<string | null>("Home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUsername) || "Guest";

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Функция для проверки и восстановления сессии
    const checkSession = async () => {
      try {
        const data = await AuthService.refresh(dispatch); // Попытка обновить токен
        dispatch(login(userSliceMapper(data)));
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to refresh session", error);
        // setIsLoggedIn(false);
      }
    };

    checkSession();
  }, [dispatch, setIsLoggedIn]);

  const allowedUsernames = ["AdrianAdrian", "Adrian Lieblich", "RomarioFisch"];

  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme }}>
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}> {/* Использование состояния темы */}
        <Router>
          <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {isLoggedIn ? (
              <Box sx={{
                display: 'flex',
                height: '100vh',
              }}>
                <SideBar />
                <Box sx={{
                  flexGrow: 1,
                  overflow: 'auto',
                  width: '100%',
                }}>
                  <Routes>
                    <Route path={homePath} element={<Home />} />
                    <Route path={chatsPath} element={<Chats />} />
                    <Route path={aboutUsPath} element={<AboutUs />} />
                    <Route path={mediaPath} element={<VideosMainPage />} />
                    <Route path={mediaIdPath} element={<VideoPage />} />
                    <Route path={callsPath} element={<Calls />} />
                    <Route path={settingsPath} element={<Settings />} />
                    <Route path={profilePath} element={<Profile />} />
                    <Route path={sideBarPath} element={<SideBar />} />
                    <Route path={appPagePath} element={<AppPage />} />
                    <Route path={channelPagePrototypePath} element={<ChannelPage />} />
                    <Route path={channelEditPrototypePath} element={<UserChannelPage />} />
                    <Route path={productsPath} element={<ElementsShowroom />} />
                    <Route path={newGroupPath} element={<NewGroup />} />
                    <Route path={newChannelPath} element={<NewChannel />} />
                    <Route path={contactsPath} element={<Contacts />} />

                    <Route path={certificatePath} element={allowedUsernames.includes(username) ? <CertificateGenerator /> : ""} />

                  </Routes>
                </Box>
              </Box>
            ) : (
              <>
                <HeaderAndMainPage
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
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
    {localStorage.getItem("certAllow")?.toString() == "456123" ? <CertificateGenerator /> : ""}
  </ActiveSectionContext.Provider>
);
export default App;