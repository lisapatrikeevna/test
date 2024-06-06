import { Avatar, Box, Button, Collapse, Divider } from '@mui/material';
import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
  ImperativePanelHandle,
} from 'react-resizable-panels';
import AppPageHeader from '../components/AppPageComponents/AppPageHeader';
import AppPageChats from '../components/AppPageComponents/AppPageChats';
import AppPageComments from '../components/AppPageComponents/AppPageComments';
import AppPageSideBar from '../components/AppPageComponents/AppPageSideBar';
import { useState, useEffect, useRef } from 'react';
import AppPageCalendar from '../components/AppPageComponents/AppPageCalendar';
import VideoInSideBareAppPage from '../components/AppPageComponents/VideoInSideBareAppPage';
import AppPageCentralComponent from '../components/AppPageComponents/AppPageCentralComponent';
import AppPageAudioComponent from '../components/AppPageComponents/AppPageAudioComponent';
import AppPageRadioComponent from '../components/AppPageComponents/AppPageRadioComponent';
import AppPageMainSideBar from '../components/AppPageComponents/AppPageMainSideBar';
import { Stack } from '@mui/system';
import { data } from '../components/ProfileComponents/utils';
import NeuAvatar from '../components/neumorphism/avatar/NeuAvatar';
import NeuDivider from '../components/neumorphism/divider/NeuDivider';
import Fon3 from '../assets/Fon3.jpg';
import Fon5 from '../assets/Fon5.jpg';
import { useTheme } from '@mui/material/styles';
import VideosMainPage from './Videos/VideosMainPage';
import AppPageButtonsComponent from '../components/AppPageComponents/AppPageButtonsComponent';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export type RenderValues =
  | 'comments'
  | 'chats'
  | 'calendar'
  | 'videos'
  | 'audio'
  | 'radio';

export type RenderValuesCentralComponent = 'home' | 'videospage';

