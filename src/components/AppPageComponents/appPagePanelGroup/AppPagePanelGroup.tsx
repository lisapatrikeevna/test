import { PanelGroup} from "react-resizable-panels";
import {Dispatch, SetStateAction, useEffect,useState} from "react";
import {useSelector} from "react-redux";
import {currentUserId} from "../../../store/selectors.ts";
import {getUserAvatar} from "../../getUserAvatar.tsx";
import {RenderValues, RenderValuesCentralComponent, UserType} from "../chats/types.ts";
import {AppPageCentralPanel} from "../appPageCentralPanel/AppPageCentralPanel.tsx";
import {AppPageChatsPanel} from "../appPageChatsPanel/AppPageChatsPanel.tsx";
import {AppPageRightSideBarPanel} from "../appPageRightSideBarPanel/AppPageRightSideBarPanel.tsx";
import {AppPageListCommunities} from "../appPageListCommunities/appPageListCommunities.tsx";

type AppPagePanelGroupProps = {
    renderValues: RenderValues
    renderValuesCentralComponent: RenderValuesCentralComponent
    selectedVideoId: string | null
    setIsChatPanelOpen: Dispatch<SetStateAction<boolean>>
    changeRenderCentralComponent: (value: RenderValuesCentralComponent) => void;
}

export const AppPagePanelGroup = ({renderValuesCentralComponent, renderValues, selectedVideoId,setIsChatPanelOpen, changeRenderCentralComponent}:AppPagePanelGroupProps) => {
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

    return(

        <PanelGroup direction="horizontal" style={{flex:1}}>
            <AppPageListCommunities userAvatar={userAvatar}
                                    avatarAndNamesMinSizePercentage={avatarAndNamesMinSizePercentage}
                                    setCurrentUser={setCurrentUser}
            />
            <AppPageChatsPanel setIsChatPanelOpen={setIsChatPanelOpen} currentUser={currentUser}/>
            <AppPageCentralPanel changeRenderCentralComponent={changeRenderCentralComponent}
                                 renderValuesCentralComponent={renderValuesCentralComponent}
                                 selectedVideoId={selectedVideoId}/>
            <AppPageRightSideBarPanel renderValues={renderValues}/>
        </PanelGroup>
    )
}