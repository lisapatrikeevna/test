import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

const News: FC = () => {
    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>News</Typography>
            <Typography variant="body1">Here will be news</Typography>
        </Box>
    );
};

export default News;
