//TODO перенести в AppPage
import { Box } from '@mui/system';
import {ImperativePanelHandle, Panel, PanelGroup, PanelResizeHandle} from 'react-resizable-panels';
import { useTheme } from '@mui/material/styles';
import { Avatar, Stack, TextField } from '@mui/material';
import { data } from '../ProfileComponents/utils';
import NeuDivider from '../neumorphism/divider/NeuDivider';
import {useRef, useState} from 'react';
import NeuAvatar from '../neumorphism/avatar/NeuAvatar';

type AppPageChatsComponentProps = {
    setCurrentUser: (user: UserType | null) => void;
};
type UserType = {
    id: number;
    img: string;
    name: string;
};

const AppPageChatsComponent = ({ setCurrentUser }: AppPageChatsComponentProps) => {
    const theme = useTheme();
    const [users] = useState(data);
    const avatarAndNamesPanelRef = useRef<ImperativePanelHandle>(null);

    const avatarAndNamesMinSize = 260;
    const avatarAndNamesMinSizePercentage = (avatarAndNamesMinSize / window.innerWidth) * 100;

    return (
        <PanelGroup direction="horizontal" style={{ flex: 1 }}>
        <Box
            marginTop={2}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                marginLeft: '5px',
                marginRight: '5px',

            }}
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
                <Box
                    key={elem.id}
                    sx={{
                        display: 'flex',
                        gap: '10px',
                        alignItems: 'center',
                        cursor: 'pointer',
                        justifyContent: 'center',

                    }}
                    onClick={() => {
                        setCurrentUser(elem);
                    }}
                >
                    <Stack sx={{ width: '50px', display: 'flex', alignItems: 'center', }}>
                        <NeuAvatar src={elem.img} size="small" />
                    </Stack>
                </Box>
            ))}
        </Box>
    <Panel
        ref={avatarAndNamesPanelRef}
        minSize={avatarAndNamesMinSizePercentage}
        defaultSize={-1}
        style={{ flex: 1 }}
        collapsible={true}
    >
        <Stack direction="column" padding={1} sx={{ minWidth: '80px' }}>
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>

                <TextField size="small" label="Search" variant="outlined" />
            </Box>

            <NeuDivider
                baseColor={theme.palette.mode === 'dark' ? '#bebebe' : '#333333'}
                lightShadow={theme.palette.mode === 'dark' ? '#ffffff' : '#1a1a1a'}
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
                {/* Список пользователей */}
                {users.map((elem) => (
                    <Box
                        key={elem.id}
                        sx={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'flex-start',
                            cursor: 'pointer',
                            width: '40px',
                            height: '40px',
                        }}
                        onClick={() => {
                            setCurrentUser(elem);
                        }}
                    >
                        <Stack sx={{ color: theme.palette.mode === 'dark' ? '#bebebe' : '#333333' }}>
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
        </PanelGroup>
);
};
export default AppPageChatsComponent;
