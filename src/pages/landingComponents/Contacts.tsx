import React, { useState} from 'react';
import {Typography, Box, FormControl, } from '@mui/material';
import { FeedbackService } from '../../services/feedback.service';
import Captcha from '../../components/Captcha';
import NeuTextField from '../../components/neumorphism/input/NeuTextField';
import NeuButton from '../../components/neumorphism/button/NeuButton';
import NeuTextArea from '../../components/neumorphism/input/NeuTextArea';


const Contacts = () => {
    const [message, setMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userMsg, setUserMsg] = useState('');
    const [captchaPassed, setCaptchaPassed] = useState(false);
    const [resetCaptcha, setResetCaptcha] = useState(false);



    const handleCaptchaResult = (result: boolean) => {
        setCaptchaPassed(result);
        if (result) {
            setMessage('');
        } else {
            setMessage('Error: captcha is not passed');
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!captchaPassed) {
            setMessage('Error: captcha is not passed');
            return;
        }

        try {
            const formattedPhone = userPhone.startsWith('+') ? userPhone.slice(1) : userPhone;
            const responseMessage = await FeedbackService.sendFeedback(userName, userEmail, userMsg, formattedPhone);
            setMessage(responseMessage);
            setUserName('');
            setUserEmail('');
            setUserPhone('');
            setUserMsg('');
            setCaptchaPassed(false);
            setResetCaptcha(true);
        } catch (error) {
            setMessage("Sending error: " + error);
            setResetCaptcha(true);
        }
    };

    return (
        <Box id='Contacts'>
            <Typography variant={'h5'}>
                Dear users, thank you for your support of the project and our team, if you want to donate,
                you can use any convenient way. We are very grateful to you. Also for consideration of
                investment and participation in the project, you can get in touch with us at any convenient
                contact for you. Thank you.
            </Typography>

            <Box
                id="Contacts"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'start',
                    flexDirection: 'row'
                }}>

                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>Send us a message</Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>If you have any questions, fill out the form below</Typography>
                    <Box sx={{ width: '100%', maxWidth: 400 }}>
                        <FormControl component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                            <NeuTextField
                                label="Your name"
                                placeholder="Letters here"
                                value={userName}
                                outlined
                                onChange={(e) => setUserName(e.target.value)}
                                fullWidth
                                margin="normal"
                                rounded
                                required
                                inputProps={{ maxLength: 20 }}
                                InputProps={{
                                    style: { color: 'var(--text)' }
                                }}
                                InputLabelProps={{
                                    style: { color: 'var(--text)' }
                                }}
                            />
                            <NeuTextField
                                label="Enter email"
                                placeholder="xxxx@xxxxx.xx"
                                outlined
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                fullWidth
                                margin="normal"
                                rounded
                                required
                                type="email"
                                InputProps={{
                                    style: { color: 'var(--text)' }
                                }}
                                InputLabelProps={{
                                    style: { color: 'var(--text)' }
                                }}
                            />
                            <NeuTextField
                                label="Enter your phone number"
                                placeholder="+49-XXX-XXXXXXXX"
                                outlined
                                value={userPhone}
                                onChange={(e) => setUserPhone(e.target.value)}
                                fullWidth
                                margin="normal"
                                rounded
                                InputProps={{
                                    style: { color: 'var(--text)' }
                                }}
                                InputLabelProps={{
                                    style: { color: 'var(--text)' }
                                }}
                            />
                            <NeuTextArea
                                label="Message"
                                placeholder="Tell us"
                                outlined
                                value={userMsg}
                                onChange={(e) => setUserMsg(e.target.value)}
                                fullWidth
                                multiline
                                rounded
                                required
                                inputProps={{ minLength: 5, maxLength: 500 }}
                                height={100}
                                rows={4}
                                margin="normal"
                                InputProps={{
                                    style: { color: 'var(--text)' }
                                }}
                                InputLabelProps={{
                                    style: { color: 'var(--text)' }
                                }}
                            />
                            <Captcha onResult={handleCaptchaResult} reset={resetCaptcha} />
                            <Box sx={{ mt: 2, textAlign: 'center' }}>
                                <NeuButton
                                    sx={{ width: '150px', height: '50px', margin: "10px 0" }}
                                    rounded
                                    size='large'
                                    type="submit"
                                    disabled={!captchaPassed}
                                >
                                    Send
                                </NeuButton>
                            </Box>
                        </FormControl>
                    </Box>
                    {message && <Typography variant="body1" sx={{ color: 'red', mt: 2 }}>{message}</Typography>}
                </Box>
            </Box>
        </Box>
    );
}

export default Contacts;