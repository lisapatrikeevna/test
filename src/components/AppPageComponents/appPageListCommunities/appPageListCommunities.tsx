import {UserType} from "../chats/types.ts";
import {AppPageListAvatarCommunities} from "./appPageListAvatarCommunities/AppPageListAvatarCommunities.tsx";
import {AppPageListInfoCommunities} from "./appPageListInfoCommunities/AppPageListInfoCommunities.tsx";
import {useEffect, useState} from "react";
import {ChatService} from "../chats/chatsServer/chats.ts";
import {data} from "../../ProfileComponents/utils.ts";

 type AppPageListCommunitiesProps = {
    userAvatar: string | null
    setCurrentUser: (user: UserType) => void
    avatarAndNamesMinSizePercentage:number

}

export const AppPageListCommunities = ({userAvatar,  setCurrentUser, avatarAndNamesMinSizePercentage}:AppPageListCommunitiesProps) => {
    const [isLoadingGetContactsList, setIsLoadingGetContactsList] = useState(false)
    const [communities, setCommunities] = useState<UserType[] | null>(data);

    useEffect(()=>{
        const newChatService = new ChatService();
        setIsLoadingGetContactsList(true);

        newChatService.chatLogin((loginResponse) => {
            if (!loginResponse) {
                console.log("Login failed.");
                setIsLoadingGetContactsList(false);
                return;
            }

            newChatService.onContactList( (response) => {
                console.log('onContactList',response);
                // setCommunities(response)
                setIsLoadingGetContactsList(false);
                newChatService.shutdown();
            });
        });
    },[communities] )



    return (
        <>
            {/*<AppPageListAvatarCommunities communities={communities}*/}
            {/*                              userAvatar={userAvatar}*/}
            {/*                              setCurrentUser={setCurrentUser}*/}
            {/*/>*/}
            <AppPageListInfoCommunities communities={communities}
                                        setCurrentUser={setCurrentUser}
                                        avatarAndNamesMinSizePercentage={avatarAndNamesMinSizePercentage}
                                        userAvatar={userAvatar}/>
        </>

    )
}