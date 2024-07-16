import {Panel, PanelResizeHandle} from "react-resizable-panels";
import CentralDark from "../../../assets/CentralDark.png"
import CentralLight from "../../../assets/CentralLight.png"
import VideosMainPage from "../../../pages/Videos/VideosMainPage.tsx";
import VideoEditPage from "../../../pages/Videos/VideoEditPage.tsx";
import ChannelPage from "../../../pages/Videos/ChannelPage.tsx";
import VideoPage from "../../../pages/Videos/VideoPage.tsx";
import VR from "../../../pages/VR.tsx";
import AppPageCentralComponent from "../AppPageCentralComponent.tsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Collapse from "@mui/material/Collapse";
import AppPageButtonsComponent from "../AppPageButtonsComponent.tsx";
import {useTheme} from "@mui/material/styles";
import {useState} from "react";
import {RenderValuesCentralComponent} from "../chats/types.ts";
import {useSelector} from "react-redux";
import {currentUserId} from "../../../store/selectors.ts";
import styles from "./styles.ts"

type AppPageCentralPanelProps ={
    renderValuesCentralComponent: RenderValuesCentralComponent
    changeRenderCentralComponent: (value: RenderValuesCentralComponent) => void;
    selectedVideoId: string | null
}
export const AppPageCentralPanel= ({renderValuesCentralComponent, changeRenderCentralComponent, selectedVideoId}:AppPageCentralPanelProps) => {
    const theme = useTheme();
    const userId = useSelector(currentUserId);
    const [showOptionsButton, setShowOptionsButton] = useState(false);
    // Transfer panelWidth to other central components
    const [centralPanelWidth, setCentralPanelWidth] = useState(window.innerWidth);
    const backgroundImageUrl = theme.palette.mode === 'dark' ? CentralDark : CentralLight;

    return (
        <>
            <PanelResizeHandle
                style={{
                    width: '0px',
                    background: theme.palette.mode === 'dark' ? '#bebebe' : '#333333',
                }}
            />
            {/* #endregion AppPageChats */}
            {/* #region CentralComponents */}
            <Panel
                onResize={(width) => setCentralPanelWidth(width)}
                style={{
                    backgroundImage: `url(${backgroundImageUrl})`,
                    padding: theme.spacing(1),
                    position: 'relative',
                    overflowY: 'auto',
                }}
                defaultSize={50}
            >
                {renderValuesCentralComponent === 'mevipa' && (
                    <VideosMainPage
                        panelWidth={centralPanelWidth}
                        changeRenderCentralComponent={changeRenderCentralComponent}
                    />
                )}
                {renderValuesCentralComponent === 'videoeditpage' && (
                    <VideoEditPage userId={userId} />
                )}
                {renderValuesCentralComponent === 'videochannel' && (
                    <ChannelPage
                        userId={userId}
                        panelWidth={centralPanelWidth}
                        changeRenderCentralComponent={changeRenderCentralComponent}
                    />
                )}
                {renderValuesCentralComponent === 'videopage' && (
                    <VideoPage
                        videoId={selectedVideoId}
                        panelWidth={centralPanelWidth}
                        changeRenderCentralComponent={changeRenderCentralComponent}
                    />
                )}
                {renderValuesCentralComponent === 'VR' && <VR />}
                {renderValuesCentralComponent === 'home' && (
                    <AppPageCentralComponent />
                )}
                {/* region OptionsPanel */}
                <Box
                    sx={styles.buttonsContainer}
                >
                    <Button
                        variant="outlined"
                        endIcon={
                            showOptionsButton ? (
                                <KeyboardArrowDownIcon />
                            ) : (
                                <KeyboardArrowUpIcon />
                            )
                        }
                        sx={styles.optionsButtonContainer}
                        onClick={() => setShowOptionsButton((prev) => !prev)}
                    >
                        Options
                    </Button>
                    <Collapse in={showOptionsButton}>
                        <AppPageButtonsComponent />
                    </Collapse>
                </Box>
                {/* endregion OptionsPanel */}
            </Panel>
        </>
    )
}