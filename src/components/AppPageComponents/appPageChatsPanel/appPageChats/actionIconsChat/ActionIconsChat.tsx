import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Stack} from "@mui/material";
import {MouseEvent} from "react";
import styles from "./styles.ts"
type ActionIconsChatProps = {
    handleModal: (event: MouseEvent <SVGSVGElement>) => void;
}

export const ActionIconsChat = ({handleModal}:ActionIconsChatProps)=>{

    return(
        <Stack sx={styles.mainContainer}>
            <SearchOutlinedIcon cursor="pointer" />
            <PhoneIcon cursor="pointer" />
            <MoreVertIcon cursor="pointer" onClick={handleModal} />
        </Stack>
    )
}