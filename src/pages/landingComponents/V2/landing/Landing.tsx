import Box from "@mui/material/Box";
import styles from './styles.ts'
import {Header} from "../header/Header.tsx";
import {About} from "../about/About.tsx";

export const Landing = () => {
    return <Box sx={styles.container} id={'Home'}>
        <Header/>
        <About/>
    </Box>
}