const AppPage = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [renderValues, setRenderValues] = useState<RenderValues>('calendar');
  const [renderValuesCentralComponent, setRenderValuesCentralComponent] =
    useState<RenderValuesCentralComponent>('home');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isOpenMainSideBar, setIsOpenMainSideBar] = useState(false);
  const [, setIsChatPanelOpen] = useState(false);
  const [users] = useState(data);
  const theme = useTheme();
  const chatsPanelRef = useRef<ImperativePanelHandle>(null);
  const rightPanel = useRef<ImperativePanelHandle>(null);
  const [showOptionsButton, setShowOptionsButton] = useState(false);

  const toggleChatsPanel = () => {
    setIsChatPanelOpen((prev) => {
      const newIsOpen = !prev;
      if (newIsOpen) {
        chatsPanelRef.current?.expand();
      } else {
        chatsPanelRef.current?.collapse();
      }
      return newIsOpen;
    });
  };

  const openRightPanel = () => {
    rightPanel.current?.expand();
  };

  useEffect(() => {
    if (isOpenSideBar || isOpenMainSideBar) {
      setIsOverlayVisible(true);
    } else {
      const timeout = setTimeout(() => {
        setIsOverlayVisible(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isOpenSideBar, isOpenMainSideBar]);

  function changeRender(value: RenderValues) {
    setRenderValues(value);
  }

  function changeRenderCentralComponent(value: RenderValuesCentralComponent) {
    setRenderValuesCentralComponent(value);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <Box sx={{ position: 'fixed', width: '100%', zIndex: 1000 }}>
        <AppPageHeader
          setIsOpenSideBar={setIsOpenSideBar}
          setIsOpenMainSideBar={setIsOpenMainSideBar}
          toggleChatsPanel={toggleChatsPanel}
          setIsChatPanelOpen={setIsChatPanelOpen}
        />
        <Divider />
      </Box>
      <Box
        flex={1}
        display="flex"
        position="relative"
        sx={{ marginTop: '60px' }}
      >
        <Box position="absolute" left={0} zIndex={1000}>
          <AppPageMainSideBar
            isOpenMainSideBar={isOpenMainSideBar}
            changeRenderCentralComponent={changeRenderCentralComponent}
          />
        </Box>
        <PanelGroup direction="horizontal" style={{ flex: 1 }}>
          <Stack direction="column" spacing={2} padding={1} alignItems="center">
            <Box>
              <Avatar
                src={data[0].img}
                alt="avatar"
                sx={{
                  width: 50,
                  height: 50,
                  cursor: 'pointer',
                  position: 'relative',
                }}
              />
            </Box>
            <NeuDivider
              dark
              sx={{
                width: '100%',
                height: '2px',
                backgroundColor:
                  theme.palette.mode === 'dark' ? 'gray' : 'black',
              }}
            />
            {users.map((elem) => (
              <Stack key={elem.id}>
                <NeuAvatar key={elem.id} src={elem.img} size="small" />
              </Stack>
            ))}
          </Stack>
          <Panel>
            <Box marginTop={10}>
              {users.map((elem) => (
                <Stack key={elem.id} height="58px" padding="10px 0">
                  {elem.name}
                </Stack>
              ))}
            </Box>
          </Panel>

          <PanelResizeHandle style={{ width: '5px', background: 'black' }} />
          <Panel
            style={{ backgroundImage: `url(${Fon5})` }}
            ref={chatsPanelRef}
            defaultSize={25}
            maxSize={100}
            minSize={10}
            collapsible={true}
            onExpand={() => setIsChatPanelOpen(true)}
            onCollapse={() => setIsChatPanelOpen(false)}
          >
            <AppPageChats />
          </Panel>

          <PanelResizeHandle style={{ width: '5px', background: 'black' }} />

          <Panel
            style={{
              backgroundImage: `url(${Fon3})`,
              padding: '10px',
              position: 'relative',
            }}
            defaultSize={50}
          >
            {renderValuesCentralComponent === 'videospage' && (
              <VideosMainPage />
            )}
            {renderValuesCentralComponent === 'home' && (
              <AppPageCentralComponent />
            )}
            <Box
              sx={{
                position: 'absolute',
                bottom: '50px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
              }}
            >
              <Button
                variant="outlined"
                endIcon={
                  showOptionsButton ? (
                    <KeyboardArrowDownIcon />
                  ) : (
                    <KeyboardArrowUpIcon />
                  )
                }
                sx={{ width: '300px' }}
                onClick={() => setShowOptionsButton((prev) => !prev)}
              >
                Options
              </Button>
              <Collapse in={showOptionsButton}>
                <AppPageButtonsComponent />
              </Collapse>
            </Box>
          </Panel>

          <PanelResizeHandle style={{ width: '5px', background: 'black' }} />
          <Panel
            ref={rightPanel}
            defaultSize={25}
            maxSize={50}
            minSize={20}
            collapsible
          >
            <Box
              height="100vh"
              style={{ backgroundImage: `url(${Fon5})` }}
              padding="5px"
            >
              {renderValues === 'chats' && <AppPageChats />}
              {renderValues === 'comments' && <AppPageComments />}
              {renderValues === 'videos' && <VideoInSideBareAppPage />}
              {renderValues === 'calendar' && <AppPageCalendar />}
              {renderValues === 'audio' && <AppPageAudioComponent />}
              {renderValues === 'radio' && <AppPageRadioComponent />}
            </Box>
          </Panel>
        </PanelGroup>
        {isOverlayVisible && (
          <Box
            position="fixed"
            top="60px"
            left={0}
            right={0}
            bottom={0}
            bgcolor="rgba(0, 0, 0, 0.2)"
            zIndex={999}
            onClick={() => {
              setIsOpenSideBar(false);
              setIsOpenMainSideBar(false);
            }}
            style={{
              transition: 'opacity 0.3s ease',
              opacity: isOpenSideBar || isOpenMainSideBar ? 1 : 0,
              pointerEvents:
                isOpenSideBar || isOpenMainSideBar ? 'auto' : 'none',
            }}
          />
        )}
        <Box
          position="absolute"
          top={0}
          right={0}
          zIndex={isOpenSideBar ? 1000 : -1}
        >
          <AppPageSideBar
            openRightPanel={openRightPanel}
            isOpenSideBar={isOpenSideBar}
            changeRender={changeRender}
            setIsOpenSideBar={setIsOpenSideBar}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AppPage;
