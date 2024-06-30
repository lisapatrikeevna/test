import {ImperativePanelHandle, Panel, PanelResizeHandle} from "react-resizable-panels";
import Box from "@mui/material/Box";
import Fon5 from "../../../assets/Fon5.jpg";
import AppPageComments from "../AppPageComments.tsx";
import VideoInSideBareAppPage from "../VideoInSideBareAppPage.tsx";
import AppPageCalendar from "../AppPageCalendar.tsx";
import AppPageAudioComponent from "../AppPageAudioComponent.tsx";
import AppPageRadioComponent from "../AppPageRadioComponent.tsx";
import {AppPageChats} from "../appPageChatsPanel/appPageChats/AppPageChats.tsx";
import {useRef} from "react";
import {useTheme} from "@mui/material/styles";
import {RenderValues} from "../chats/types.ts";

type AppPageChatsPanelProps = {
    renderValues: RenderValues
}

export const AppPageRightSideBarPanel= ({renderValues}:AppPageChatsPanelProps) => {
    const rightPanel = useRef<ImperativePanelHandle>(null);
    const theme = useTheme();
    return (
        <>
            <PanelResizeHandle
                style={{
                    width: '3px',
                    background: theme.palette.mode === 'dark' ? '#bebebe' : '#333333',
                }}
            />
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
        </>
    )


}