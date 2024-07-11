import Box from "@mui/material/Box";
import {ToolCard} from "./ToolCard/ToolCard.tsx";
import {TOOL_ITEMS} from "./constants.tsx";
import styles from "./styles.ts";
import {Container, Grid} from "@mui/material";
import {PricingCard} from "../Pricing/PricingCard/PricingCard.tsx";
import React from "react";
import {ToolCardSize} from "./types.ts";

export const Tools = () => {
    return <Container maxWidth={false} sx={{justifyContent:"center"}}>
        <Grid container spacing={2} alignItems="stretch" justifyContent='center' marginY='2vh'>
            {TOOL_ITEMS.map((item) => (
                item.size === ToolCardSize.Small ? (
                    <Grid item xs={12} sm={6} md={3} key={item.text}>
                        <ToolCard text={item.text} icon={item.icon}/>
                    </Grid>
                ) : (
                    <Grid item xs={12} sm={6} md={6} key={item.text}>
                        <ToolCard text={item.text} icon={item.icon}/>
                    </Grid>
                )
            ))}
</Grid>
    </Container>
}