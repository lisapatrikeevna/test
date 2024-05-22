import { Box, Divider, Typography } from '@mui/material';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import AppPageHeader from '../components/AppPageComponents/AppPageHeader';
import AppPageChats from '../components/AppPageComponents/AppPageChats';
import AppPageComments from '../components/AppPageComponents/AppPageComments';
import AppPageSideBar from '../components/AppPageComponents/AppPageSideBar';
import { useState } from 'react';
import AppPageClaendar from '../components/AppPageComponents/AppPageClaendar';
import VideoInSideBareAppPage from '../components/AppPageComponents/VideoInSideBareAppPage';
import AppPageButtonsComponent from '../components/AppPageComponents/AppPageButtonsComponent';

type RenderValues = 'comments' | 'chats' | 'calendar' | 'videos';

const AppPage = () => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const [renderValues, setRenderValues] = useState<RenderValues>('calendar');

  function changeRender(value: RenderValues) {
    setRenderValues(value);
  }

  return (
    <Box>
      <AppPageHeader setIsOpenSideBar={setIsOpenSideBar} />
      <Divider />
      <Box display="flex" position="relative">
        <PanelGroup direction="horizontal" style={{ height: '100vh' }}>
          <Panel defaultSize={25} collapsible={true} maxSize={100} minSize={15}>
            <AppPageChats />
          </Panel>

          <PanelResizeHandle style={{ width: '5px', background: 'black' }} />

          <Panel defaultSize={50}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Typography>Central container</Typography>
              <AppPageButtonsComponent />
            </Box>
          </Panel>
          <PanelResizeHandle style={{ width: '5px', background: 'black' }} />
          <Panel defaultSize={25} maxSize={50} minSize={20} collapsible={true}>
            <Box padding="5px">
              {renderValues === 'chats' && <AppPageChats />}
              {renderValues === 'comments' && <AppPageComments />}
              {renderValues === 'videos' && <VideoInSideBareAppPage />}
              {renderValues === 'calendar' && <AppPageClaendar />}
            </Box>
          </Panel>
        </PanelGroup>
        {isOpenSideBar && (
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgcolor="rgba(0, 0, 0, 0.5)"
            zIndex={999}
            onClick={() => setIsOpenSideBar(false)}
          />
        )}
        <Box position="absolute" top={0} right={0} zIndex={1000}>
          <AppPageSideBar
            isOpenSideBar={isOpenSideBar}
            changeRender={changeRender}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AppPage;
