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
import CardComponent from "./CardComponent.tsx";
import { Typography, TextField, Button } from "@mui/material";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// interface User {
//     password: string;
//     username: string;
//     email: string;
// }

const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isUserTermsModalOpen, setIsUserTermsModalOpen] = useState(false);
    const [isUserTermsAccepted, setIsUserTermsAccepted] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            if(isRegistering) {
                if (!isUserTermsAccepted) {
                    setIsUserTermsModalOpen(true);
                    return;
                }
                const data = await AuthService.registration({ login: username, email, password });
                if (data) {
                    dispatch(login(userSliceMapper(data)));
                    toast.success("Account has been created.");
                    setIsUserTermsModalOpen(true);
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

    const bttnHeight = '50px';

    return (
        <Modal isOpen={isOpen} onClose={onClose} width="500px">
            <CardComponent cardHeight={isRegistering ? '667px' : '600px'} cardWidth="100%">
                <div style={{ padding: '25px' }}>
                    <Typography variant="h2">{isRegistering ? 'Register' : 'Login'}</Typography>
                    <form onSubmit={handleSubmit} autoComplete='off'>
                        {isRegistering && (
                            <TextField
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email"
                                margin="normal"
                                variant="outlined"

                            />
                        )}
                        <TextField
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            label="Username"
                            margin="normal"
                            variant="outlined"

                        />
                        <TextField
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            type="password"
                            margin="normal"
                            variant="outlined"

                        />
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            style={{ width: '385px', height: bttnHeight, margin: "10px 0", color: 'var(--text)', backgroundColor: 'var(--body)' }}
                        >
                            {isRegistering ? 'Sign up' : 'Sign in'}
                        </Button>
                        <div>
                            <Button onClick={() => setIsRegistering(!isRegistering)} style={{ margin: "10px", color: 'var(--text)' }}>
                                {isRegistering ? 'Sign in' : 'Sign up'}
                            </Button>
                            {/*<Button onClick={onClose} style={{ margin: "10px" }}>*/}
                            {/*    Close*/}
                            {/*</Button>*/}
                        </div>
                    </form>
                </div>
            </CardComponent>
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