import AppPageHeader from "./appPageHeader/AppPageHeader.tsx";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import {Dispatch, SetStateAction} from "react";
import styles from "./styles.ts"

type  AppPageContainerHeaderProps = {
    setIsOpenSideBar: Dispatch<SetStateAction<boolean>>;
    setIsOpenMainSideBar: Dispatch<SetStateAction<boolean>>;
    toggleChatsPanel: () => void;
    setIsChatPanelOpen: Dispatch<SetStateAction<boolean>>;
};

export const AppPageContainerHeader = ({setIsOpenSideBar, setIsOpenMainSideBar, toggleChatsPanel, setIsChatPanelOpen}:AppPageContainerHeaderProps) => {

    return (
        <Box sx={styles.container}>
            <AppPageHeader
              setIsOpenSideBar={setIsOpenSideBar}
              setIsOpenMainSideBar={setIsOpenMainSideBar}
              toggleChatsPanel={toggleChatsPanel}
              setIsChatPanelOpen={setIsChatPanelOpen}
             />
            <Divider />
        </Box>
    )
}