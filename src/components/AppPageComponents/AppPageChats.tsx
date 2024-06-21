import {
  Divider,
  Stack,
  IconButton,
  Typography,
  Box,
  Modal,
  Menu,
  MenuItem,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UserModalProfile from "../../pages/UserModalProfile";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import Person2Icon from "@mui/icons-material/Person2";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import linkifyHtml from "linkify-html";
import { MessageList, Input } from "react-chat-elements";
import ReactionSelector from "../../selectors/ReactionSelector";
import { IMessage } from "../../types/types";
import "react-chat-elements/dist/main.css";

import { ChatService, EVENT_TYPE } from "./chats/chats";

type UserType = {
  id: number;
  img: string;
  name: string;
};

type AppPageChatsProps = {
  currentUser: UserType | null;
};

const AppPageChats = ({ currentUser }: AppPageChatsProps) => {
  const [openUserProfileModal, setOpenUserProfileModal] = useState(false);
  const [isOpenChatsModal, setIsOpenChatsModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([
    {
      id: 1,
      text: "Привет, как дела?",
      sentByMe: true,
      timestamp: new Date(),
      reactions: [],
    },
    {
      id: 2,
      text: "Все хорошо, спасибо!",
      sentByMe: false,
      timestamp: new Date(),
      reactions: [],
    },
    {
      id: 3,
      text: "Окей",
      sentByMe: true,
      timestamp: new Date(),
      reactions: [],
    },
  ]);

  const messageListRef = useRef(null);
  const [showReactionSelector, setShowReactionSelector] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null
  );
  const [replyingToMessage, setReplyingToMessage] = useState<IMessage | null>(
    null
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // The Chat Service -- begin
  const [chatService, setChatService] = useState<ChatService | null>(null);

  useEffect(() => {
    const newChatService = new ChatService();
    setChatService(newChatService);
    newChatService.chatLogin();

    return () => {
      newChatService.shutdown();
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (messageText && chatService?.isOpen()) {
      const message = {
        id: messages.length + 1,
        text: messageText,
        sentByMe: true,
        timestamp: new Date(),
        reactions: [],
      };

      chatService.wsSend({
        event: EVENT_TYPE.message,
        data: JSON.stringify(message),
      });

      setMessages((prevMessages) => [...prevMessages, message]);
      setMessageText("");
      setReplyingToMessage(null);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const fileContent = e.target!.result as string;
        const message = {
          id: messages.length + 1,
          text: `File: ${file.name}`,
          sentByMe: true,
          timestamp: new Date(),
          fileContent,
          reactions: [],
        };

        chatService?.wsSend({
          event: EVENT_TYPE.message,
          data: JSON.stringify(message),
        });

        setMessages((prevMessages) => [...prevMessages, message]);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleAddReaction = (messageId: number, reactionType: string) => {
    setMessages((messages) =>
      messages.map((msg) => {
        const uid : string | undefined = chatService?.getUserId();

        return msg.id === messageId
          ? {
              ...msg,
              reactions: [
                ...msg.reactions,
                { type: reactionType, userId: uid! },
              ],
            }
          : msg;
      })
    );
  };

  const getReactionsSummary = (
    reactions: { type: string; userId: string }[]
  ) => {
    const reactionCounts = reactions.reduce(
      (acc: Record<string, number>, reaction) => {
        if (!acc[reaction.type]) {
          acc[reaction.type] = 0;
        }
        acc[reaction.type]++;
        return acc;
      },
      {}
    );

    return Object.entries(reactionCounts)
      .map(([type, count]) => `${type}: ${count}`)
      .join(", ");
  };

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    messageId: number
  ) => {
    setSelectedMessageId(messageId);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDeleteMessage = (messageId: number) => {
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.id !== messageId)
    );
    handleCloseMenu();
  };

  const handleReplyToMessage = (message: IMessage) => {
    setReplyingToMessage(message);
  };

  const handleModal = (event: React.MouseEvent<SVGSVGElement>) => {
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

  const handleUserProfileClick = () => {
    setOpenUserProfileModal(true); // Open userProfile modal
  };

  if (!currentUser) {
    return <Stack>Select a user to start chatting</Stack>;
  }

  return (
    <Stack
      direction="row"
      sx={{
        width: "100%",
        borderRadius: "5px",
        height: "100%",
      }}
    >
      <Divider sx={{ color: "black" }} />
      <Stack
        width="100%"
        padding={1}
        sx={{ flexGrow: 1, position: "relative" }}
      >
        <Stack sx={{ flexGrow: 1 }}>
          <Stack
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'absolute',
              width: '100%',
              zIndex: '100',
              padding: '10px',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <ArrowBackIcon cursor="pointer" />
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={handleUserProfileClick}
              >
                {currentUser.name}
              </Typography>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <SearchOutlinedIcon cursor="pointer" />
              <PhoneIcon cursor="pointer" />
              <MoreVertIcon cursor="pointer" onClick={handleModal} />
            </Stack>
            <UserModalProfile
              open={openUserProfileModal}
              onClose={() => setOpenUserProfileModal(false)}
              currentName={currentUser.name}
            />
            <Modal
              open={isOpenChatsModal}
              onClose={() => setIsOpenChatsModal(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                display="flex"
                flexDirection="column"
                gap={1}
                sx={{
                  position: "absolute",
                  padding: "15px",
                  borderRadius: "3px",
                  background: "#e0e0e0",
                  top: modalPosition.top,
                  left: modalPosition.left,
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <VolumeOffIcon />
                  <Typography>Mute</Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <Person2Icon />
                  <Typography>Profile</Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <VideoCallIcon />
                  <Typography>Video call</Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <SearchIcon />
                  <Typography>Search</Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <DeleteIcon />
                  <Typography>Delete chat</Typography>
                </Stack>
              </Box>
            </Modal>
          </Stack>
          <Stack sx={{ marginTop: "40px" }}>
            <MessageList
              referance={messageListRef}
              className="message-list"
              lockable={true}
              toBottomHeight="100%"
              dataSource={messages.map((msg) => ({
                position: msg.sentByMe ? "right" : "left",
                type: "text",
                text: linkifyHtml(msg.text, { target: "_blank" }),
                date: msg.timestamp,
                id: msg.id.toString(),
                title: currentUser?.name || "Unknown",
                titleColor: "#000",
                forwarded: true,
                removeButton: true,
                notch: true,
                retracted: false,
                focus: false,
                onClick: () => setShowReactionSelector(true),
                replyButton: true,
                reply:
                  msg.id === replyingToMessage?.id
                    ? {
                        title: "Reply to:",
                        message: replyingToMessage.text,
                      }
                    : undefined,
                status: "read",
                onReplyClick: () => handleReplyToMessage(msg),
                renderAddCmp: () =>
                  showReactionSelector && selectedMessageId === msg.id ? (
                    <ReactionSelector
                      onReact={(type) => handleAddReaction(msg.id, type)}
                    />
                  ) : null,
                renderReactions: () =>
                  msg.reactions.length > 0 ? (
                    <Typography variant="caption">
                      {getReactionsSummary(msg.reactions)}
                    </Typography>
                  ) : null,
                renderButtons: () => (
                  <IconButton
                    aria-controls="message-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleOpenMenu(event, msg.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                ),
              }))}
            />
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center">
          <Input
            placeholder="Write a message..."
            multiline={true}
            value={messageText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessageText(e.target.value)
            }
            maxHeight={100}
            leftButtons={
              <>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  id="file-upload"
                  style={{
                    display: "none",
                  }}
                />
                <label htmlFor="file-upload">
                  <IconButton color="primary" component="span">
                    <AttachFileIcon style={{ color: "#1976d2" }} />
                  </IconButton>
                </label>
              </>
            }
            rightButtons={
              <>
                <IconButton color="primary">
                  <SentimentSatisfiedAltIcon />
                </IconButton>
                <IconButton color="primary">
                  <KeyboardVoiceOutlinedIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  onClick={handleSendMessage}
                  title="Send"
                >
                  <SendIcon />
                </IconButton>
              </>
            }
          />
        </Stack>
      </Stack>

      <Menu
        id="message-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => handleDeleteMessage(selectedMessageId!)}>
          Delete
        </MenuItem>
        {/* Add more actions here */}
      </Menu>
    </Stack>
  );
};

export default AppPageChats;
