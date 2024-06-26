import {Avatar, Box, Button, Collapse, Divider, Stack} from '@mui/material';
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

import Fon3 from '../assets/Fon3.jpg';
import Fon5 from '../assets/Fon5.jpg';
import { useTheme } from '@mui/material/styles';
import VideosMainPage from './Videos/VideosMainPage';
import AppPageButtonsComponent from '../components/AppPageComponents/AppPageButtonsComponent';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VR from './VR.tsx';
import VideoPage from './Videos/VideoPage.tsx';
import VideoEditPage from './Videos/VideoEditPage.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import ChannelPage from './Videos/ChannelPage.tsx';
import {data} from "../components/ProfileComponents/utils.ts";
import NeuAvatar from "../components/neumorphism/avatar/NeuAvatar.tsx";
import SearchField from "../components/AppPageComponents/SearchField.tsx";
import {getUserAvatar} from "../components/getUserAvatar.tsx";
type UserType = {
    id: number;
    img: string;
    name: string;
};

export type RenderValues =
    | 'comments'
    | 'chats'
    | 'calendar'
    | 'videos'
    | 'audio'
    | 'radio';

export type RenderValuesCentralComponent =
    | 'home'
    | 'mevipa'
    | 'VR'
    | 'videopage'
    | 'videoeditpage'
    | 'videochannel';

