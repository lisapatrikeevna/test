import AppPageHeader from "./appPageHeader/AppPageHeader.tsx";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {Dispatch, SetStateAction} from "react";
import styles from "./styles.ts"

type  AppPageContainerHeaderProps = {
    setIsOpenSideBar: Dispatch<SetStateAction<boolean>>;
    isLeftSideBarOpen: boolean;
};

export const AppPageContainerHeader = ({setIsOpenSideBar, isLeftSideBarOpen}:AppPageContainerHeaderProps) => {

    return (
        <Box sx={styles.container}>
            <AppPageHeader
              setIsOpenSideBar={setIsOpenSideBar}
              isLeftSideBarOpen={isLeftSideBarOpen}
             />
            <Divider />
        </Box>
    )
}