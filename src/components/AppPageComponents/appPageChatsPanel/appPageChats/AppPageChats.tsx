import { useEffect} from "react";
import "react-chat-elements/dist/main.css";
import { ChatService} from "../../chats/chatsServer/chats.ts";
import {UserType} from "../../chats/types.ts";
import styles from "./styles.ts"
import {MessageListContainer} from "./messageListContainer/MessageListContainer.tsx";
import {HeaderChatContainer} from "./headerChatContainer/HeaderChatContainer.tsx";
import {MessageInput} from "./messageInput/MessageInput.tsx";
import {MessageActionsMenu} from "./messageActionsMenu/MessageActionMenu.tsx";
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import {useChat} from "./messageActionsMenu/useChat.ts";
import {useTheme} from "@mui/material/styles";

type AppPageChatsProps = {
  currentUser: UserType | null;
};

export const AppPageChats = ({ currentUser }: AppPageChatsProps) => {
  const {
    openUserProfileModal,
    setOpenUserProfileModal,
    isOpenChatsModal,
    setIsOpenChatsModal,
    modalPosition,
    setModalPosition,
    messages,
    selectedMessageId,
    replyingToMessage,
    setReplyingToMessage,
    anchorEl,
    setChatService,
    handleSendMessage,
    handleFileUpload,
    handleAddReaction,
    handleOpenMenu,
    handleCloseMenu,
    handleDeleteMessage,
  } = useChat();

  const theme = useTheme();

  useEffect(() => {
    const newChatService = new ChatService();

    setChatService(newChatService);

    newChatService.onError((reason) => {
      console.log("error:", reason);
    });

    newChatService.onEchoReply((response) => {
      console.log("echo reply:", response);
    });

    newChatService.chatLogin(() => {
      console.log("Login OK");

      newChatService.requestFind("@", (items) => {
        console.log("found:", items);
      });
    });

    return () => {
      newChatService.shutdown();
    };
  }, []);

  // If no user is selected, prompt to select a user
  if (!currentUser) {
    return <Stack direction='row' sx={{ ...styles.mainContainer, backgroundColor: theme.palette.secondary.light }}>Select a user to start chatting</Stack>;
  }

  return (
      <Stack direction='row' sx={{ ...styles.mainContainer, backgroundColor: theme.palette.secondary.light }}>
      <Divider sx={styles.divider} />
      <Stack sx={styles.chatContainer}>
        <Stack sx={styles.headerMessageContainer}>
          <HeaderChatContainer isOpenChatsModal={isOpenChatsModal}
                               currentUser={currentUser}
                               modalPosition={modalPosition}
                               setOpenUserProfileModal={setOpenUserProfileModal}
                               openUserProfileModal={openUserProfileModal}
                               setIsOpenChatsModal={setIsOpenChatsModal}
                               setModalPosition={setModalPosition}
          />
          <MessageListContainer selectedMessageId={selectedMessageId}
                                  messages={messages}
                                  setReplyingToMessage={setReplyingToMessage}
                                  replyingToMessage={replyingToMessage}
                                  handleOpenMenu={handleOpenMenu}
                                  currentUser={currentUser}
                                  handleAddReaction={handleAddReaction}
            />
        </Stack>
        <MessageInput handleSendMessage={handleSendMessage} handleFileUpload={handleFileUpload}/>
      </Stack>
      <MessageActionsMenu handleCloseMenu={handleCloseMenu}
                          handleDeleteMessage={handleDeleteMessage}
                          selectedMessageId={selectedMessageId}
                          anchorEl={anchorEl}
      />
    </Stack>
  );
};

