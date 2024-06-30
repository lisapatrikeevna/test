import SearchField from "../../SearchField.tsx";
import {ChatService} from "../../chats/chatsServer/chats.ts";
import {useState} from "react";
import {ISearchCommunitiesResponse, ICommunityInfo} from "../../../../types/types.ts";
import {ListFoundCommunities} from "./listFoundCommunities/ListFoundCommunities.tsx";

export const SearchCommunities = ()=>{
   const [foundCommunities, setFoundCommunities] = useState<ICommunityInfo[]>([])
    const [isOpenListFoundCommunities, setIsOpenListFoundCommunities] = useState(false)
    const [isLoading, setIsLoading]=useState(false)

    const onSearchCommunitiesHandler = (searchText:string)=>{
        if(!searchText.trim()){
            setFoundCommunities([])
            setIsOpenListFoundCommunities(false)
            return
        }

        const newChatService = new ChatService();
        setIsOpenListFoundCommunities(true)
        setIsLoading(true)

        newChatService.chatLogin((loginResponse) => {
            if(!loginResponse) {
                console.log("Login failed.")
                setIsLoading(false)
                return
            }

            newChatService.requestFind(searchText, (response) => {
                const {items} = (response ?? { items: [] }) as ISearchCommunitiesResponse
                setFoundCommunities(items)
                setIsLoading(false)
                newChatService.shutdown();
            });
        });
    }


    return(
        <>
            <SearchField onSearch={onSearchCommunitiesHandler} />
            <ListFoundCommunities items={foundCommunities} isLoading={isLoading} isOpen={isOpenListFoundCommunities}/>
        </>

    )



}