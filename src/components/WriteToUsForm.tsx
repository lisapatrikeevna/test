import { useEffect, useRef, useState } from 'react';
import { TextField, Button, Typography, Box, Grid, IconButton } from '@mui/material';
import { Call, Mail, Map } from '@mui/icons-material';
import { FeedbackService } from '../services/feedback.service';
import Captcha from './Captcha';

const WriteToUsForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [message, setMessage] = useState('');
    const userNameInputRef = useRef<HTMLInputElement>(null);
    const userEmailInputRef = useRef<HTMLInputElement>(null);
    const userPhoneInputRef = useRef<HTMLInputElement>(null);
    const userMsgInputRef = useRef<HTMLTextAreaElement>(null);
    const [captchaPassed, setCaptchaPassed] = useState(false);
    const [resetCaptcha, setResetCaptcha] = useState(false);

    const handleCaptchaResult = (result: boolean) => {
        setCaptchaPassed(result);
        if (!result) {
            setMessage('Ошибка: капча не пройдена');
        }
    };

    useEffect(() => {
        const form = formRef.current;
        if (!form) return;

        const button = buttonRef.current;
        if (!button) return;

        const formCheck = async () => {
            if (!captchaPassed) {
                setMessage('Ошибка: капча не пройдена');
                setResetCaptcha(true);
                return;
            }

            const userName = userNameInputRef.current?.value;
            const userEmail = userEmailInputRef.current?.value;
            let userPhone = userPhoneInputRef.current?.value;
            const userMsg = userMsgInputRef.current?.value;

            // Remove the "+" character from the phone number before sending it to the server
            if (userPhone && userPhone.startsWith('+')) {
                userPhone = userPhone.slice(1);
            }

            // Form field validation
            if (!userName || userName.length > 20) {
                setMessage('Error: username cannot be empty and 20 characters or less');
                console.log(userName);
                setResetCaptcha(true);
                return;
            }
            if (!userEmail || !/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(userEmail)) {
                setMessage('Error: Incorrect email format');
                console.log(userEmail);
                setResetCaptcha(true);
                return;
            }
            if (!userMsg || userMsg.length < 5 || userMsg.length > 500) {
                setMessage('Error: the message must be between 5 and 500 characters long');
                console.log(userMsg);
                setResetCaptcha(true);
                return;
            }

            try {
                const message = await FeedbackService.sendFeedback(userName, userEmail, userMsg, userPhone);
                setMessage(message);
                if (form) {
                    form.reset();
                }
            } catch (error) {
                setMessage("Sending error: " + error);
                setResetCaptcha(true);
            }
        };

        button.addEventListener("click", formCheck);

        return () => button.removeEventListener("click", formCheck);
    }, [captchaPassed]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {/* Первый блок с адресом, телефоном и электронной почтой */}
            <Box sx={{ display: 'flex', flexDirection: 'column' , justifyContent: 'center', mb: 4, maxWidth: 400 }}>
                <Grid container spacing={2} sx={{ flexDirection: 'column',width: 800 }}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <IconButton sx={{ color: 'var(--violet)' }}>
                                <Map />
                            </IconButton>
                            <Typography variant="h6">Address</Typography>
                            <Typography>Am Meisenberg 14, 51491 Overath</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <IconButton sx={{ color: 'var(--violet)' }}>
                                <Call />
                            </IconButton>
                            <Typography variant="h6">Phone</Typography>
                            <Typography>+491623067782</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <IconButton sx={{ color: 'var(--violet)' }}>
                                <Mail />
                            </IconButton>
                            <Typography variant="h6">Email</Typography>
                            <Typography>neox@it-assistent.eu</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Второй блок с формой */}
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Send us a message</Typography>
                <Typography sx={{ mb: 2 }}>If you have any questions, fill out the form below</Typography>
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                    <form ref={formRef}>

                    <TextField
                            label="Your name"
                            placeholder="Letters here"
                            inputRef={userNameInputRef}
                            fullWidth
                            margin="normal"
                            InputProps={{
                                style: { color: 'var(--text)' }
                            }}
                            InputLabelProps={{
                                style: { color: 'var(--text)' }
                            }}
                        />
                        <TextField
                            label="Enter email"
                            placeholder="xxxx@xxxxx.xx"
                            inputRef={userEmailInputRef}
                            fullWidth
                            margin="normal"
                            InputProps={{
                                style: { color: 'var(--text)' }
                            }}
                            InputLabelProps={{
                                style: { color: 'var(--text)' }
                            }}
                        />
                        <TextField
                            label="Enter your phone number"
                            placeholder="+49-XXX-XXXXXXXX"
                            inputRef={userPhoneInputRef}
                            fullWidth
                            margin="normal"
                            InputProps={{
                                style: { color: 'var(--text)' }
                            }}
                            InputLabelProps={{
                                style: { color: 'var(--text)' }
                            }}
                        />
                        <TextField
                            label="Message"
                            placeholder="Tell us"
                            inputRef={userMsgInputRef}
                            fullWidth
                            multiline
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
                            <Button sx={{ color: 'var(--text)', backgroundColor: 'var(--body)' }} variant="contained" onClick={() => formRef.current?.dispatchEvent(new Event('submit'))}>
                                Send
                            </Button>
                        </Box>
                    </form>
                </Box>
                {message && <Typography variant="body1" sx={{ color: 'red', mt: 2 }}>{message}</Typography>}
            </Box>
        </Box>
    );
}

export default WriteToUsForm;
