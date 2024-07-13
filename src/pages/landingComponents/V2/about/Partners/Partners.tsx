import {Container, Grid, Typography} from "@mui/material";
import {PARTNERS_ITEMS} from "./constants.tsx";
import {PartnersCard} from "./PartnersCard/PartnersCard.tsx";
import React from "react";

export const Partners = () => {
    return <Container maxWidth={false} sx={{justifyContent:"center", alignItems:'center', marginY:'2vh'}}>
        <Typography variant={'h3'} textAlign={'center'} sx={{marginY:'2vh'}}>Partners:</Typography>

        <Grid container spacing={2}>
            {PARTNERS_ITEMS.map((item) => (
                <Grid item md={3} >
                    <PartnersCard partner={item}/>
                </Grid>
            ))}
        </Grid>

    </Container>
}