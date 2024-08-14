import Box from "@mui/material/Box";
import AppPageSideBar from "../AppPageSideBar.tsx";
import {Dispatch, SetStateAction} from "react";
import {RenderValues} from "../chats/types.ts";

type AppPageSideBarContainerProps = {
    isOverlayVisible:boolean
    isOpenSideBar: boolean;
    openRightPanel: () => void;
    changeRender: (value: RenderValues) => void;
    setIsOpenSideBar: Dispatch<SetStateAction<boolean>>
    isOpenMainSideBar: boolean;
    setIsOpenMainSideBar: (open: boolean) => void;
}



export const AppPageSideBarContainer = ({isOverlayVisible, setIsOpenSideBar, isOpenSideBar, openRightPanel, changeRender, setIsOpenMainSideBar, isOpenMainSideBar}:AppPageSideBarContainerProps)=>{
    return (
        <>
            {isOverlayVisible && (
                <Box position="fixed" top="60px" left={0} right={0} bottom={0} bgcolor="rgba(0, 0, 0, 0.2)"
                    zIndex={999} onClick={() => {
                        setIsOpenSideBar(false);
                        setIsOpenMainSideBar(false);
                    }}
                    style={{
                        transition: 'opacity 0.3s ease',
                        opacity: isOpenSideBar || isOpenMainSideBar ? 1 : 0,
                        pointerEvents:
                            isOpenSideBar || isOpenMainSideBar ? 'auto' : 'none',
                    }}
                />
            )}
            <Box position="fixed" top="60px" bottom={0} right={0} zIndex={isOpenSideBar ? 1000 : -1} >
                <AppPageSideBar openRightPanel={openRightPanel} isOpenSideBar={isOpenSideBar}
                    changeRender={changeRender} setIsOpenSideBar={setIsOpenSideBar} />
            </Box>
        </>
    )


}