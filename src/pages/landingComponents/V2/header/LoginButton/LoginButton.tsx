import {useState} from "react";
import LoginModal from "../../../../../components/LoginModal.tsx";
import {Button} from "@mui/material";

export const LoginButton = () => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const handleLoginModalOpen = (isOpen: boolean) => () => {
        setIsLoginModalOpen(()=>isOpen)
    }

    return <>
        <Button variant={'black'} onClick={handleLoginModalOpen(true)}>Login</Button>
        <LoginModal isOpen={isLoginModalOpen} onClose={handleLoginModalOpen(false)} />
    </>
}