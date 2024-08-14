import logo from "../../../../assets/partners/neox-logo.svg";
import {Box, Typography} from "@mui/material";
import styles, {logoImg, mainContainer} from "./styles.ts"

type LogoProps = {
    handleClick: (item: string)=>void
}


export const Logo = ({handleClick}: LogoProps) => {
    return(
        <Box sx={mainContainer }>
            <img draggable="false" src={logo} alt="NeoXonline" style={logoImg} onClick={() => { handleClick("#Home") }} />
            <Box sx={styles.titleContainer}>
                <Typography variant="h4" sx={styles.titleContainer} onClick={() => { handleClick("#Home") }}>
                    NeoX
                </Typography>
                <Typography variant="h6" sx={styles.title } onClick={() => { handleClick("#Home") }}>
                    online
                </Typography>
            </Box>
        </Box>
    )
}