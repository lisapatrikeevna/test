import React, { useState } from "react";
import Modal from "../../components/Modal.tsx";
import { Box, Button, FormControlLabel, TextField, Typography } from "@mui/material";
import { Checkbox } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface ModalPreRegisterProps {
    isOpen: boolean;
    onClose: () => void;
}

const ModalPreRegister: React.FC<ModalPreRegisterProps> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const theme = useTheme();
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);

    const validateEmail = (value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };

    const validateUsername = (value: string) => {
        const usernameRegex = /^[a-zA-Z]{3,16}$/;
        if (!usernameRegex.test(value)) {
            setUsernameError('Username must be 3-16 characters long, no spaces, only letters');
        } else {
            setUsernameError('');
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);
        validateUsername(value);
    };

    const handleSubmit = () => {

            onClose();

    };

    const isFormValid = () => {
        return email && username && isTermsAccepted && isAgeConfirmed;
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} width="600px">
            <Box sx={{ height: '600px', width: "100%", display: 'flex', flexDirection:'column', marginTop: theme.spacing(2) }}>
                <Box sx={{height: '20%',display: 'flex', justifyContent: 'center', alignItems:'center'}}>
                    <Typography variant='h3' align="center">PRE-REGISTER FOR BETATEST ACCESS</Typography>
                </Box>
                <Box sx={{height: '40%',display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
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
                            value={username}
                            onChange={handleUsernameChange}
                            label="Username"
                            margin="normal"
                            sx={{ width: '100%' }}
                            error={!!usernameError}
                            helperText={usernameError}
                        />
                    </Box>
                </Box>
                <Box sx={{height: '20%', display: 'flex', flexDirection: 'column', marginTop: theme.spacing(2)}}>
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
                                checked={isTermsAccepted}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsTermsAccepted(e.target.checked)}
                                color="primary"
                                id="terms"
                                name="terms"
                            />
                        }
                        label={<Box sx={{ marginLeft: 2 }}>I agree to receive NeoXonline emails
                            (e.g. betatest invite, NeoXonline news)</Box>}
                    />
                </Box>
                <Box sx={{height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <Button
                        sx={{ m: 1, width: '120px', height: '40px', borderRadius: '50%'}}
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
