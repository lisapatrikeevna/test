import {ImperativePanelHandle, Panel, PanelResizeHandle} from "react-resizable-panels";
import {AppPageChats} from "./appPageChats/AppPageChats.tsx";
import React, {Dispatch, SetStateAction, useRef} from "react";
import {useTheme} from "@mui/material/styles";
import {UserType} from "../chats/types.ts";

type AppPagePanelChatsProps = {
    currentUser:UserType | null
    setIsChatPanelOpen: Dispatch<SetStateAction<boolean>>
}
export const AppPageChatsPanel = ({setIsChatPanelOpen, currentUser }:AppPagePanelChatsProps) => {
    const chatsPanelRef = useRef<ImperativePanelHandle>(null);
    const chatMinSize = 370;
    const chatMinSizePercentage = (chatMinSize / window.innerWidth) * 100;
    const theme = useTheme();

    const panelResizeHandleStyles = {
        width: '1px',
        background: theme.palette.mode === 'dark' ? '#bebebe' : '#333333',
    }
    return (
        <>
            <PanelResizeHandle
                style={panelResizeHandleStyles}
            />
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
        </>
    )

}