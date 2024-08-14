import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import AppPageMainSideBar from '../../components/AppPageComponents/chats/AppPageMainSideBar/AppPageMainSideBar.tsx';
import styles from "./styles.ts"
import {
  AppPageContainerHeader
} from "../../components/AppPageComponents/appPageContainerHeader/AppPageContainerHeader.tsx";
import { AppPagePanelGroup } from "../../components/AppPageComponents/appPagePanelGroup/AppPagePanelGroup.tsx";
import {
  AppPageSideBarContainer
} from "../../components/AppPageComponents/appPageSideBarContainer/AppPageSideBarContainer.tsx";
import { useApp } from "../../components/hooks/useApp.ts";
import { useTheme } from "@mui/material/styles";
import AppPageLeftSideBar from "../../components/AppPageComponents/AppPageLeftSideBar/AppPageLeftSideBar.tsx";
import AppPageLeftSideBarToggle from "../../components/AppPageComponents/AppPageLeftSideBar/AppPageLeftSideBarToggle/AppPageLeftSideBarToggle.tsx";
// import {login} from "../../store/user/userSlice.ts";

const AppPage = () => {
  const theme = useTheme();
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen((prev) => !prev);
  };

  //#region consts = useApp
  const {
    isOpenSideBar, setIsOpenSideBar, isOverlayVisible, setIsOverlayVisible, isOpenMainSideBar, setIsOpenMainSideBar, renderValues, selectedVideoId, renderValuesCentralComponent, openRightPanel, changeRenderCentralComponent, changeRender, setIsChatPanelOpen, setIsRightSideBarPanelOpen, isChatPanelOpen, isRightSideBarPanelOpen, toggleChatsPanel, toggleRightSideBarPanel, chatsPanelRef, rightPanelRef,
  } = useApp();
//#endregion consts  = useApp

  //#region useEffect isOpenSideBar
  useEffect(() => {
    if( isOpenSideBar || isOpenMainSideBar ) {setIsOverlayVisible(true);} else {
      const timeout = setTimeout(() => {setIsOverlayVisible(false);}, 500);
      return () => clearTimeout(timeout);
    }
  }, [isOpenSideBar, isOpenMainSideBar, setIsOverlayVisible]);
  //#endregion useEffect isOpenSideBar

  return (<Box sx={{...styles.sideBarAndMainContainer,}}>
      <AppPageLeftSideBar
        changeRenderCentralComponent={changeRenderCentralComponent}
        currentCentralComponent={renderValuesCentralComponent}
        setIsOpenMainSideBar={setIsOpenMainSideBar}
        isLeftSideBarOpen={isLeftSidebarOpen}
      />
      <AppPageLeftSideBarToggle isLeftSideBarOpen={isLeftSidebarOpen} toggleLeftSideBar={toggleLeftSidebar}/>
      <Box sx={{
          ...styles.mainContainer, backgroundColor: theme.palette.background.default,
        }}>

        <AppPageContainerHeader setIsOpenSideBar={setIsOpenSideBar} isLeftSideBarOpen={isLeftSidebarOpen}/>

        <Box sx={styles.contentContainer}>

          <Box sx={styles.sideBarContainer}>
            <AppPageMainSideBar isOpenMainSideBar={isOpenMainSideBar}
              changeRenderCentralComponent={changeRenderCentralComponent}
              currentCentralComponent={renderValuesCentralComponent}/>
          </Box>

          <AppPagePanelGroup renderValues={renderValues} renderValuesCentralComponent={renderValuesCentralComponent}
	              selectedVideoId={selectedVideoId} setIsChatPanelOpen={setIsChatPanelOpen}
	              setIsRightSideBarPanelOpen={setIsRightSideBarPanelOpen} changeRenderCentralComponent={changeRenderCentralComponent}
	              toggleChatsPanel={toggleChatsPanel} toggleRightSideBarPanel={toggleRightSideBarPanel}
	              isChatPanelOpen={isChatPanelOpen} isRightSideBarPanelOpen={isRightSideBarPanelOpen}
	              chatsPanelRef={chatsPanelRef} rightPanelRef={rightPanelRef} />
          <AppPageSideBarContainer isOpenSideBar={isOpenSideBar} isOpenMainSideBar={isOpenMainSideBar}
		     setIsOpenSideBar={setIsOpenSideBar} setIsOpenMainSideBar={setIsOpenMainSideBar}
		     changeRender={changeRender} isOverlayVisible={isOverlayVisible}
		     openRightPanel={openRightPanel} />
        </Box>
      </Box>
    </Box>);
};

export default AppPage;