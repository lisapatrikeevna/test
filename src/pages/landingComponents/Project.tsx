import { Box, Typography } from '@mui/material';

const Project = () => {
    return (
        <Box sx={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>About NeoXonline</Typography>
            <Typography variant="h6" sx={{  marginBottom: '10px' }}>Communication and Learning in One Place</Typography>
            <Typography variant="body1" paragraph sx={{ textIndent: '20px' }}>
                NeoXonline is a unique platform where communication and learning come together, creating opportunities for personal and professional growth.
            </Typography>
            <Typography variant="h6" sx={{  marginBottom: '10px' }}>Communication: The Key to Success</Typography>
            <Typography variant="body1" paragraph sx={{ textIndent: '20px' }}>
                Communication plays a crucial role in our lives, and its importance cannot be overstated. It allows us to convey information, share ideas, thoughts, and feelings, making the exchange of knowledge and experience possible. Effective communication enhances understanding between people, helps resolve conflicts, and builds trustful relationships. In a work environment, it fosters teamwork, increases productivity, and helps achieve common goals. On a personal level, communication strengthens bonds with loved ones, allowing us to express support and care. The ability to clearly and precisely articulate our thoughts helps avoid misunderstandings and dissatisfaction, making communication the foundation for building strong, productive, and harmonious relationships.
            </Typography>
            <Typography variant="h6" sx={{  marginBottom: '10px' }}>Features of NeoXonline</Typography>
            <Typography variant="body1" paragraph sx={{ textIndent: '20px' }}>
                NeoXonline offers a wide range of features to make your communication and learning convenient and effective:
            </Typography>
            <ul>
                <li><Typography variant="body1">- Messenger: exchange messages, send photos and videos, and share documents.</Typography></li>
                <li><Typography variant="body1">- Conferences: conduct video conferences for group communication and learning.</Typography></li>
                <li><Typography variant="body1">- Course Payments: a payment terminal for paying for courses and materials.</Typography></li>
                <li><Typography variant="body1">- Video: a platform for hosting and viewing educational videos.</Typography></li>
                <li><Typography variant="body1">- Chats and Channels: create group and private chats, and specialized channels for sharing information.</Typography></li>
            </ul>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>The NeoXonline Community</Typography>
            <Typography variant="body1" paragraph sx={{ textIndent: '20px' }}>
                NeoXonline is more than just a project for communication and learning. We are becoming a community where every participant can learn, earn, and invest in their future. By developing our application, we increase user engagement and provide them with all the necessary tools for successful interaction.
            </Typography>

            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Opportunities and Benefits</Typography>
            <Typography variant="body1" paragraph sx={{ textIndent: '20px' }}>
                With NeoXonline you can:
            </Typography>
            <ul>
                <li><Typography variant="body1">Access a convenient messenger and video conference features.</Typography></li>
                <li><Typography variant="body1">Pay for courses and materials through a payment terminal.</Typography></li>
                <li><Typography variant="body1">Watch and share educational videos.</Typography></li>
                <li><Typography variant="body1">Communicate and share experiences with like-minded people through chats and channels.</Typography></li>
                <li><Typography variant="body1">Stay updated with the latest news and achievements of the project.</Typography></li>
            </ul>

            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>Join Us</Typography>
            <Typography variant="body1" paragraph sx={{ textIndent: '20px' }}>
                Join the NeoXonline community and discover the power of communication. Learn and earn, invest in your future. Become part of the dynamic and growing NeoXonline community, which opens up new opportunities for growth and development.
            </Typography>
            <Typography variant="body1" paragraph sx={{ textIndent: '20px' }}>
                NeoXonline is your opportunity for personal and professional growth.
            </Typography>
        </Box>
    );
};

export default Project;