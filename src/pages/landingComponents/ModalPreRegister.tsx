import React, { useState } from "react";
import Modal from "../../components/Modal.tsx";
import { Box, Button, FormControlLabel, TextField, Typography } from "@mui/material";
import { Checkbox } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { preRegisterService } from "../../services/userServices/preRegister.service";

interface ModalPreRegisterProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalPreRegister: React.FC<ModalPreRegisterProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const theme = useTheme();
    const [isSendEmailAccepted, setIsSendEmailAccepted] = useState(false);
    const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const validateName = (value: string) => {
        const nameRegex = /^[a-zA-Z]{3,16}$/;
        if (!nameRegex.test(value)) {
            setNameError('Name must be 3-16 characters long, no spaces, only letters');
        } else {
            setNameError('');
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        validateName(value);
    };

    const handleSubmit = async () => {
        validateEmail(email);
        validateName(name);

        if (isFormValid()) {
            const userData = {
                email: email,
                name: name,
                sendEmail: isSendEmailAccepted,
            };

            try {
                await preRegisterService(userData);
                onClose();
            } catch (error) {
                console.error(`Error pre-registering user: ${error}`);
            }
        }
    };

    const isFormValid = () => {
        return email && name && !emailError && !nameError;
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} width="600px">
            <Box sx={{ height: '600px', width: "100%", display: 'flex', flexDirection: 'column', marginTop: theme.spacing(2) }}>
                <Box sx={{ height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant='h3' align="center">PRE-REGISTER FOR BETATEST ACCESS</Typography>
                </Box>
                <Box sx={{ height: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Box>
                        <TextField
                            required
                            value={email}
                            type="email"
                            onChange={handleEmailChange}
                            label="Email"
                            margin="normal"
                            sx={{ width: '100%' }}
                            error={!!emailError}
                            helperText={emailError}
                        />
                    </Box>
                    <Box>
                        <TextField
                            required
                            value={name}
                            onChange={handleNameChange}
                            label="Name"
                            margin="normal"
                            sx={{ width: '100%' }}
                            error={!!nameError}
                            helperText={nameError}
                        />
                    </Box>
                </Box>
                <Box sx={{ height: '20%', display: 'flex', flexDirection: 'column', marginTop: theme.spacing(2) }}>
                    <FormControlLabel
                        sx={{ m: 1 }}
                        control={
                            <Checkbox
                                checked={isAgeConfirmed}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsAgeConfirmed(e.target.checked)}
                                color="primary"
                                id="age"
                                name="age"
                            />
                        }
                        label={<Box sx={{ marginLeft: 2 }}>I am 18 years of age or older</Box>}
                    />
                    <FormControlLabel
                        sx={{ m: 1 }}
                        control={
                            <Checkbox
                                checked={isSendEmailAccepted}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsSendEmailAccepted(e.target.checked)}
                                color="primary"
                                id="terms"
                                name="terms"
                            />
                        }
                        label={<Box sx={{ marginLeft: 2 }}>I agree to receive NeoXonline emails
                            (e.g. betatest invite, NeoXonline news)</Box>}
                    />
                </Box>
                <Box sx={{ height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Button
                        sx={{ m: 1, width: '120px', height: '40px', borderRadius: '50%' }}
                        onClick={handleSubmit}
                        disabled={!isFormValid()}
                    >
                        Sign Me Up
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ModalPreRegister;
