import {useState} from "react";
import LoginModal from "../../../../../components/LoginModal.tsx";
import {DarkButton} from "../../components/DarkButton/DarkButton.tsx";

export const LoginButton = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleLoginModalOpen = (isOpen: boolean) => () => {
        setIsLoginModalOpen(()=>isOpen)
    }

    return <>
        <DarkButton onClick={handleLoginModalOpen(true)}>Login</DarkButton>
        <LoginModal isOpen={isLoginModalOpen} onClose={handleLoginModalOpen(false)} />
    </>
}