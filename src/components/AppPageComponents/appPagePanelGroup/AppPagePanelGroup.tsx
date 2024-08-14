import {ImperativePanelHandle, PanelGroup} from "react-resizable-panels";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {currentUserId} from "../../../store/selectors.ts";
import {getUserAvatar} from "../../getUserAvatar.tsx";
import {RenderValues, RenderValuesCentralComponent, UserType} from "../chats/types.ts";
import {AppPageCentralPanel} from "../appPageCentralPanel/AppPageCentralPanel.tsx";
import {AppPageChatsPanel} from "../appPageChatsPanel/AppPageChatsPanel.tsx";
import {AppPageRightSideBarPanel} from "../appPageRightSideBarPanel/AppPageRightSideBarPanel.tsx";
import {AppPageListCommunities} from "../appPageListCommunities/appPageListCommunities.tsx";
import AppPageChatsToggle from "../appPageChatsPanel/appPageChats/AppPageChatsToggle/AppPageChatsToggle.tsx";
import AppPageRightSideBarPanelToggle
    from "../appPageRightSideBarPanel/AppPageRightSideBarPanelToggle/AppPageRightSideBarPanelToggle.tsx";

type AppPagePanelGroupProps = {
    renderValues: RenderValues
    renderValuesCentralComponent: RenderValuesCentralComponent
    selectedVideoId: string | null
    changeRenderCentralComponent: (value: RenderValuesCentralComponent) => void;
    setIsChatPanelOpen: Dispatch<SetStateAction<boolean>>;
    isChatPanelOpen: boolean,
    setIsRightSideBarPanelOpen: Dispatch<SetStateAction<boolean>>;
    isRightSideBarPanelOpen: boolean;
    toggleChatsPanel: () => void;
    toggleRightSideBarPanel: () => void;
    chatsPanelRef: React.RefObject<ImperativePanelHandle>;
    rightPanelRef: React.RefObject<ImperativePanelHandle>;
}

export const AppPagePanelGroup = ({
                                      renderValuesCentralComponent,
                                      renderValues,
                                      selectedVideoId,
                                      changeRenderCentralComponent,
                                      setIsChatPanelOpen,
                                      isChatPanelOpen,
                                      setIsRightSideBarPanelOpen,
                                      isRightSideBarPanelOpen,
                                      toggleRightSideBarPanel,
                                      toggleChatsPanel,
                                      chatsPanelRef,
                                      rightPanelRef,
                                  }:AppPagePanelGroupProps) => {
    const [userAvatar, setUserAvatar] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const userId = useSelector(currentUserId);

    //#region Finding size of panels, for correct collapsing and viewing them, based on minimum Pixels
    const avatarAndNamesMinSize = 260;
    const avatarAndNamesMinSizePercentage = (avatarAndNamesMinSize / window.innerWidth) * 100;
    //#endregion Finding size of panels, for correct collapsing and viewing them, based on minimum Pixels

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

    return(
        <PanelGroup direction="horizontal" style={{flex:1}}>

            <AppPageListCommunities userAvatar={userAvatar}
                                    avatarAndNamesMinSizePercentage={avatarAndNamesMinSizePercentage}
                                    setCurrentUser={setCurrentUser}
            />
            <AppPageChatsPanel
                setIsChatPanelOpen={setIsChatPanelOpen}
                currentUser={currentUser}
                chatsPanelRef={chatsPanelRef}
            />
            <AppPageChatsToggle
                toggleChatsPanel={toggleChatsPanel}
                isChatPanelOpen={isChatPanelOpen}
            />
            <AppPageCentralPanel changeRenderCentralComponent={changeRenderCentralComponent}
                                 renderValuesCentralComponent={renderValuesCentralComponent}
                                 selectedVideoId={selectedVideoId}/>
            <AppPageRightSideBarPanelToggle
                toggleRightSideBarPanel={toggleRightSideBarPanel}
                isRightSideBarPanelOpen={isRightSideBarPanelOpen}
            />
            <AppPageRightSideBarPanel
                setIsRightSideBarPanelOpen={setIsRightSideBarPanelOpen}
                toggleRightSideBarPanel={toggleRightSideBarPanel}
                renderValues={renderValues}
                rightPanelRef={rightPanelRef}
            />
        </PanelGroup>
    )
}