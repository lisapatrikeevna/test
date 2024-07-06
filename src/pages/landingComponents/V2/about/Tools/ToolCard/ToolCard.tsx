import styles from "./styles.ts";
import Box from "@mui/material/Box";
import {ReactNode} from "react";
import {CSSObject, Typography} from "@mui/material";
import {styled} from "@mui/system";
import {ToolCardSize} from "../types.ts";

const StyledContainer = styled(Box)<{
    size: ToolCardSize;
}>(styles.container as CSSObject);

export interface ToolCardProps {
    text: string;
    icon: ReactNode,
    size?: ToolCardSize
}

export const ToolCard = ({icon, text, size= ToolCardSize.Small}: ToolCardProps)=> {
    return <StyledContainer size={size}>
        <Box sx={styles.iconContainer}>{icon}</Box>
        <Typography sx={styles.textContainer} component='div' variant='subtitle2'>{text}</Typography>
    </StyledContainer>
}