const AppPage = () => {
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);
    //renderValues options from rightSideBar
    const [renderValues, setRenderValues] = useState<RenderValues>('calendar');
    const [renderValuesCentralComponent, setRenderValuesCentralComponent] =
        useState<RenderValuesCentralComponent>('home');
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [isOpenMainSideBar, setIsOpenMainSideBar] = useState(false);
    const [, setIsChatPanelOpen] = useState(false);
    const theme = useTheme();

    //#region panelControl
    const chatsPanelRef = useRef<ImperativePanelHandle>(null);
    const avatarAndNamesPanelRef = useRef<ImperativePanelHandle>(null);
    const rightPanel = useRef<ImperativePanelHandle>(null);
    //#endregion panelControl

    const [showOptionsButton, setShowOptionsButton] = useState(false);

    //#region userControl
    const userId = useSelector((state: RootState) => state.user.user?.userId);
    const [users] = useState(data);
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const [userAvatar, setUserAvatar] = useState<string | null>(null);
    //#endregion userControl

    //#region Finding size of panels, for correct collapsing and viewing them, based on minimum Pixels
    const avatarAndNamesMinSize = 260;
    const avatarAndNamesMinSizePercentage = (avatarAndNamesMinSize / window.innerWidth) * 100;
    const chatMinSize = 370;
    const chatMinSizePercentage = (chatMinSize / window.innerWidth) * 100;
    //#endregion Finding size of panels, for correct collapsing and viewing them, based on minimum Pixels

    //transfer panelWidth to other centralComponents
    const [centralPanelWidth, setCentralPanelWidth] = useState(window.innerWidth);

    //#region toggleChatsPanel
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
    //#endregion toggleChatsPanel

    const openRightPanel = () => {
        rightPanel.current?.expand();
    };

    //#region useEffect isOpenSideBar
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
    //#endregion useEffect isOpenSideBar

    function changeRender(value: RenderValues) {
        setRenderValues(value);
    }

    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

    //#region changeRenderCentralComponent
    const changeRenderCentralComponent = (
        value: RenderValuesCentralComponent,
        videoId?: string
    ) => {
        setRenderValuesCentralComponent(value);
        if (videoId) {
            setSelectedVideoId(videoId);
        }
    };
    //#endregion changeRenderCentralComponent

    //#region useEffect for fetching user avatar
    useEffect(() => {
        const fetchAvatar = async () => {
            if (userId) {
                const userAvatar = await getUserAvatar(userId);
                if (typeof userAvatar === 'string') {
                    setUserAvatar(userAvatar);
                }
            }
        };

        fetchAvatar();
    }, [userId]);
    //#endregion useEffect for fetching user avatar

    return (
        <Box
            display="flex"
            flexDirection="column"
            style={{
                backgroundColor: theme.palette.background.default,
            }}
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
                display="flex"
                position="relative"
                sx={{ height: 'calc(100vh - 60px)', marginTop: '60px' }}
                overflow="auto"
            >
                <Box position="fixed" top="60px" bottom={0} left={0} zIndex={1000}>
                    <AppPageMainSideBar
                        isOpenMainSideBar={isOpenMainSideBar}
                        changeRenderCentralComponent={changeRenderCentralComponent}
                    />
                </Box>
                <PanelGroup direction="horizontal" style={{ flex: 1 }}>
                    {/*#region AppPageChatsComponent*/}
                    <Box
                        marginTop={2}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: theme.spacing(3),
                            marginLeft: theme.spacing(1),
                            marginRight: theme.spacing(1),
                        }}
                    >
                        {/*TODO Second Box with Avatars and search/name. When collapsed, show first box, when !collapsed shot 2nd box*/}
                        <Avatar
                            src={userAvatar || ''}
                            sx={{
                                width: 50,
                                height: 50,
                                cursor: 'pointer',
                                position: 'relative',
                                backgroundColor: userAvatar ? (userAvatar.startsWith('#') ? userAvatar : undefined) : undefined
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
                            <SearchField onSearch={() => { /* your code here */ }}/>
                            <Divider
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
                                {/* List of Users */}
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
                    {/*#endregion AppPageChatsComponent*/}
                    {/*#region AppPageChats*/}
                    <Panel
                        ref={chatsPanelRef}
                        minSize={chatMinSizePercentage}
                        defaultSize={chatMinSizePercentage}
                        style={{ flex: 1 }}
                        collapsible={true}
                        onExpand={() => setIsChatPanelOpen(true)}
                        onCollapse={() => setIsChatPanelOpen(false)}
                    >
                        <AppPageChats currentUser={currentUser} />
                    </Panel>
                    <PanelResizeHandle
                        style={{
                            width: '3px',
                            background: theme.palette.mode === 'dark' ? '#bebebe' : '#333333',
                        }}
                    />
                    {/*#endregion AppPageChats*/}
                    {/*#region CentralComponents*/}
                    <Panel
                        onResize={(width) => setCentralPanelWidth(width)}
                        style={{
                            backgroundImage: `url(${Fon3})`,
                            padding: theme.spacing(1),
                            position: 'relative',
                            overflowY: 'auto',
                        }}
                        defaultSize={50}
                    >
                        {renderValuesCentralComponent === 'mevipa' && (
                            <VideosMainPage
                                panelWidth={centralPanelWidth}
                                changeRenderCentralComponent={changeRenderCentralComponent}
                            />
                        )}
                        {renderValuesCentralComponent === 'videoeditpage' && (
                            <VideoEditPage userId={userId} />
                        )}
                        {renderValuesCentralComponent === 'videochannel' && (
                            <ChannelPage
                                userId={userId}
                                panelWidth={centralPanelWidth}
                                changeRenderCentralComponent={changeRenderCentralComponent}
                            />
                        )}
                        {renderValuesCentralComponent === 'videopage' && (
                            <VideoPage
                                videoId={selectedVideoId}
                                panelWidth={centralPanelWidth}
                                changeRenderCentralComponent={changeRenderCentralComponent}
                            />
                        )}
                        {renderValuesCentralComponent === 'VR' && <VR />}
                        {renderValuesCentralComponent === 'home' && (
                            <AppPageCentralComponent />
                        )}
                        {/*region OptionsPanel*/}
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: '80px',
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
                        {/*endregion OptionsPanel*/}
                    </Panel>

                    <PanelResizeHandle
                        style={{
                            width: '3px',
                            background: theme.palette.mode === 'dark' ? '#bebebe' : '#333333',
                        }}
                    />
                    {/*endregion CentralComponents*/}
                    {/*region RightSideBar*/}
                    <Panel
                        ref={rightPanel}
                        defaultSize={25}
                        maxSize={50}
                        minSize={15}
                        collapsible
                    >
                        <Box
                            height="100vh"
                            style={{ backgroundImage: `url(${Fon5})` }}
                            padding="5px"
                        >
                            {renderValues === 'chats' && <AppPageChats currentUser={null} />}
                            {renderValues === 'comments' && <AppPageComments />}
                            {renderValues === 'videos' && <VideoInSideBareAppPage />}
                            {renderValues === 'calendar' && <AppPageCalendar />}
                            {renderValues === 'audio' && <AppPageAudioComponent />}
                            {renderValues === 'radio' && <AppPageRadioComponent />}
                        </Box>
                    </Panel>
                    {/*endregion RightSideBar*/}
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
                    position="fixed"
                    top="60px"
                    bottom={0}
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
