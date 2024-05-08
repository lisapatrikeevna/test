import React, { useEffect, useRef, useState } from "react";
// import styles from "../styles/Chats.module.css";
import { store } from "../store/store";
import linkifyHtml from "linkify-html";
import {
  AttachFile,
  Redo,
  Send,
  Reply
} from "@mui/icons-material";
import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
  Paper,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import ReactionSelector from "../selectors/ReactionSelector";
import { IMessage } from "../types/types";
// import { useTheme } from "../components/ThemeContext";


const Chats: React.FC = () => {
  // const { theme } = useTheme();
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
    setSelectedMessageId(messageId);
    setShowReactionSelector(!showReactionSelector);
  };

  /*   const [messages, setMessages] = useState([
    { text: "Привет, как дела?", sentByMe: true, timestamp: new Date() },
    { text: "Все хорошо, спасибо!", sentByMe: false, timestamp: new Date() },
    { text: "Окей", sentByMe: true, timestamp: new Date()},
  ]);
 */
  // Пример данных
  const [contacts, setContacts] = useState([
    {
      id: "e6ac0106-44a8-40e7-8225-9eb75d567c5b",
      name: "Алиса",
      lastSeen: "last seen recently",
      avatar: "",
      online: true,
    },
    /*   { id: 2, name: "Боб", lastSeen: "last seen 2 hours ago", avatar: "", online: true },
  { id: 3, name: "Вася", lastSeen: "last seen 3 hours ago", avatar: "", online: true },
  { id: 4, name: "Степа", lastSeen: "last seen 4 hours ago", avatar: "", online: true },
  { id: 5, name: "Вова", lastSeen: "last seen 5 hours ago", avatar: "", online: true } */
  ]);

  const activeContact = contacts.find((contact) => contact.id === activeChat);

  const myId = useRef("nobody");
  const ws = useRef<WebSocket | null>(null);

  function chatHello(helloURL: string | URL, ifOk: (() => void)) {
    const token = store.getState().user.token;

    ws.current?.close();
    ws.current = null;

    const req = new XMLHttpRequest();

    req.open("GET", helloURL, true); // false for synchronous request
    // req.setRequestHeader("user_id", userId);
    req.setRequestHeader("Authorization", `Bearer ${token.accessToken}`);
    req.send(null);

    req.onload = function () {
      const headers = req.getAllResponseHeaders().toLowerCase();

      console.log(headers);
      console.log("status: ", req.status);

      if (req.status === 200) {
        const gotAccessToken = JSON.parse(req.responseText);
        console.log("OK got Access Token:", gotAccessToken);
        ifOk();
      }
    };
  }
  
  useEffect(() => {
    const token = store.getState().user.token;
    const currentLocation = window.location;
    const hosname = currentLocation.hostname;
    const port = 8030;
    const helloURI = "https://" + hosname + ":" + port + "/NeoX-chat-open";
    const chatURI =
      "wss://" + hosname + ":" + port + "/NeoX-chat/api/" + token.accessToken;

    // const chatURI = "ws://127.0.0.1:42024/NeoX-chat/api";
    // const chatURI = "wss://85.215.55.30:8030/NeoX-chat/api";

    console.log("helloURI:", helloURI);
    console.log("chatURI:", chatURI);

    // 'wss://85.215.55.30:8030/NeoX-chat/api'
    if (ws.current?.readyState !== WebSocket.OPEN) {
      chatHello(helloURI, () => {
        ws.current = new WebSocket(chatURI);

        ws.current.onopen = () => {
          console.log("Connected to " + chatURI);
          rqMyChats();
  
          const loc = window.location;
          const host = loc.hostname;
          console.log("host = " + host);
        };
  
        ws.current.onmessage = (event) => {
          const msg = JSON.parse(event.data);
  
          console.log("Got: " + event.data);
          handleresponse(msg);
        };
  
        ws.current.onclose = () => {
          console.log("Disconnected from the WebSocket server");
        };
      }
      );
    }

    /* eslint-disable react-hooks/exhaustive-deps */
    return () => {
      ws.current?.close();
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (messageText && ws.current?.readyState === WebSocket.OPEN) {
      const asJson = rqMessage(messageText, replyingToMessage?.id);
      ws.current.send(asJson);
      setMessageText("");
      setReplyingToMessage(null); // Сброс после отправки
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleresponse = function (msg: { type: any }) {
    switch (msg.type) {
      case "myid":
        rsMyid(msg);
        break;

      case "mychats":
        rsMyChats(msg);
        break;

      case "message":
        rsMessage(msg);
        break;

      case "search":
        rsSearch(msg);
        break;

      default:
    }
    // setMessages(prev => [...prev, { text: message.text, sentByMe: false, timestamp: new Date() }]);
  };

  const rqMyChats = function () {
    const msg = {
      type: "my_chats",
    };

    if (ws.current) ws.current.send(JSON.stringify(msg));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rsMyChats = function (msg: { type?: any; users?: any }) {
    const updatedContacts = [
      {
        id: "e6ac0106-44a8-40e7-8225-9eb75d567c5b",
        name: "Алиса",
        lastSeen: "last seen recently",
        avatar: "",
        online: true,
      },
    ];

    updatedContacts.length = 0;
    console.log("My ID: " + myId.current);

    for (const u of msg.users) {
      // const when = new Date(u.lastSeen);

      updatedContacts.push({
        id: u.id,
        name: u.name,
        lastSeen: new Date(u.lastSeen).toISOString(),
        avatar: "",
        online: u.online,
      });

      console.log("name: " + u.name + ", id: " + u.id);
    }

    setContacts(updatedContacts);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rsMyid = function (msg: { type?: any; userId?: any }) {
    myId.current = msg.userId;
    console.log("My ID: " + myId.current);
  };

  /*
const rsWho = function(msg: { userId: string; users: any; })
{
  myId.current = msg.userId;
  console.log("My ID: " + myId.current);

  const updatedContacts = [
    { id: "e6ac0106-44a8-40e7-8225-9eb75d567c5b",
    name: "Алиса",
    lastSeen: "last seen recently",
    avatar: "",
    online: true }
  ];

  updatedContacts.length = 0;

  for(let u of msg.users) {
    updatedContacts.push({
      id: u.id,
      name: u.name,
      lastSeen: new Date(u.lastSeen).toISOString(),
      avatar: "",
      online: u.online
    });

    console.log("id " + u.name + " is online");
  }

  setContacts(updatedContacts);
}
*/

  const rqSearch = function () {
    const msg = {
      type: "search",
      status: searchQuery,
    };

    if (ws.current) ws.current.send(JSON.stringify(msg));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rsSearch = function (msg: { type?: any; status?: any; users?: any }) {
    const size = msg.status;
    const users = msg.users;

    console.log("Found " + size + " users");

    for (let i = 0; i < size; ++i) {
      const u = users[i];

      console.log(
        "id: " +
          u.id +
          " name: " +
          u.name +
          " lastSeen: " +
          u.lastSeen +
          " online: " +
          u.online
      );
    }
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rsMessage = function (got: { type?: any; message?: any }) {
    const gotMsg = got.message;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        text: gotMsg.text,
        sentByMe: myId.current == gotMsg.userId,
        timestamp: new Date(gotMsg.mtime),
        reactions: [],
      },
    ]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rqChat = function (id: any) {
    const msg = {
      type: "set_chat",
      chatId: id,
    };

    if (ws.current) ws.current.send(JSON.stringify(msg));
  };

  const setChat = function (id: React.SetStateAction<string | null>) {
    setActiveChat(id);

    const updMessages = [
      {
        id: 1,
        text: "Привет, как дела?",
        sentByMe: true,
        timestamp: new Date(),
        reactions: [],
      },
    ];

    updMessages.length = 0;
    setMessages(updMessages);
    rqChat(id);
    console.log("set chat id " + id);
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
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
    <Container maxWidth={false} sx={{ display: "flex", height: "100vh" }}>
    <Box
      sx={{
        width: 300,
        backgroundColor: "#f0f0f0",
        overflowY: "auto",
        borderRight: "1px solid #ccc",
        p: 2,
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
      <List>
        {contacts
          .filter((contact) =>
            contact.name.toLowerCase().startsWith(searchQuery.toLowerCase())
          )
          .map((contact) => (
            <ListItem
              key={contact.id}
              button
              selected={activeChat === contact.id}
              onClick={() => setChat(contact.id)}
            >
              <Avatar src={contact.avatar || defaultAvatar} sx={{ mr: 2 }} />
              <ListItemText primary={contact.name} secondary={contact.lastSeen} />
            </ListItem>
          ))}
      </List>
    </Box>
    <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      {activeContact && (
        <Paper
          elevation={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            mb: 1,
          }}
        >
          <Typography variant="h6">{activeContact.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {activeContact.lastSeen}
          </Typography>
        </Paper>
      )}
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
        {activeChat &&
          messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: msg.sentByMe ? "flex-end" : "flex-start",
                mb: 2,
              }}
            >
              <Paper
                sx={{
                  maxWidth: "70%",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: msg.sentByMe ? "#e1f5fe" : "#f1f1f1",
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  {msg.sentByMe ? "You" : "Companion"}
                </Typography>
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: linkifyHtml(msg.text) }}
                ></Typography>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Typography variant="caption" sx={{ mr: 1 }}>
                    {formatTime(msg.timestamp)}
                  </Typography>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleReplyToMessage(msg)}
                  >
                    <Reply fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => toggleReactionSelector(msg.id)}
                  >
                    <Redo fontSize="small" />
                  </IconButton>
                  {showReactionSelector && selectedMessageId === msg.id && (
                    <ReactionSelector
                      onReact={(type) => handleAddReaction(msg.id, type)}
                    />
                  )}
                </Box>
              </Paper>
            </Box>
          ))}
      </Box>
      <Box
        component="form"
        onSubmit={handleSendMessage}
        sx={{ display: "flex", p: 2, borderTop: "1px solid #ccc" }}
      >
        <input
          type="file"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <IconButton color="primary" component="span">
            <AttachFile />
          </IconButton>
        </label>
        <TextField
          fullWidth
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Write a message..."
          variant="outlined"
          sx={{ mx: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          endIcon={<Send />}
        >
          Send
        </Button>
      </Box>
    </Box>
  </Container>
  );
};

export default Chats;
