import React, { useState} from 'react';
import {Typography, Box, Grid, FormControl, IconButton, Card, CardHeader, CardContent, useTheme} from '@mui/material';
import { FeedbackService } from '../../services/feedback.service';
import Captcha from '../../components/Captcha';
import NeuTextField from '../../components/neumorphism/input/NeuTextField';
import NeuButton from '../../components/neumorphism/button/NeuButton';
import NeuTextArea from '../../components/neumorphism/input/NeuTextArea';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import SparkasseLogo from '../../assets/donate/Sparkasse.png';
import PostBankLogo from '../../assets/donate/Postbank-Logo.svg';
import MasterCardLogo from '../../assets/donate/MasterCard_Logo.svg';
import MaestroLogo from '../../assets/donate/Maestro_Logo.svg';
import VisaLogo from '../../assets/donate/Visa_Inc._logo.svg';
import RevolutLogo from '../../assets/donate/revolute-logo.png';
import PaypalLogo from '../../assets/donate/Paypal_logo.svg';
import BinanceLogo from '../../assets/donate/Binance_logo.svg';

const cardsData = [
    {
        title: "Sparkasse",
        titleImage: SparkasseLogo,
        cardType: "Mastercard",
        cardTypeImage: MasterCardLogo,
        bic: "BIC: COKSDE33XXX",
        iban: "IBAN: DE46370502991329072051"
    },
    {
        title: "PostBank",
        titleImage: PostBankLogo,
        cardType: "Maestro",
        cardTypeImage: MaestroLogo,
        bic: "BIC: PBNKDEFF",
        iban: "IBAN: DE25100100100754785135"
    },
    {
        title: "Revolut",
        titleImage: RevolutLogo,
        cardType: "Visa",
        cardTypeImage: VisaLogo,
        bic: "BIC: REVOLT21",
        iban: "IBAN: LT843250050964665543"
    },
    {
        title: "Paypal / Paypal",
        titleImage: PaypalLogo,
        cardTypeImage: BinanceLogo,
        email: "incomgrp@outlook.com"
    },
];

const Contacts = () => {
    const [message, setMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userMsg, setUserMsg] = useState('');
    const [captchaPassed, setCaptchaPassed] = useState(false);
    const [resetCaptcha, setResetCaptcha] = useState(false);
    const theme = useTheme();

    const copyToClipboard = (text: string) => {
        const colonIndex = text.indexOf(': ');

        if (colonIndex !== -1 && colonIndex !== text.length - 1) {
            const textToCopy = text.substring(colonIndex + 1);
            navigator.clipboard.writeText(textToCopy);
        } else {
            navigator.clipboard.writeText(text);
        }
    };

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
        <>
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

                <Grid container spacing={2}>
                    {cardsData.map((card, index) => (
                        <Grid item key={index} xs={6} md={6}>
                            <Card
                                sx={{
                                    padding: "0",
                                    margin: "16px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: 'start',
                                }}
                            >
                                <CardHeader
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', height: '30px' }}>
                                            {card.titleImage ? (
                                                <img src={card.titleImage} alt={card.title} style={{ width: 'auto', height: '30px', maxWidth: '100%' }} />
                                            ) : (
                                                <Typography variant="h6" sx={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {card.title}
                                                </Typography>
                                            )}
                                            {card.cardTypeImage && (
                                                <img src={card.cardTypeImage} alt={card.cardType} style={{ width: 'auto', height: '30px', maxWidth: '100%', marginLeft: '10px' }} />
                                            )}
                                        </Box>
                                    }
                                    sx={{ textAlign: 'center', alignItems: 'flex-end', justifyContent: 'center',
                                        backgroundColor: theme.palette.primary.light, width: '100%' }}
                                />
                                <CardContent sx={{ justifyContent: 'start', alignItems: 'start', flexDirection: 'column', display: 'flex' }}>
                                    {card.bic && (
                                        <Box sx={{ display: 'flex',  flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{ flexGrow: 1}}
                                            >
                                                {card.bic}
                                            </Typography>
                                            <IconButton
                                                sx={{
                                                    fontSize: "inherit",
                                                    padding: 0,
                                                    marginLeft: '10px'
                                                }}
                                                onClick={() => copyToClipboard(card.bic)}
                                            >
                                                <ContentCopyIcon />
                                            </IconButton>
                                        </Box>
                                    )}
                                    {card.iban && (
                                        <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '16px' }}>
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{ flexGrow: 1 }}
                                            >
                                                {card.iban}
                                            </Typography>
                                            <IconButton
                                                sx={{
                                                    fontSize: "inherit",
                                                    padding: 0,
                                                    marginLeft: '10px'
                                                }}
                                                onClick={() => copyToClipboard(card.iban)}
                                            >
                                                <ContentCopyIcon />
                                            </IconButton>
                                        </Box>
                                    )}
                                    {card.email && (
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{ flexGrow: 1}}
                                            >
                                                {card.email}
                                            </Typography>
                                            <IconButton
                                                sx={{
                                                    fontSize: "inherit",
                                                    padding: 0,
                                                    marginLeft: '10px'
                                                }}
                                                onClick={() => copyToClipboard(card.email)}
                                            >
                                                <ContentCopyIcon />
                                            </IconButton>
                                        </Box>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

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
        </>
    );
}

export default Contacts;