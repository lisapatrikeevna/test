import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Stack, Typography} from "@mui/material";
type ComeBackProps = {
    name:string | null | undefined
    setOpenUserProfileModal: (isOpen: boolean) => void
}
export const ComeBack = ({name, setOpenUserProfileModal}:ComeBackProps) => {
// Handle opening the user profile modal
    const handleUserProfileClick = () => {
        setOpenUserProfileModal(true); // Open userProfile modal
    };

    return (
        <Stack
            sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "10px",
    }}
>
             <ArrowBackIcon cursor="pointer" />
              <Typography
                 sx={{ cursor: "pointer" }}
                 onClick={handleUserProfileClick}
               >
                 {name}
              </Typography>
        </Stack>
    )
}