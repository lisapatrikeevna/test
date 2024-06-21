import { FC, useEffect, useRef, useState } from "react";
import { store } from "../store/store";
import linkifyHtml from "linkify-html";
import { AttachFile, Send } from "@mui/icons-material";
import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import ReactionSelector from "../selectors/ReactionSelector";
import { IMessage } from "../types/types";
import { useTheme } from "@mui/material/styles";
import {
  Avatar,
  ChatList,
  MessageList,
  Input,
  // Button,
} from "react-chat-elements";
import "react-chat-elements/dist/main.css";

const Chats: FC = () => {
  const theme = useTheme();
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleReplyToMessage = (message: IMessage) => {
    setReplyingToMessage(message);
  };

  const toggleReactionSelector = (messageId: number) => {
    console.log("Toggling reactions for messageId:", messageId);
    setSelectedMessageId(messageId);
    setShowReactionSelector(!showReactionSelector);
  };

  /*   const [messages, setMessages] = useState([
    { text: "Привет, как дела?", sentByMe: true, timestamp: new Date() },
    { text: "Все хорошо, спасибо!", sentByMe: false, timestamp: new Date() },
    { text: "Окей", sentByMe: true, timestamp: new Date()},
  ]);
 */
  // Example of a contact object
  const [contacts, setContacts] = useState([
    {
      id: "e6ac0106-44a8-40e7-8225-9eb75d567c5b",
      name: "Алиса",
      lastSeen: "last seen recently",
      avatar: "",
      online: true,
      lastMessage: "Окей",
    },
    /*   { id: 2, name: "Боб", lastSeen: "last seen 2 hours ago", avatar: "", online: true },
  { id: 3, name: "Вася", lastSeen: "last seen 3 hours ago", avatar: "", online: true },
  { id: 4, name: "Степа", lastSeen: "last seen 4 hours ago", avatar: "", online: true },
  { id: 5, name: "Вова", lastSeen: "last seen 5 hours ago", avatar: "", online: true } */
  ]);

  const activeContact = contacts.find((contact) => contact.id === activeChat);

  useEffect(() => {
    console.log("useEffect -- started");

    return () => {
      console.log("useEffect -- shutdown");
    };
  }, []);

  // let chatService: ChatService | null = null;


  // useEffect(() => {
  //   console.log("useEffect -- started");
    
  //   chatService = new ChatService();
  //   chatService.chatLogin();

  //   return () => {
  //     chatService?.shutdown();
  //     console.log("useEffect -- shutdown");
  //   };
  // }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const fileContent = e.target!.result; // Basic encoding of the file
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1, // Add the required 'id' property
            text: `File: ${file.name}`,
            sentByMe: true,
            timestamp: new Date(),
            fileContent, // If you want to save the file content
            reactions: [],
          },
        ]);
      };
      reader.readAsDataURL(file); // Encode the file in base64 format
    }
  };

  const handleAddReaction = (messageId: number, reactionType: string) => {
    setMessages((messages) =>
      messages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              reactions: [
                ...msg.reactions,
                { type: reactionType, userId: "" },
              ],
            }
          : msg
      )
    );
  };

  const defaultAvatar =
    "https://miro.medium.com/v2/resize:fit:640/format:webp/1*W35QUSvGpcLuxPo3SRTH4w.png";

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Left chat list */}
      <Box
        sx={{
          width: 300,
          backgroundColor: theme.palette.background.paper,
          overflowY: "auto",
          borderRight: "1px solid",
          borderLeft: "1px solid",
          borderColor: theme.palette.divider,
          pt: 1,
        }}
      >
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            // rqSearch();
          }}
          sx={{ mb: 2 }}
        />
        <ChatList
          className="chat-list"
          dataSource={contacts.map((contact) => ({
            avatar: contact.avatar || defaultAvatar,
            title: contact.name,
            subtitle: contact.lastMessage,
            date: new Date(contact.lastSeen),
            unread: 0,
            id: contact.id,
            onClick: () => setActiveChat(contact.id.toString()), // Convert item.id to a string
          }))}
          onClick={(item) => setActiveChat(item.id.toString())} // Convert item.id to a string
          id="chat-list-id"
          lazyLoadingImage="lazy-loading-image"
        />
      </Box>

      {/* Main panel with messages */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {activeContact ? (
          <>
            {/* Top panel with contact information */}
            <Paper
              elevation={2}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                p: 2,
                mb: 1,
                width: "100%",
                borderRadius: 0,
              }}
            >
              <Avatar
                src={activeContact.avatar || defaultAvatar}
                alt="avatar"
                size="medium"
                type="circle"
              />
              <Typography variant="h6" sx={{ ml: 2 }}>
                {activeContact.name}
              </Typography>
              <Typography variant="body2" sx={{ ml: 2 }} color="textSecondary">
                {activeContact.lastSeen}
              </Typography>
            </Paper>

            {/* Message list */}
            <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
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
                  title: activeContact?.name || "Unknown",
                  titleColor: "#000",
                  forwarded: true,
                  removeButton: true,
                  notch: true,
                  retracted: false,
                  focus: false,
                  onClick: () => toggleReactionSelector(msg.id),
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
                }))}
              />
            </Box>

            {/* New message entry field */}

            <Box
              component="form"
              onSubmit={() => {}}
              sx={{
                display: "flex",
                borderTop: "1px solid",
                borderColor: theme.palette.divider,
              }}
            >
              <Input
                multiline={true}
                placeholder="Write a message..."
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
                        <AttachFile />
                      </IconButton>
                    </label>
                  </>
                }
                rightButtons={
                  <IconButton color="primary" type="submit" title="Send">
                    <Send />
                  </IconButton>
                }
              />
            </Box>
          </>
        ) : (
          // Message when no chat is selected
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" color="textSecondary">
              Choose a chat to start messaging
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Chats;
