import Box from "@mui/material/Box";
import {Container} from "../components/Container/Container.tsx";
import {MenuItems} from "./MenuItems/MenuItems.tsx";
import styles from './styles.ts'
import {SupportUsButton} from "./SupportUsButton/SupportUsButton.tsx";
import {LoginButton} from "./LoginButton/LoginButton.tsx";

export const Header = () => {
    return <Box sx={styles.mainWrapper}>
        <Container>
            <Box sx={styles.container}>
                <MenuItems/>
                <Box display='flex'>
                    <SupportUsButton/>
                    <LoginButton/>
                </Box>
            </Box>
        </Container>
    </Box>
}