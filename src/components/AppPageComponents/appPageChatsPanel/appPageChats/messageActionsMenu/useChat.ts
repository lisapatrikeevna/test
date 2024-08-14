import { useState,  FormEvent, ChangeEvent, MouseEvent } from 'react';
import {IMessage} from "../../../../../types/types.ts";
import {ChatService, EVENT_TYPE} from "../../../chats/chatsServer/chats.ts";

export const useChat = () => {
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
    const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
    const [replyingToMessage, setReplyingToMessage] = useState<IMessage | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [chatService, setChatService] = useState<ChatService | null>(null);

    // Handle sending a message
    const handleSendMessage = (e: FormEvent) => {
        e.preventDefault();

        if (messageText) {
            const message = {
                id: messages.length + 1,
                text: messageText,
                sentByMe: true,
                timestamp: new Date(),
                reactions: [],
            };

            if (chatService?.isOpen()) {
                chatService.wsSend({
                    event: EVENT_TYPE.message,
                    data: JSON.stringify(message),
                });
            }

            setMessages((prevMessages) => [...prevMessages, message]);
            setMessageText("");
            setReplyingToMessage(null);
        }
    };

    // Handle file upload
    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
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

                if (chatService?.isOpen()) {
                    chatService.wsSend({
                        event: EVENT_TYPE.message,
                        data: JSON.stringify(message),
                    });
                }

                setMessages((prevMessages) => [...prevMessages, message]);
            };

            reader.readAsDataURL(file);
        }
    };

    // Handle adding a reaction to a message
    const handleAddReaction = (messageId: number, reactionType: string) => {
        setMessages((messages) =>
            messages.map((msg) => {
                const uid: string | undefined = chatService?.getUserId();

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

    // Handle opening the menu for a message
    const handleOpenMenu = (
        event: MouseEvent<HTMLButtonElement>,
        messageId: number
    ) => {
        setSelectedMessageId(messageId);
        setAnchorEl(event.currentTarget);
    };

    // Handle closing the menu
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    // Handle deleting a message
    const handleDeleteMessage = (messageId: number) => {
        setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg.id !== messageId)
        );
        handleCloseMenu();
    };

    return {
        openUserProfileModal,
        setOpenUserProfileModal,
        isOpenChatsModal,
        setIsOpenChatsModal,
        modalPosition,
        setModalPosition,
        messageText,
        setMessageText,
        messages,
        setMessages,
        selectedMessageId,
        setSelectedMessageId,
        replyingToMessage,
        setReplyingToMessage,
        anchorEl,
        setAnchorEl,
        chatService,
        setChatService,
        handleSendMessage,
        handleFileUpload,
        handleAddReaction,
        handleOpenMenu,
        handleCloseMenu,
        handleDeleteMessage,
    };
};

