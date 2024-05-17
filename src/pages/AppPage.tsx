import { Divider, Stack } from '@mui/material';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import AppPageHeader from '../components/AppPageComponents/AppPageHeader';
import AppPageChats from '../components/AppPageComponents/AppPageChats';
import AppPageComments from '../components/AppPageComponents/AppPageComments';

const AppPage = () => {
  return (
    <Stack>
      <AppPageHeader />
      <Divider />

      <PanelGroup direction="horizontal" style={{ height: '100vh' }}>
        <Panel defaultSize={25} collapsible={true} maxSize={100} minSize={15}>
          <AppPageChats />
        </Panel>

        <PanelResizeHandle style={{ width: '5px', background: 'black' }} />

        <Panel defaultSize={50}>Central container</Panel>
        <PanelResizeHandle style={{ width: '5px', background: 'black' }} />
        <Panel defaultSize={25} maxSize={50} minSize={20} collapsible={true}>
          <AppPageComments />
        </Panel>
      </PanelGroup>
    </Stack>
  );
};

export default AppPage;
