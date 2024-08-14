import {MENU_ITEMS} from "./constants.ts";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import {Typography} from "@mui/material";
import styles from './styles.ts'

export const MenuItems = () => {
    return <Box sx={styles.container}>
        {MENU_ITEMS.map((label) => {
            return <Link key={label} href={`#${label}`} sx={styles.link} color="primary" underline="none">
                <Typography variant='h6' >{label}</Typography>
            </Link>
        } )}
    </Box>
}