import { FC } from "react";
import { Typography, Box } from "@mui/material";

const Impressum: FC = () => {
    return (
        <Box className="scrollContainer" sx={{ height: "100%" }}>
            <Box display="flex" justifyContent="center" alignItems="center" height="100%" flexDirection="column">
                <div>
                    <Typography variant="h2" sx={{ marginBottom: "1rem", fontSize: "2rem" }}><strong>Roman&nbsp;Snimshchikov</strong></Typography>
                    <Box sx={{ marginBottom: "2rem", color: "var(--text)", justifyContent:"center", alignItems:"center"  }}>
                        <Typography variant="body1" sx={{ marginBottom: "1rem" }}>Am Meisenberg 14, 51491 Overath</Typography>
                        <Typography variant="body1" sx={{ marginBottom: "1rem" }}>Tel:&nbsp;+491623067782</Typography>
                        <Typography variant="body1" sx={{ marginBottom: "1rem" }}>web: neoxonline.com</Typography>
                        <Typography variant="body1" sx={{ marginBottom: "1rem" }}>E-mail:&nbsp;info@neoxonline.com</Typography>
                        <Typography variant="body1" sx={{ marginBottom: "1rem" }}>St.Nr&nbsp;<span>204/5344/4952</span></Typography>
                        <Typography variant="body1" sx={{ marginBottom: "1rem" }}>Bankverbindung:</Typography>
                        <Typography variant="body1" sx={{ marginBottom: "1rem" }}>KREISSPARKASSE KOLN</Typography>
                        <Typography variant="body1" sx={{ marginBottom: "1rem" }}>BIC: COKSDE33XXX</Typography>
                        <Typography variant="body1" sx={{ marginBottom: "1rem" }}>IBAN: DE46370502991329072051</Typography>
                        <Typography variant="body1" sx={{ marginBottom: "1rem" }}>POSTBANK</Typography>
                        <Typography variant="body1" sx={{ marginBottom: "1rem" }}>BIC: PBNKDEFF</Typography>
                        <Typography variant="body1" sx={{ marginBottom: "1rem" }}><span>IBAN: DE25100100100754785135</span></Typography>
                    </Box>
                </div>
            </Box>
        </Box>
    );
};

export default Impressum;
