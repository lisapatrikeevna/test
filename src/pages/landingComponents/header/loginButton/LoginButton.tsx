import styles from './styles';
import NeuButton from "../../../../components/neumorphism/button/NeuButton.tsx";

const LoginButton = ({ setIsLoginModalOpen }: { setIsLoginModalOpen: (open: boolean) => void }) => (
    <NeuButton
        rounded
        size='large'
        sx={styles.loginButton}
        onClick={() => setIsLoginModalOpen(true)}
    >
        Login
    </NeuButton>
);

export default LoginButton;
