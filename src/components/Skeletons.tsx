import React from 'react';
import { Grid, Card, CardContent, Skeleton, Box } from "@mui/material";

const Skeletons: React.FC = () => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={2.4} xl={2}>
            <Card sx={{ height: "100%" }}>
                <Skeleton variant="rectangular" width="100%" height={180} />
                <CardContent>
                    <Box sx={{ pt: 0.5 }}>
                        <Skeleton width="60%" />
                        <Skeleton width="40%" />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", pt: 1 }}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Box sx={{ ml: 2, flexGrow: 1 }}>
                            <Skeleton width="100%" />
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default Skeletons;