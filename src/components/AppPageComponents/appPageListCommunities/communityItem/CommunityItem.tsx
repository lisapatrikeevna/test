import {UserType} from "../../chats/types.ts";
import {CommunityAvatar} from "./communityAvatar/CommunityAvatar.tsx";
import {CommunityInfo} from "./communityInfo/CommunityInfo.tsx";
import Box from "@mui/material/Box";
import styles from "./styles.ts"

type CommunityItemProps = {
    item:UserType
    setCurrentUser: (user: UserType) => void
    isShow?:boolean

}


export const CommunityItem = ({item, setCurrentUser, isShow=true}:CommunityItemProps) => {

   return (
       <Box sx={styles.mainContainer}>
           <CommunityAvatar item={item} setCurrentUser={setCurrentUser}/>
           {isShow && <CommunityInfo item={item} setCurrentUser={setCurrentUser}/>}



       </Box>
       )
}