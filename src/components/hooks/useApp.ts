import { useState, useRef } from 'react';
import {RenderValues, RenderValuesCentralComponent} from "../AppPageComponents/chats/types.ts";
import {ImperativePanelHandle} from "react-resizable-panels";

export const useApp = () => {
    const [isOpenSideBar, setIsOpenSideBar] = useState(false);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [isOpenMainSideBar, setIsOpenMainSideBar] = useState(false);
    const [isChatPanelOpen, setIsChatPanelOpen] = useState(false);
    const [renderValues, setRenderValues] = useState<RenderValues>('calendar');
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
    const [isRightSideBarPanelOpen, setIsRightSideBarPanelOpen] = useState(false);

    const [renderValuesCentralComponent, setRenderValuesCentralComponent] =
        useState<RenderValuesCentralComponent>('home');

    const chatsPanelRef = useRef<ImperativePanelHandle>(null);
    const rightPanelRef = useRef<ImperativePanelHandle>(null);

    const toggleChatsPanel = () => {
        setIsChatPanelOpen((prev) => {
            const newIsOpen = !prev;
            if (newIsOpen) {
                chatsPanelRef.current?.expand();
            } else {
                chatsPanelRef.current?.collapse();
            }
            setIsChatPanelOpen(newIsOpen);
            return newIsOpen;
        });
    };

    const toggleRightSideBarPanel = () => {
        setIsRightSideBarPanelOpen((prev) => {
            const newIsOpen = !prev;
            if (newIsOpen) {
                rightPanelRef.current?.expand();

            } else {
                rightPanelRef.current?.collapse();
            }
            setIsRightSideBarPanelOpen(newIsOpen);
            return newIsOpen
        });
    };

    const openRightPanel = () => {
        rightPanelRef.current?.expand();
    };

    const changeRenderCentralComponent = (
        value: RenderValuesCentralComponent,
        videoId?: string
    ) => {
        setRenderValuesCentralComponent(value);
        if (videoId) {
            setSelectedVideoId(videoId);
        }
    };

    const changeRender = (value: RenderValues) => {
        setRenderValues(value);
    };

    return {
        isOpenSideBar,
        setIsOpenSideBar,
        isOverlayVisible,
        setIsOverlayVisible,
        isOpenMainSideBar,
        setIsOpenMainSideBar,
        renderValues,
        setRenderValues,
        selectedVideoId,
        setSelectedVideoId,
        renderValuesCentralComponent,
        setRenderValuesCentralComponent,
        chatsPanelRef,
        rightPanelRef,
        toggleChatsPanel,
        openRightPanel,
        changeRenderCentralComponent,
        changeRender,
        setIsChatPanelOpen,
        isChatPanelOpen,
        toggleRightSideBarPanel,
        setIsRightSideBarPanelOpen,
        isRightSideBarPanelOpen,
    };
};
