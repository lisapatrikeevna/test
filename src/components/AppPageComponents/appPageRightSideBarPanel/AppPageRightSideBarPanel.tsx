import {ImperativePanelHandle, Panel, PanelResizeHandle} from "react-resizable-panels";
import Box from "@mui/material/Box";
import AppPageComments from "../AppPageComments.tsx";
import VideoInSideBareAppPage from "../VideoInSideBareAppPage.tsx";
import AppPageCalendar from "../AppPageCalendar.tsx";
import AppPageAudioComponent from "../AppPageAudioComponent.tsx";
import AppPageRadioComponent from "../AppPageRadioComponent.tsx";
import {AppPageChats} from "../appPageChatsPanel/appPageChats/AppPageChats.tsx";
import {Dispatch, SetStateAction} from "react";
import {useTheme} from "@mui/material/styles";
import {RenderValues} from "../chats/types.ts";

type AppPageChatsPanelProps = {
    setIsRightSideBarPanelOpen: Dispatch<SetStateAction<boolean>>;
    toggleRightSideBarPanel: () => void;
    renderValues: RenderValues
    rightPanelRef: React.RefObject<ImperativePanelHandle>;
}

export const AppPageRightSideBarPanel= ({renderValues, rightPanelRef,}:AppPageChatsPanelProps) => {
    const theme = useTheme();
    return (
        <>
            <PanelResizeHandle
                style={{
                    width: '1px',
                    background: theme.palette.mode === 'dark' ? '#bebebe' : '#333333',
                }}
            />
            <Panel
                ref={rightPanelRef}
                defaultSize={25}
                maxSize={50}
                minSize={15}
                collapsible
                style={{backgroundColor: theme.palette.secondary.light}}
            >
                <Box
                    height="100vh"
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