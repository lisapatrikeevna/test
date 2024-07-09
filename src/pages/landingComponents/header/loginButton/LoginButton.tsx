import styles from './styles';
import {Button} from "@mui/material";

const LoginButton = ({ setIsLoginModalOpen }: { setIsLoginModalOpen: (open: boolean) => void }) => (
    <Button
        size='large'
        sx={styles.loginButton}
        onClick={() => setIsLoginModalOpen(true)}
    >
        Login
    </Button>
);

export default LoginButton;
