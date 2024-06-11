import { Box } from '@mui/system';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useTheme } from '@mui/material/styles';
import { Avatar, Stack, TextField } from '@mui/material';
import { data } from '../ProfileComponents/utils';
import NeuDivider from '../neumorphism/divider/NeuDivider';
import { useState } from 'react';
import NeuAvatar from '../neumorphism/avatar/NeuAvatar';
import AppPageChats from './AppPageChats';
import Fon5 from '../../assets/Fon5.jpg';
import { RefObject } from 'react';
import { ImperativePanelHandle } from 'react-resizable-panels';

type AppPageChatsComponentProps = {
  chatsPanelRef: RefObject<ImperativePanelHandle>;
  setIsChatPanelOpen: (isOpen: boolean) => void;
};

const AppPageChatsComponent: React.FC<AppPageChatsComponentProps> = (
  {
    // chatsPanelRef,
    // setIsChatPanelOpen,
  }
) => {
  const [users] = useState(data);
  const theme = useTheme();

  return (
    <Box sx={{ height: '100%' }}>
      <PanelGroup direction="horizontal">
        <Panel
          // ref={chatsPanelRef}
          minSize={13}
          defaultSize={5}
          // collapsible={true}
          // onExpand={() => setIsChatPanelOpen(true)}
          // onCollapse={() => setIsChatPanelOpen(false)}
          // collapsedSize={10}
        >
          <Stack direction="column" padding={1}>
            <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
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
              <TextField size="small" label="Search" variant="outlined" />
            </Box>
            <NeuDivider
              baseColor={theme.palette.mode === 'dark' ? '#bebebe' : '#333333'}
              lightShadow={
                theme.palette.mode === 'dark' ? '#ffffff' : '#1a1a1a'
              }
              sx={{
                width: '100%',
                height: '2px',
                marginTop: '20px',
              }}
            />
            <Box
              marginTop={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginLeft: '5px',
              }}
            >
              {users.map((elem) => (
                <Box
                  key={elem.id}
                  sx={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <Stack
                    key={elem.id}
                    sx={{
                      width: '50px',
                    }}
                  >
                    <NeuAvatar key={elem.id} src={elem.img} size="small" />
                  </Stack>
                  <Stack
                    key={elem.id}
                    sx={{
                      color:
                        theme.palette.mode === 'dark' ? '#bebebe' : '#333333',
                    }}
                  >
                    {elem.name}
                  </Stack>
                </Box>
              ))}
            </Box>
          </Stack>
        </Panel>
        <PanelResizeHandle
          style={{
            width: '3px',
            background: theme.palette.mode === 'dark' ? '#bebebe' : '#333333',
          }}
        />
        <Panel
          style={{ backgroundImage: `url(${Fon5})` }}
          // ref={chatsPanelRef}
          defaultSize={5}
          maxSize={100}
          minSize={5}
          collapsible={true}
          // onExpand={() => setIsChatPanelOpen(true)}
          // onCollapse={() => setIsChatPanelOpen(false)}
          // collapsedSize={60}
        >
          <AppPageChats />
        </Panel>
      </PanelGroup>
    </Box>
  );
};
export default AppPageChatsComponent;
