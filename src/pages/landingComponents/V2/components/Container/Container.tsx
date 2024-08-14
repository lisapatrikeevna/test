import {PropsWithChildren} from "react";
import Box from "@mui/material/Box";
import styles from './styles.ts'
import {SxProps} from "@mui/material/styles";
import {styled} from "@mui/system";
import {CSSObject} from "@mui/material";

const StyledContainer = styled(Box)(styles?.container as CSSObject)

type ContainerProps = PropsWithChildren<{
    sx?: SxProps
    id?: string
}>

export const Container = ({children, sx = {}, id}: ContainerProps)=> {
    return <StyledContainer sx={sx} id={id}>{children}</StyledContainer >
}