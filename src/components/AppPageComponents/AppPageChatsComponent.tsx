import { Box } from '@mui/system';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useTheme } from '@mui/material/styles';
import { Avatar, Stack, TextField } from '@mui/material';
import { data } from '../ProfileComponents/utils';
import NeuDivider from '../neumorphism/divider/NeuDivider';
import { useState } from 'react';
import NeuAvatar from '../neumorphism/avatar/NeuAvatar';
import AppPageChats from './AppPageChats';

const AppPageChatsComponent = () => {
  const [users] = useState(data);
  const theme = useTheme();
  return (
    <Box sx={{ height: '100%' }}>
      <PanelGroup direction="horizontal">
        <Panel minSize={15} defaultSize={1} collapsible={true}>
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
                width: '50px',
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
        <Panel>
          <AppPageChats />
        </Panel>
      </PanelGroup>
    </Box>
  );
};
export default AppPageChatsComponent;
