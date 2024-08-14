import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {useTheme} from "@mui/material/styles";
import {UserType} from "../../../chats/types.ts";
import styles from "./styles.ts"

type CommunityInfoProps = {
    item:UserType
    setCurrentUser: (user: UserType) => void
}

export const CommunityInfo = ({item, setCurrentUser}:CommunityInfoProps) => {
    const theme = useTheme();
    const stackColor = theme.palette.mode === 'dark' ? '#bebebe' : '#333333'

    return(
        <Box sx={styles.mainContainer} onClick={() => {setCurrentUser(item)}}>
           <Stack sx={{ color: stackColor  }}>
            {item.name}
           </Stack>
         </Box>
    )
}