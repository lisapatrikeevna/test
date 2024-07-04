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
import { useForm } from "react-hook-form";
import { emailValidation, nameValidation } from "../utils/validation.ts";
import ValidationError from "../utils/ValidationError/ValidationError.tsx";
import { postRequest } from "../store/sendValidationRequest.ts";


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

    const handleSubmitt = async (event: React.FormEvent) => {
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
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "all",
      });

      const getDataFromInputs = (data:any) => {
        dispatch(postRequest(data))
        console.log(data);
        reset();
      }



    return (
        <Modal isOpen={isOpen} onClose={onClose} width="500px">
            <Box sx={{ height: '600px', width: "100%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ padding: '25px', width: '100%' }}>
                    <Typography variant="h2" align="center">{isRegistering ? 'Register' : 'Login'}</Typography>


                    <form onSubmit={handleSubmit(getDataFromInputs)}/>
                    <FormControl component="form" onSubmit={handleSubmitt} autoComplete='off' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {isRegistering && (
                            <NeuTextField
                            {...register("email", emailValidation)}
                                // required
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
                        <form/>
                   <ValidationError keyName={errors.email} message={errors?.email?.message} />
                   
                        <NeuTextField
                            {...register("name", nameValidation)}
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            label="Username"
                            margin="normal"
                            rounded
                            outlined
                            sx={{ width: '100%' }}
                        />
                 <ValidationError keyName={errors.name} message={errors?.name?.message} />
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
    )
}

export default LoginModal;
