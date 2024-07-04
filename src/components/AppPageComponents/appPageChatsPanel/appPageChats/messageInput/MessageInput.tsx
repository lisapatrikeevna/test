import React, {ChangeEvent, FormEvent, useState} from 'react';
import { Input } from "react-chat-elements";
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import KeyboardVoiceOutlinedIcon from "@mui/icons-material/KeyboardVoiceOutlined";
import SendIcon from "@mui/icons-material/Send";

type MessageInputProps = {
    handleFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSendMessage: (event:FormEvent) => void;
}

export const MessageInput = ({handleFileUpload, handleSendMessage,}:MessageInputProps) => {
    const [messageText, setMessageText] = useState<string>('');
    return (
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
                                display: 'none',
                            }}
                        />
                        <label htmlFor="file-upload">
                            <IconButton color="primary" component="span">
                                {/* AttachFileIcon component */}
                                <AttachFileIcon style={{ color: '#1976d2' }} />
                            </IconButton>
                        </label>
                    </>
                }
                rightButtons={
                    <>
                        <IconButton color="primary">
                            {/* SentimentSatisfiedAltIcon component */}
                            <SentimentSatisfiedAltIcon />
                        </IconButton>
                        <IconButton color="primary">
                            {/* KeyboardVoiceOutlinedIcon component */}
                            <KeyboardVoiceOutlinedIcon />
                        </IconButton>
                        <IconButton
                            color="primary"
                            onClick={handleSendMessage}
                            title="Send"
                        >
                            {/* SendIcon component */}
                            <SendIcon />
                        </IconButton>
                    </>
                }
            />
        </Stack>
    );
};

