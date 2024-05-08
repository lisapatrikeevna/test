import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Chats.module.css";
import { store } from "../store/store";
import linkifyHtml from "linkify-html";
import {
  AttachFile,
  Redo,
  Send
} from "@mui/icons-material";
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
    <div className={styles.container}>
      <div className={styles.chatsSidebar}>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            rqSearch();
          }}
          className={styles.searchInput}
        />
        {contacts
          .filter((contact) =>
            contact.name.toLowerCase().startsWith(searchQuery.toLowerCase())
          )
          .map((contact) => (
            <div
              key={contact.id}
              className={`${styles.contact} ${
                activeChat === contact.id ? styles.active : ""
              }`} // Добавляем класс active, если чат активен
              onClick={() => setChat(contact.id)}
            >
              <img
                src={contact.avatar || defaultAvatar}
                alt="Avatar"
                className={styles.avatar}
              />
              <div className={styles.contactName}>{contact.name}</div>
            </div>
          ))}
      </div>
      <div className={styles.chatArea}>
        {activeContact && (
          <div className={styles.userPanel}>
            <div className={styles.userName}>{activeContact.name}</div>
            <div className={styles.userStatus}>{activeContact.lastSeen}</div>
          </div>
        )}
        <div className={styles.messagesContainer}>
          {activeChat &&
            messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  msg.sentByMe ? styles.sent : styles.received
                }`}
              >
                <div
                  className={styles.messageContentContainer}
                  onClick={() => toggleReactionSelector(msg.id)}
                >
                  <span className={styles.messageSender}>
                    {msg.sentByMe ? "You" : "Companion"}
                  </span>
                  <span
                    className={styles.messageContent}
                    dangerouslySetInnerHTML={{ __html: linkifyHtml(msg.text) }}
                  ></span>
                  {showReactionSelector && selectedMessageId === msg.id && (
                    <ReactionSelector
                      onReact={(type) => handleAddReaction(msg.id, type)}
                    />
                  )}
                </div>
                <span className={styles.messageTime}>
                  {formatTime(msg.timestamp)}
                </span>
                <div className={styles.messageActions}>
                <Redo
                    className={styles.replyIcon}
                    onClick={() => handleReplyToMessage(msg)}
                  />
                </div>
              </div>
            ))}
        </div>
        <form
          onSubmit={handleSendMessage}
          className={styles.messageInputContainer}
        >
          <input
            type="file"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload" className={styles.uploadButton}>
          <AttachFile className={styles.attachIcon} />
          </label>
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Write a message..."
            className={styles.messageInput}
          />
          <button type="submit" className={styles.sendMessageButton}>
          <Send />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chats;
