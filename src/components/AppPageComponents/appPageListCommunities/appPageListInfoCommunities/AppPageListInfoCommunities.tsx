import Stack from "@mui/material/Stack";
import {SearchCommunities} from "../../appPagePanelGroup/searchCommunities/SearchCommunities.tsx";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import {ImperativePanelHandle, Panel} from "react-resizable-panels";
import {UserType} from "../../chats/types.ts";
import { useRef} from "react";
import styles from "./styles.ts"
import {CommunityItem} from "../communityItem/CommunityItem.tsx";
import Avatar from "@mui/material/Avatar";

type AppPageListInfoCommunities = {
    userAvatar: string | null
    communities:UserType[] | null
    setCurrentUser: (user: UserType) => void
    avatarAndNamesMinSizePercentage:number
}



export const AppPageListInfoCommunities =({communities, setCurrentUser, avatarAndNamesMinSizePercentage, userAvatar}:AppPageListInfoCommunities)=>{
    const avatarAndNamesPanelRef = useRef<ImperativePanelHandle>(null);
    const backgroundColorUserAvatar = userAvatar ? (userAvatar.startsWith('#') ? userAvatar : undefined) : undefined
    const size = 3.48
    return(
        <Panel
            ref={avatarAndNamesPanelRef}
            collapsible
            collapsedSize={size}
            defaultSize={size}
            minSize={size}
        >
            <Stack sx={styles.stack}>
                <Box sx={styles.avatarAndSearchContainer}>
                    <Avatar
                        src={userAvatar || ''}
                        sx={{
                            ...styles.userAvatar,
                            backgroundColor: backgroundColorUserAvatar
                        }}
                    />
                    <SearchCommunities />
                </Box>
                <Divider sx={styles.divider}/>
                <Box sx={styles.communitiesListContainer}>
                    {/* List of Users */}
                    {communities?.map((elem) => <CommunityItem key={elem.id} item={elem}  setCurrentUser={ setCurrentUser}/>)}
                </Box>
            </Stack>
        </Panel>
    )
}