import styles from "./styles.ts";
import Grid from "@mui/material/Grid";
import {Container, Typography} from "@mui/material";
import {DarkButton} from "../../components/DarkButton/DarkButton.tsx";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

export const GeneralInfo = () => {
    return <Container maxWidth={false}>
        <Grid container spacing={2} sx={styles.container}>
            <Grid item xs={12} md={6} sx={styles.descriptionSection}>
                <Typography component='div' fontFamily={'Space Grotesk'} marginBottom='12px' variant='h2' fontWeight={500}>One platform to cover all your needs (and more)</Typography>
                <Typography component='div' marginBottom='12px' variant='body2'>Learn, connect and grow with us - unlock your potential with NeoXonline!</Typography>
                <DarkButton>Get started&nbsp;&nbsp;<ArrowOutwardIcon fontSize='small'/></DarkButton>
            </Grid>
            <Grid item xs={12} md={6} sx={styles.videoSection}>
                <iframe
                    src="https://www.youtube.com/embed/SMAlg2DKCbU?si=esX7eF6Hqj8mNRlu"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            </Grid>
        </Grid>
    </Container>
}