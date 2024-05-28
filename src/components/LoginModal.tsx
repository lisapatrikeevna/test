import { useState, useContext, FC } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from '../contexts/AuthContext.tsx';
import { login } from '../store/user/userSlice.ts';
import { userSliceMapper } from '../store/user/utilits/userUtilits.ts';
import { AuthService } from '../services/auth.service.ts';
import Modal from "./Modal.tsx";
import UserTerms from "../pages/landingComponents/UserTerms.tsx";
import { useAppDispatch } from '../store/hooks.ts';
import { Box, Typography, IconButton, InputAdornment, Link, FormControl } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import NeuTextField from './neumorphism/input/NeuTextField';
import NeuButton from './neumorphism/button/NeuButton';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isUserTermsModalOpen, setIsUserTermsModalOpen] = useState(false);
    const [isUserTermsAccepted, setIsUserTermsAccepted] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if (isRegistering) {
                if (password !== confirmPassword) {
                    toast.error("Passwords do not match.");
                    return;
                }
                if (!isUserTermsAccepted) {
                    setIsUserTermsModalOpen(true);
                    return;
                }
                const data = await AuthService.registration({ login: username, email, password });
                if (data) {
                    dispatch(login(userSliceMapper(data)));
                    toast.success("Account has been created.");
                    setIsUserTermsModalOpen(false);
                }
            } else {
                const data = await AuthService.login({ username, password });
                if (data) {
                    dispatch(login(userSliceMapper(data)));
                    toast.success("You logged in.");
                    setIsLoggedIn(true);
                    onClose();
                    navigate("/");
                }
            }
            
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.response?.data?.message || "An unexpected error occurred.");
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const bttnHeight = '50px';

    return (
        <Modal isOpen={isOpen} onClose={onClose} width="500px">
            <Box sx={{ height: '600px', width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ padding: '25px', width: '100%' }}>
                    <Typography variant="h2" align="center">{isRegistering ? 'Register' : 'Login'}</Typography>
                    <FormControl component="form" onSubmit={handleSubmit} autoComplete='off' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {isRegistering && (
                            <NeuTextField
                                required
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email"
                                margin="normal"
                                rounded
                                outlined
                                sx={{ width: '100%' }}
                            />
                        )}
                        <NeuTextField
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            label="Username"
                            margin="normal"
                            rounded
                            outlined
                            sx={{ width: '100%' }}
                        />
                        <NeuTextField
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            margin="normal"
                            rounded
                            outlined
                            sx={{ width: '100%' }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={togglePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {isRegistering && (
                            <>
                                <NeuTextField
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    label="Confirm Password"
                                    type={showPassword ? "text" : "password"}
                                    margin="normal"
                                    rounded
                                    outlined
                                    sx={{ width: '100%' }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={togglePasswordVisibility}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Typography variant="body2" sx={{ margin: "10px 0", textAlign: 'center' }}>
                                    By signing up, you agree to our <Link href="#" onClick={() => setIsUserTermsModalOpen(true)}>User Terms</Link>.
                                </Typography>
                            </>
                        )}
                        <NeuButton
                            rounded
                            type="submit"
                            color="primary"
                            sx={{ width: '100%', height: bttnHeight, margin: "10px 0" }}
                        >
                            {isRegistering ? 'Sign up' : 'Sign in'}
                        </NeuButton>
                        <NeuButton onClick={() => setIsRegistering(!isRegistering)} 
                            rounded
                            sx={{ width: '100%', height: bttnHeight, margin: "10px 0" }}>
                            {isRegistering ? 'Sign in' : 'Sign up'}
                        </NeuButton>
                    </FormControl>
                </Box>
            </Box>
            <Modal isOpen={isUserTermsModalOpen} onClose={() => {
                setIsUserTermsModalOpen(false);
                setIsUserTermsAccepted(true);
            }} width="30vw" height="70vh" showCloseButton={false}>
                <UserTerms onClose={() => {
                    setIsUserTermsModalOpen(false);
                    setIsUserTermsAccepted(true);
                }} />
            </Modal>
        </Modal>
    );
};

export default LoginModal;
