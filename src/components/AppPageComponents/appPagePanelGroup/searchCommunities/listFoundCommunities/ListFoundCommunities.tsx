import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {CommunityType, ICommunityInfo, ISearchCommunitiesResponse} from "../../../../../types/types.ts";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { ChatService } from "../../../chats/chatsServer/chats.ts";
import { useState } from "react";
import DoneIcon from '@mui/icons-material/Done';
import AutorenewIcon from '@mui/icons-material/Autorenew';

interface ListFoundCommunitiesProps {
    items: ICommunityInfo[];
    isLoading: boolean;
    isOpen: boolean;
}

export const ListFoundCommunities = ({ items, isLoading, isOpen }: ListFoundCommunitiesProps) => {
    const [isLoadingAddCommunity, setIsLoadingAddCommunity] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const onAddCommunityToContactListHandler = (communityId: string, communityType: CommunityType ) => {
        // const newChatService = new ChatService();
        // setIsLoadingAddCommunity(true);
        //
        // newChatService.chatLogin((loginResponse) => {
        //     if (!loginResponse) {
        //         console.log("Login failed.");
        //         setIsLoadingAddCommunity(false);
        //         return;
        //     }
        //
        //     if (communityType===CommunityType.User){
        //         newChatService.requestUserSubscriptionCreate (communityId, () => {
        //             setIsLoadingAddCommunity(false);
        //             setIsAdded(true);
        //             newChatService.shutdown();
        //             return
        //         });
        //     }
        //
        //     newChatService.requestGroupSubscriptionCreate (communityId, () => {
        //         setIsLoadingAddCommunity(false);
        //         setIsAdded(true);
        //         newChatService.shutdown();
        //     });
        //
        //
        // });
    };

    if (!isOpen) {
        return null;
    }

    return (
        <Paper style={{ width: '100%', position: 'absolute', zIndex: 1, left: 0, top: 60 }}>
            <List>
                {isLoading ? (
                    <ListItemText primary="Loading..." style={{ padding: '10px' }} />
                ) : (
                    <>
                        {!items.length && <ListItemText primary="Not Found" style={{ padding: '10px' }} />}
                        {items.map((item) => (
                            <ListItemButton key={item.id}>
                                <ListItemText primary={item.name} />
                                <IconButton onClick={() => onAddCommunityToContactListHandler(item.id, item.type)}>
                                    {isLoadingAddCommunity && <AutorenewIcon/>}
                                    {isAdded && <DoneIcon/>}
                                    {!isAdded && !isLoadingAddCommunity  && <AddIcon />}
                                </IconButton>
                            </ListItemButton>
                        ))}
                    </>
                )}
            </List>
        </Paper>
    );
};
