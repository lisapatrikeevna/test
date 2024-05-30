import { useState } from 'react';
import { Typography, Box, Grid, FormControl } from '@mui/material';
import { Call, Mail, Map } from '@mui/icons-material';
import { FeedbackService } from '../services/feedback.service';
import Captcha from './Captcha';
import NeuTextField from './neumorphism/input/NeuTextField';
import NeuButton from './neumorphism/button/NeuButton';
import NeuIconButton from './neumorphism/button/NeuIconButton';
import NeuTextArea from './neumorphism/input/NeuTextArea';

const WriteToUsForm = () => {
    const [message, setMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userMsg, setUserMsg] = useState('');
    const [captchaPassed, setCaptchaPassed] = useState(false);
    const [resetCaptcha, setResetCaptcha] = useState(false);

    const handleCaptchaResult = (result: boolean) => {
        setCaptchaPassed(result);
        if (!result) {
            setMessage('Ошибка: капча не пройдена');
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!captchaPassed) {
            setMessage('Ошибка: капча не пройдена');
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
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {/* First block with address, phone and email */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mb: 4, maxWidth: 400 }}>
                <Grid container spacing={2} sx={{ flexDirection: 'column', width: 500 }}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <NeuIconButton disabled rounded sx={{ minWidth: '40px', padding: '6px' }}>
                                <Map />
                            </NeuIconButton>
                            <Typography variant="h6">Address</Typography>
                            <Typography>Am Meisenberg 14, 51491 Overath</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <NeuIconButton disabled rounded sx={{ minWidth: '40px', padding: '6px' }}>
                                <Call/>
                            </NeuIconButton>
                            <Typography variant="h6">Phone</Typography>
                            <Typography>+491623067782</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <NeuIconButton disabled rounded sx={{ minWidth: '40px', padding: '6px' }}>
                                <Mail />
                            </NeuIconButton>
                            <Typography variant="h6">Email</Typography>
                            <Typography>neox@it-assistent.eu</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {/* Second block with form */}
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Send us a message</Typography>
                <Typography sx={{ mb: 2 }}>If you have any questions, fill out the form below</Typography>
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                    <FormControl component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
                        <NeuTextField
                            label="Your name"
                            placeholder="Letters here"
                            value={userName}
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
    );
}

export default WriteToUsForm;
