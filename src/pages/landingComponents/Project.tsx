import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const Project = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box
            sx={{
                padding: '20px',
                maxHeight: '70vh',
                overflowY: 'auto'
            }}
        >
            <Typography variant={isSmallScreen ? 'body1' : 'h6'} gutterBottom>
                About NeoXonline
            </Typography>
            <Typography variant={isSmallScreen ? 'body1' : 'h6'} sx={{ marginBottom: '10px' }}>
                Communication and Learning in One Place
            </Typography>
            <Typography variant="body2" paragraph>
                NeoXonline is a unique platform where communication and learning come together, creating opportunities for personal and professional growth.
            </Typography>
            <Typography variant={isSmallScreen ? 'body1' : 'h6'} sx={{ marginBottom: '10px' }}>
                Communication: The Key to Success
            </Typography>
            <Typography variant="body2" paragraph>
                Communication plays a crucial role in our lives, and its importance cannot be overstated. It allows us to convey information, share ideas, thoughts, and feelings, making the exchange of knowledge and experience possible. Effective communication enhances understanding between people, helps resolve conflicts, and builds trustful relationships. In a work environment, it fosters teamwork, increases productivity, and helps achieve common goals. On a personal level, communication strengthens bonds with loved ones, allowing us to express support and care. The ability to clearly and precisely articulate our thoughts helps avoid misunderstandings and dissatisfaction, making communication the foundation for building strong, productive, and harmonious relationships.
            </Typography>
            <Typography variant={isSmallScreen ? 'body1' : 'h6'} sx={{ marginBottom: '10px', fontSize: isSmallScreen ? '0.8rem' : '1rem' }}>
                Features of NeoXonline
            </Typography>
            <Typography variant="body2" paragraph>
                NeoXonline offers a wide range of features to make your communication and learning convenient and effective:
            </Typography>
            <ul>
                <li><Typography variant="body2">• Messenger: exchange messages, send photos and videos, and share documents.</Typography></li>
                <li><Typography variant="body2">• Conferences: conduct video conferences for group communication and learning.</Typography></li>
                <li><Typography variant="body2">• Course Payments: a payment terminal for paying for courses and materials.</Typography></li>
                <li><Typography variant="body2">• Video: a platform for hosting and viewing educational videos.</Typography></li>
                <li><Typography variant="body2">• Chats and Channels: create group and private chats, and specialized channels for sharing information.</Typography></li>
            </ul>
            <Typography variant={isSmallScreen ? 'body1' : 'h6'} gutterBottom>
                The NeoXonline Community
            </Typography>
            <Typography variant="body2" paragraph>
                NeoXonline is more than just a project for communication and learning. We are becoming a community where every participant can learn, earn, and invest in their future. By developing our application, we increase user engagement and provide them with all the necessary tools for successful interaction.
            </Typography>
            <Typography variant={isSmallScreen ? 'body1' : 'h6'} gutterBottom>
                Opportunities and Benefits
            </Typography>
            <Typography variant="body2" paragraph>
                With NeoXonline you can:
            </Typography>
            <ul>
                <li><Typography variant="body2">Access a convenient messenger and video conference features.</Typography></li>
                <li><Typography variant="body2">Pay for courses and materials through a payment terminal.</Typography></li>
                <li><Typography variant="body2">Watch and share educational videos.</Typography></li>
                <li><Typography variant="body2">Communicate and share experiences with like-minded people through chats and channels.</Typography></li>
                <li><Typography variant="body2">Stay updated with the latest news and achievements of the project.</Typography></li>
            </ul>
            <Typography variant={isSmallScreen ? 'body1' : 'h6'} gutterBottom>
                Join Us
            </Typography>
            <Typography variant="body2" paragraph>
                Join the NeoXonline community and discover the power of communication. Learn and earn, invest in your future. Become part of the dynamic and growing NeoXonline community, which opens up new opportunities for growth and development.
            </Typography>
            <Typography variant="body2" paragraph>
                NeoXonline is your opportunity for personal and professional growth.
            </Typography>
        </Box>
    );
};

export default Project;
