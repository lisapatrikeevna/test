import Button from "@mui/material/Button";
import styles from "./styles.ts";
import {PropsWithChildren} from "react";

type DarkButtonProps =  PropsWithChildren<{
    onClick?: ()=> void;
}>

export const DarkButton = ({children, ...restProps}: DarkButtonProps) => {
    return <Button variant="outlined" sx={styles.button} {...restProps}>{children}</Button>
}