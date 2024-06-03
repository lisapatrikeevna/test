import { Avatar, Box, Divider } from '@mui/material';
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

export type RenderValues =
  | 'comments'
  | 'chats'
  | 'calendar'
  | 'videos'
  | 'audio'
  | 'radio';

const AppPage = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [renderValues, setRenderValues] = useState<RenderValues>('calendar');
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isOpenMainSideBar, setIsOpenMainSideBar] = useState(false);
  const [users] = useState(data);

  const chatsPanelRef = useRef<ImperativePanelHandle>(null);
  const rightPanel = useRef<ImperativePanelHandle>(null);

  const toggleChatsPanel = () => {
    setIsOpenSideBar((prev) => {
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

  return (
    <Box height="100vh" display="flex" flexDirection="column">
      <AppPageHeader
        setIsOpenSideBar={setIsOpenSideBar}
        setIsOpenMainSideBar={setIsOpenMainSideBar}
        toggleChatsPanel={toggleChatsPanel}
      />
      <Divider />
      <Box flex={1} display="flex" position="relative">
        <Box position="absolute" top={0} left={0} zIndex={1000}>
          <AppPageMainSideBar isOpenMainSideBar={isOpenMainSideBar} />
        </Box>
        <Stack
          direction="column"
          spacing={2}
          padding={1}
          borderRight="1px solid black"
          alignItems="center"
        >
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
          {users.map((elem) => (
            <Avatar key={elem.id} src={elem.img} />
          ))}
        </Stack>
        <PanelGroup direction="horizontal" style={{ flex: 1 }}>
          <Panel
            ref={chatsPanelRef}
            defaultSize={25}
            maxSize={100}
            minSize={10}
            collapsible={true}
            onExpand={() => setIsChatPanelOpen(true)}
            onCollapse={() => setIsChatPanelOpen(false)}
            minSize={4}
            collapsible
          >
            <AppPageChats />
          </Panel>

          <PanelResizeHandle style={{ width: '5px', background: 'black' }} />

          <Panel defaultSize={50}>
            <AppPageCentralComponent />
          </Panel>
          <PanelResizeHandle style={{ width: '5px', background: 'black' }} />
          <Panel
            ref={rightPanel}
            defaultSize={25}
            maxSize={50}
            minSize={20}
            collapsible
          >
            <Box padding="5px">
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
