import React, { useState } from "react";
import { CardMedia, Grid, Pagination, Typography, useMediaQuery, useTheme } from '@mui/material';
import Fon1 from '../../assets/Fon.jpg';
import Fon2 from '../../assets/Fon2.jpg';
import Fon3 from '../../assets/Fon3.jpg';
import Fon4 from '../../assets/Fon4.jpg';
import Fon5 from '../../assets/Fon5.jpg';
import Fon6 from '../../assets/Fon.jpg';
import { text, title } from '../../configs/ProjectConfig';
import {Box} from "@mui/system";
import {SECTION_PADDING_TOP_PX} from "./V2/constants.ts";

const Project = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [page, setPage] = useState(1);

    const splitText: string[][] = text.map(str => str.split('|').map(subStr => subStr.trim()));
    const images = [Fon1, Fon2, Fon3, Fon4, Fon5, Fon6];

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Box
            id="Project"
            sx={{
                height: '80vh',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Grid
                container
                columnSpacing={10}
                rowSpacing={1}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: page % 2 === 0 ? 'row-reverse' : 'row'
                }}
            >
                <Grid item xs={12} md={6} sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center' }}>
                    <CardMedia
                        component="img"
                        image={images[page - 1]}
                        alt={`Image ${page}`}
                        sx={{ maxWidth: '30vw', maxHeight: '30vw' }}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                        <Typography variant={isSmallScreen ? 'h4' : 'h3'} sx={{ marginBottom: '10px' }}>
                            {title[page - 1]}
                        </Typography>
                        {splitText[page - 1].map((str, index) => (
                            <Typography key={index} variant="h6" paragraph>
                                {str}
                            </Typography>
                        ))}
                </Grid>
            </Grid>

            <Pagination
                count={title.length}
                color="primary"
                page={page}
                onChange={handleChange}
                style={{ marginTop: "16px", display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            />
        </Box>
    );
};

export default Project;
