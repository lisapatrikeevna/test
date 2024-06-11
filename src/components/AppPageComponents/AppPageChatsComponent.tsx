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

const AppPageChatsComponent = () => {
  const [users] = useState(data);
  const theme = useTheme();

  return (
    <Box sx={{ height: '100%', display: 'flex' }}>
      <PanelGroup direction="horizontal">
        <Panel minSize={30} defaultSize={15} collapsible collapsedSize={7}>
          {/* main wrapper for avatars and names */}
          <Stack direction="column" padding={1} sx={{ minWidth: '80px' }}>
            {/* wrapper for my avatar */}
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
            {/* wrapper for usersAvatars and names*/}
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
                    gap: '10px',
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
          defaultSize={5}
          maxSize={100}
          minSize={5}
          collapsible={true}
        >
          <AppPageChats />
        </Panel>
      </PanelGroup>
    </Box>
  );
};

export default AppPageChatsComponent;
