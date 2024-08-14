import styles from "./styles.ts";
import {ComeBack} from "../comeBack/ComeBack.tsx";
import {ActionIconsChat} from "../actionIconsChat/ActionIconsChat.tsx";
import UserModalProfile from "../../../../../pages/UserModalProfile.tsx";
import {ChatOptionsModal} from "../сhatOptionsModal/ChatOptionsModal.tsx";
import {Stack} from "@mui/material";
import {UserType} from "../../../chats/types.ts";
import {Dispatch, MouseEvent, SetStateAction, useState} from "react"

type ModalPosition= {
    top: number;
    left: number;
}
type HeaderChatContainerProps = {
    currentUser: UserType | null;
    setOpenUserProfileModal: (openUserProfileModal: boolean) => void;
    modalPosition: ModalPosition;
    setModalPosition: Dispatch<SetStateAction<ModalPosition>>;
    isOpenChatsModal: boolean;
    setIsOpenChatsModal: Dispatch<SetStateAction<boolean>>;
    openUserProfileModal:boolean
};

export const HeaderChatContainer = ({currentUser, setOpenUserProfileModal, setModalPosition, modalPosition, isOpenChatsModal, setIsOpenChatsModal, openUserProfileModal}:HeaderChatContainerProps)=>{
    // Handle opening the modal
    const handleModal = (event: MouseEvent <SVGSVGElement>) => {
        const target = event.currentTarget as unknown as HTMLElement;
        const iconPosition = target.getBoundingClientRect();
        const leftOffset = 120;
        const bottomOffset = 11;
        setModalPosition({
            top: iconPosition.bottom + window.scrollY + bottomOffset,
            left: iconPosition.left + window.scrollX - leftOffset,
        });
        setIsOpenChatsModal(true);
    };

    // If no user is selected, prompt to select a user
    if (!currentUser) {
        return <Stack>Select a user to start chatting</Stack>;
    }
    return(
        <Stack sx={styles.headerChatContainer}>
            <ComeBack name={currentUser?.name} setOpenUserProfileModal={setOpenUserProfileModal}/>
            <ActionIconsChat handleModal={handleModal}/>
            <UserModalProfile
                open={openUserProfileModal}
                onClose={() => setOpenUserProfileModal(false)}
                currentName={currentUser.name}
            />

            <ChatOptionsModal modalPosition={{
                top: modalPosition.top,
                left: modalPosition.left
            }} onClose={() => setIsOpenChatsModal(false)} isOpen={isOpenChatsModal}/>
        </Stack>
    )

}