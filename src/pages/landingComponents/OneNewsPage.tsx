import React from 'react';
import {Container, Typography, IconButton, Box, ImageList, ImageListItem} from '@mui/material';
import { KeyboardBackspace } from "@mui/icons-material";
import { news } from '../../configs/newsConfig';

interface OneNewsPageProps {
    id: string;
    onBackClick: () => void; // Adding a callback to handle the click on the "back" button
}

const OneNewsPage: React.FC<OneNewsPageProps> = ({ id, onBackClick }) => {
    const newsItem = news.find((item) => item.id === id);

    if (!newsItem) {
        return <Typography variant="h4">News not found</Typography>;
    }

    const handleBackClick = () => {
        onBackClick(); // When press this button, going back to previous page
    };

    return (
        <Container sx={{display: 'flex', flexDirection: 'column', marginTop: '0.8vw'}}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start'}}>
                <IconButton onClick={handleBackClick}>
                    <KeyboardBackspace/>
                </IconButton>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0.8vw'}}>
                <Box>
                <Typography variant="h4" >{newsItem.title}</Typography>
                </Box>
            </Box>
            <ImageList sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <ImageListItem sx={{ maxHeight: '400px', overflowY: 'hidden', marginTop: '0.8vw'}}>
                    <img
                        src={`${newsItem.image}?w=164&h=164&fit=crop&auto=format`}
                        srcSet={`${newsItem.image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        alt={newsItem.title}
                        loading="lazy"
                        style={{ objectFit: 'cover', height: '100%' }} // Добавляем свойство object-fit и устанавливаем ширину и высоту на 100%
                    />
                </ImageListItem>
            </ImageList>
            <Typography variant="body1" sx={{marginTop: '1.5vw'}}>{newsItem.content}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={handleBackClick}>
                    Return
                </IconButton>
            </Box>
        </Container>
    );
};

export default OneNewsPage;
