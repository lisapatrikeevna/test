import {Box, Button, Container, FormControl, TextareaAutosize, TextField, Typography, useTheme} from "@mui/material";
import React, {useState} from "react";
import { FeedbackService } from '../../../../../services/feedback.service';
import MailBoxIcon from '../../../../../assets/landing/mailbox pic.png'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export const ContactForm = () => {
    const [, setMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userMsg, setUserMsg] = useState('');
    const theme = useTheme();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const formattedPhone = userPhone.startsWith('+') ? userPhone.slice(1) : userPhone;
            const responseMessage = await FeedbackService.sendFeedback(userName, userEmail, userMsg, formattedPhone);
            setMessage(responseMessage);
            setUserName('');
            setUserEmail('');
            setUserPhone('');
            setUserMsg('');
        } catch (error) {
            setMessage("Sending error: " + error);
        }
    };

    return (
        <Container maxWidth={false} sx={{justifyContent:"center", alignItems:'center', marginY:'2vh'}}
        >
            <Typography variant="h4" sx={{ mb: 2 }}>Let’s talk!</Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                Questions, proposals, feedback - whatever it is, just fill in the form below and we promise to get back to you soon.
            </Typography>

            <Box display={'flex'} flexDirection={'row'}>

                <Box sx={{display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 10}}>
                    <img src={MailBoxIcon} alt={'mailbox'}></img>
                </Box>

                <FormControl component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                    <TextField
                        label="Name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                        InputProps={{
                            sx: {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderRadius: '15px',
                                    borderColor: '#000',
                                }
                            }
                        }}
                    />
                    <TextField
                        label="Email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                        type="email"
                        InputProps={{
                            sx: {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderRadius: '15px',
                                    borderColor: '#000',
                                }
                            }
                        }}
                    />
                    <TextField
                        label="Phone number (optional)"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant={'outlined'}
                        InputProps={{
                            sx: {
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderRadius: '15px',
                                    borderColor: '#000',
                                }
                            }
                        }}
                    />
                    <TextareaAutosize
                        minRows={4}
                        placeholder="Message"
                        value={userMsg}
                        onChange={(e) => setUserMsg(e.target.value)}
                        style={{
                            width: '100%',
                            maxWidth: '100%',
                            padding: '10px',
                            marginTop: '16px',
                            borderRadius: theme.shape.borderRadius*5,
                            borderColor: '#000',
                            overflowY: 'auto'
                        }}
                        required
                    />

                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                        <Button variant={'black'} size={'small'} disabled={!userName || !userEmail || !userMsg}>
                            Send&nbsp;&nbsp;
                            <ArrowOutwardIcon fontSize={'small'}/>
                        </Button>
                    </Box>
                </FormControl>
            </Box>
            {/*{message && <Typography variant="body1" sx={{ color: 'red', mt: 2 }}>{message}</Typography>}*/}
        </Container>
    );
}