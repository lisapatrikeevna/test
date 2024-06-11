import { useState } from 'react';
import { Typography, Box, Grid, FormControl } from '@mui/material';
import { Call, Mail, Map } from '@mui/icons-material';
import { FeedbackService } from '../services/feedback.service';
import Captcha from './Captcha';
import NeuTextField from './neumorphism/input/NeuTextField';
import NeuButton from './neumorphism/button/NeuButton';
import NeuIconButton from './neumorphism/button/NeuIconButton';
import NeuTextArea from './neumorphism/input/NeuTextArea';
import NeuCard from "./neumorphism/card/NeuCard.tsx";

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
        <Box sx={{padding: '0.8vw 0px 0.8vw 0px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {/* First block with address, phone and email */}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', mb: 4, maxWidth: 400,  }}>
                <Grid container spacing={2} sx={{ flexDirection: 'column', width: 500 }}>
                    <Grid item xs={12} md={4} sx={{marginBottom: '1.2vw'}}>
                        <NeuCard sx={{ textAlign: 'center', width: '230px', minHeight: '170px' }}>
                            <NeuIconButton disabled rounded sx={{ minWidth: '40px', padding: '6px' }}>
                                <Map />
                            </NeuIconButton>
                            <Typography variant="h4">Address</Typography>
                            <Typography variant="body1">Am Meisenberg 14, 51491 Overath</Typography>
                        </NeuCard>
                    </Grid>
                    <Grid item xs={12} md={4}  sx={{marginBottom: '1.2vw'}}>
                        <NeuCard sx={{ textAlign: 'center', width: '230px', minHeight: '170px' }}>
                            <NeuIconButton disabled rounded sx={{ minWidth: '40px', padding: '6px' }}>
                                <Call/>
                            </NeuIconButton>
                            <Typography variant="h4">Phone</Typography>
                            <Typography variant="body1">+491623067782</Typography>
                        </NeuCard>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <NeuCard sx={{ textAlign: 'center', width: '230px', minHeight: '170px' }}>
                            <NeuIconButton disabled rounded sx={{ minWidth: '40px', padding: '6px' }}>
                                <Mail />
                            </NeuIconButton>
                            <Typography variant="h4">Email</Typography>
                            <Typography variant="body1">info@neoxonline.com</Typography>
                        </NeuCard>
                    </Grid>
                </Grid>
            </Box>

            {/* Second block with form */}
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
    );
}

export default WriteToUsForm;
