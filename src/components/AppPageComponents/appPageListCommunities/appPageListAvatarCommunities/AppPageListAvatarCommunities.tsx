import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material/styles";
import {UserType} from "../../chats/types.ts";
import styles from "./styles.ts" ;
import {CommunityItem} from "../communityItem/CommunityItem.tsx";


type AppPageListAvatarCommunitiesProps = {
    userAvatar: string | null
    communities:UserType[] | null
    setCurrentUser: (user: UserType) => void

}

export const AppPageListAvatarCommunities = ({userAvatar, setCurrentUser, communities}:AppPageListAvatarCommunitiesProps)=>{
    const theme = useTheme();
    const backgroundColorUserAvatar = userAvatar ? (userAvatar.startsWith('#') ? userAvatar : undefined) : undefined
    return (
        <Box
            sx={{
                ...styles.mainContainer,
                gap: theme.spacing(3),
                marginLeft: theme.spacing(1),
                marginRight: theme.spacing(1),
            }}
        >
            <Avatar
                src={userAvatar || ''}
                sx={{
                    ...styles.userAvatar,
                    backgroundColor: backgroundColorUserAvatar
                }}
            />
            {communities?.map((elem) => (
                <CommunityItem item={elem} key={elem.id} setCurrentUser={setCurrentUser} isShow={false}/>
            ))}
        </Box>
    )
}