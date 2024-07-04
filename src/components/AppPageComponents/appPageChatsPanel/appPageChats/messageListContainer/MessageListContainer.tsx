import {IconButton, Stack, Typography} from '@mui/material';
import { MessageList} from "react-chat-elements";
import linkifyHtml from "linkify-html";
import ReactionSelector from "../../../../../selectors/ReactionSelector.tsx";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {MouseEvent, useRef, useState} from "react";
import {IMessage} from "../../../../../types/types.ts";
import {UserType} from "../../../chats/types.ts";

type MessageListContainerProps = {
    messages: IMessage[]
    currentUser: UserType | null;
    replyingToMessage: IMessage | null
    setReplyingToMessage:(replyingToMessage: IMessage | null) => void
    selectedMessageId:number | null
    handleAddReaction : (messageId: number, reactionType: string)=>void
    handleOpenMenu:(event: MouseEvent<HTMLButtonElement>,messageId: number)=>void
}

export const MessageListContainer = ({messages, currentUser, replyingToMessage, setReplyingToMessage, selectedMessageId, handleAddReaction, handleOpenMenu}:MessageListContainerProps) => {
    const messageListRef = useRef(null);
    const [showReactionSelector, setShowReactionSelector] = useState(false);

    const handleReplyToMessage = (message: IMessage) => {
        setReplyingToMessage(message);
    };

    // Get a summary of reactions for a message
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


    return (
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
)
}

