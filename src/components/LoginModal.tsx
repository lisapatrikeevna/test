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
import { Box, Typography, IconButton, InputAdornment, Link, styled } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import NeuTextField from './neumorphism/input/NeuTextField';
import NeuButton from './neumorphism/button/NeuButton';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Переопределим стили для MuiDialogContent-root
const CustomDialogContent = styled(Box)(({ theme }) => ({
    padding: '0 !important', // Удаляем padding
    boxShadow: 'none !important', // Убираем тени
    border: 'none !important', // Убираем бордеры
    backgroundColor: theme.palette.background.default, // Цвет фона
}));

const CustomCardComponent = styled(Box)(({ theme }) => ({
    boxShadow: 'none', // Убираем тени
    border: 'none', // Убираем бордеры
    backgroundColor: theme.palette.background.default,
}));

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
            <CustomDialogContent>
                <CustomCardComponent sx={{ height: isRegistering ? '667px' : '600px', width: "100%" }}>
                    <Box sx={{ padding: '25px' }}>
                        <Typography variant="h2">{isRegistering ? 'Register' : 'Login'}</Typography>
                        <form onSubmit={handleSubmit} autoComplete='off'>
                            {isRegistering && (
                                <NeuTextField
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Email"
                                    margin="normal"
                                    rounded
                                    outlined
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
                                    <Typography variant="body2" sx={{ margin: "10px 0" }}>
                                        By signing up, you agree to our <Link href="#" onClick={() => setIsUserTermsModalOpen(true)}>User Terms</Link>.
                                    </Typography>
                                </>
                            )}
                            <NeuButton
                                rounded
                                type="submit"
                                color="primary"
                                sx={{ width: '385px', height: bttnHeight, margin: "10px 0", color: 'var(--text)', backgroundColor: 'var(--body)' }}
                            >
                                {isRegistering ? 'Sign up' : 'Sign in'}
                            </NeuButton>
                            <Box>
                                <NeuButton onClick={() => setIsRegistering(!isRegistering)} sx={{ margin: "10px", color: 'var(--text)' }}>
                                    {isRegistering ? 'Sign in' : 'Sign up'}
                                </NeuButton>
                            </Box>
                        </form>
                    </Box>
                </CustomCardComponent>
            </CustomDialogContent>
            <Modal isOpen={isUserTermsModalOpen} onClose={() => {
                setIsUserTermsModalOpen(false);
                setIsUserTermsAccepted(true);
            }} width="40vw" height="70vh" showCloseButton={false}>
                <UserTerms onClose={() => {
                    setIsUserTermsModalOpen(false);
                    setIsUserTermsAccepted(true);
                }} />
            </Modal>
        </Modal>
    );
};

export default LoginModal;
