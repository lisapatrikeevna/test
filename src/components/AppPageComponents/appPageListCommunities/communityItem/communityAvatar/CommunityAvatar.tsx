import styles from "./styles.ts";
import Stack from "@mui/material/Stack";
import NeuAvatar from "../../../../neumorphism/avatar/NeuAvatar.tsx";
import Box from "@mui/material/Box";
import {UserType} from "../../../chats/types.ts";

type CommunityAvatarProps = {
    item:UserType
    setCurrentUser: (user: UserType) => void
}

export const CommunityAvatar=({item, setCurrentUser}:CommunityAvatarProps)=>{
    return (
        <Box
        sx={styles.mainContainer}
        onClick={() => {
            setCurrentUser(item);
        }}
    >
        <Stack sx={styles.stack}>
            <NeuAvatar src={item.img} size="small" />
        </Stack>
    </Box>
    )
}