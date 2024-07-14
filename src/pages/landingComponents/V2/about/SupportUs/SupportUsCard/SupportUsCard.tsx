import React, {ReactElement} from "react";
import {Box, Card, IconButton, Typography, useTheme} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export interface SupportUsCardProps {
    BIC?: string;
    IBAN?: string;
    email?: string;
    icon_1?: ReactElement,
    icon_2?: ReactElement,
}

const copyToClipboard = (text: string) => {
    // Finding ": " in text
    const colonIndex = text.indexOf(': ');

    // If ": " finded and he is not the last in the string
    if (colonIndex !== -1 && colonIndex !== text.length - 1) {
        // Copy substring, begining from symbol after ": "
        const textToCopy = text.substring(colonIndex + 1);
        navigator.clipboard.writeText(textToCopy);
    } else {
        // If symbol ": " not found or he is the last in the string, then copy whole text
        navigator.clipboard.writeText(text);
    }
};

export const SupportUsCard = ({BIC, IBAN, email, icon_1, icon_2}: SupportUsCardProps) => {
    return <Card variant={'outlined'}
                 sx={{ borderRadius: useTheme().shape.borderRadius,
                     padding: useTheme().spacing(3),
                    width:'100%',
                    height:'300px',
                     display:'flex',
                     flexDirection: 'column',
                     justifyContent: 'space-between',
                 }}>
        <Box display={'flex'} flexDirection={'column'} alignItems={'end'} >
            {icon_1}
            {icon_2}
        </Box>
        <Box display={'flex'} flexDirection={'column'} alignItems={'start'} justifyContent={'end'} >
            {BIC?
                    <Typography variant={'body1'}><IconButton
                        sx={{
                            fontSize: "inherit",
                            padding: 0,
                            marginLeft: '10px'
                        }}
                        onClick={() => copyToClipboard(BIC)}
                    >
                        <ContentCopyIcon />
                    </IconButton> BIC: {BIC}</Typography>
                : null}
            {IBAN?
                <Typography variant={'body1'}>
                    <IconButton
                        sx={{
                            fontSize: "inherit",
                            padding: 0,
                            marginLeft: '10px'
                        }}
                        onClick={() => copyToClipboard(IBAN)}
                    >
                        <ContentCopyIcon />
                    </IconButton> IBAN: {IBAN}</Typography>
                : null}
            {email?
                <Typography variant={'body1'}>
                    <IconButton
                        sx={{
                            fontSize: "inherit",
                            padding: 0,
                            marginLeft: '10px'
                        }}
                        onClick={() => copyToClipboard(email)}
                    >
                        <ContentCopyIcon />
                    </IconButton> email: {email}</Typography>
                : null}
        </Box>
    </Card>
}