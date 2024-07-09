import styles from "./styles.ts";
import {ReactNode} from "react";
import {Box, Grid, Typography} from "@mui/material";

export interface ProductOfferCardProps {
    icon: ReactNode;
    label: string;
    title_teacher: string;
    description_teacher_1: string;
    description_teacher_2: string;
    title_student: string;
    description_student_1: string;
    description_student_2: string;
}

export const ProductOfferCard = ({icon, title_teacher,
                                     description_teacher_1, description_teacher_2,
                                     title_student, description_student_1,
                                     description_student_2}: ProductOfferCardProps)=> {
    return <Grid container spacing={2}>
        <Grid item xs={8}  sx={styles.container}>
            <Grid container spacing={4} direction={'row'}>
                <Grid item xs={6}>
                    <Typography paragraph={true} sx={styles.typographyText}>{title_teacher}</Typography>
                    <Typography paragraph={true}  sx={styles.typographyText}>{description_teacher_1}</Typography>
                    <Typography paragraph={true}  sx={styles.typographyText}>{description_teacher_2}</Typography>
                </Grid>
                <Grid item  xs={6}>
                    <Typography paragraph={true}  sx={styles.typographyText}>{title_student}</Typography>
                    <Typography paragraph={true}  sx={styles.typographyText}>{description_student_1}</Typography>
                    <Typography paragraph={true}  sx={styles.typographyText}>{description_student_2}</Typography>
                </Grid>
            </Grid>
        </Grid>
        <Grid item xs={4}>
            <Box sx={styles.iconContainer}>{icon}</Box>
        </Grid>
    </Grid>

}