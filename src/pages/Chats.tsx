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

  const myId = useRef("nobody");
  const ws = useRef<WebSocket | null>(null);

  // ###############################################################################################
  // Login to the Chat Backend
  const isLocalDebug = false;
  const uid = "0000664d-bfe6-72fa-0000-c35dd09fbf9c"; // The test uid for local debugging

  const host = "ip85-215-241-41.pbiaas.com:8030"; // Dev XL server
  const chatLoginURL = `http://${host}/NeoX-chat-open`;
  // const loginURL = `http://${host}/auth/login-user`;
  const accessToken = store.getState().user.token;
  const authToken = `Bearer ${accessToken}`;
  const WS_URL = `ws://${host}/NeoX-chat/api/${accessToken}`;

  // let isConnected = false;
  // let isLogin = false;
  let eventsProcessed = 0;
  let userId = "";

  const PAGE_SIZE = 32;

  const EVENT_TYPE = {
    hello: "hello", // reply login ok
    error: "error", // Something went wrong. The "data" field contains a reason

    find: "find", // find a contact/group
    found: "found", // response for find

    echo: "echo", // test (echo) event
    echoReply: "echo-reply", // test (echo reply) event

    group: "group", // group management
    contact: "contact", // contact management
    subscription: "subscription", // subscription management

    message: "message", // publish a message to a group
    selectchat: "selectchat", // select a chat to be active
    getcontacts: "getcontacts", // get my contacts
    contactlist: "contactlist", // contact list event
  };

  const FIND_MODE = {
    plainText: 0,
    wholeWord: 1,
    regexp: 2,
    default: 0,
  };

  const chatLogin = async (success: () => void) => {
    console.log("chatLogin -- start");
    const response = isLocalDebug
      ? await fetch(chatLoginURL, {
          headers: {
            "Content-Type": "application/json",
            user_id: uid,
            Authorization: authToken,
          },
        })
      : await fetch(chatLoginURL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: authToken,
          },
        });

    console.log("Response:", response);

    // const result = await response.json();
    // console.log("Result:", result);

    if (response.ok) {
      // const content = result;

      // console.log("The content is:", content);
      // ws = new WebSocket(WS_URL);
      // wsSetup();
      success();
    } else {
      console.log(
        `Login error, status: ${response.status}, statusText: ${response.statusText}, URL: ${response.url}`
      );
    }
  };

  // Setup Web Sockets for the Back end
  const wsSetup = function () {
    setContacts(contacts);
    ws.current = new WebSocket(WS_URL);

    ws.current.addEventListener("open", (event) => {
      // isConnected = true;
      console.log("Connected to the WebSocket server", event);
    });

    ws.current.addEventListener("close", (event) => {
      // isConnected = false;
      console.log("Disconnected from the WebSocket server", event);
    });

    ws.current.addEventListener("message", (event) => {
      ++eventsProcessed;
      const response = JSON.parse(event.data);

      console.log("#", eventsProcessed, "got", response);

      switch (response.event) {
        case EVENT_TYPE.error:
          const reason = response.data;

          console.log("Error:", reason);
          break;

        case EVENT_TYPE.found:
          const data = JSON.parse(response.data);

          console.log("found", data);
          break;

        case EVENT_TYPE.hello:
          // isLogin = true;
          userId = response.data;
          console.log("My User ID:", userId);
          chatMain();
          break;

        case EVENT_TYPE.echoReply:
          const reply = response.data;

          console.log("Echo reply:", reply);
          break;

        case EVENT_TYPE.contactlist:
          break;

        case EVENT_TYPE.message:
          break;

        default:
      }
    });
  };

  // find a user/group
  const requestFind = (text: string) => {
    const request = {
      find: text,
      mode: FIND_MODE.default,
      page: 0,
      pageSize: PAGE_SIZE,
    };

    const requestEvent = {
      event: EVENT_TYPE.find,
      data: JSON.stringify(request),
    };

    ws.current?.send(JSON.stringify(requestEvent));
  };

  const chatMain = () => {
    console.log("Started");
    // requestEcho("Hello!");

    // requestSubscriptionCreate("02202fc7-ae4a-42c2-9a52-dd1d3c7c5070");
    // requestSubscriptionCreate("0eb28c53-52b3-4e13-9f74-6097d132228e");

    // requestContactCreate("0000664d-b8c1-72fa-0000-c35dd09fbf9a");
    // requestContactCreate("0000664d-d794-72fa-0000-c35dd09fbf9d");

    // requestContactDelete("15dede67-d680-49d1-84f6-ec3679c0172e");

    // requestGroupCreate("1. The Test group A");
    // requestGroupCreate("2. The Test group B");

    // requestGroupDelete("16eeadd3-f3e4-4a31-b480-2ebb2ff58350");
    // requestGroupDelete("9889f4e8-96f5-4a22-875c-3fe09e81e048");
    // requestGroupDelete("a3f631dc-ac42-49b5-b3fe-b59428a652f6");

    // requestFind("");
    // requestMessage("16eeadd3-f3e4-4a31-b480-2ebb2ff58350", "Hello!");

    // requestFind("@");
    // requestFind("voo");
    requestFind("");
  };

  useEffect(() => {
    console.log("useEffect - start");

    chatLogin(wsSetup);

    return () => {
      ws.current?.close();
    };
  }, [chatLogin, wsSetup]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (messageText && ws.current?.readyState === WebSocket.OPEN) {
      const asJson = rqMessage(messageText, replyingToMessage?.id);
      ws.current.send(asJson);
      setMessageText("");
      setReplyingToMessage(null); // Clear the reply message after sending
    }
  };

  const rqSearch = function () {
    const msg = {
      type: "search",
      status: searchQuery,
    };

    if (ws.current) ws.current.send(JSON.stringify(msg));
  };

  const rqMessage = function (text: string, replyToId?: number) {
    return JSON.stringify({
      type: "message",
      message: {
        text,
        replyToId,
      },
    });
  };

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
                { type: reactionType, userId: myId.current },
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
            rqSearch();
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
              onSubmit={handleSendMessage}
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
