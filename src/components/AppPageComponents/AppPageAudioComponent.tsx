import { Box, Typography } from '@mui/material';

// Component to render an audio player
const AppPageAudioComponent = () => {
  return (
    <Box>
      <Typography variant="h6">Audio Player</Typography>
      {/* Embedding a SoundCloud audio player */}
      <iframe
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/eminemofficial&amp;"
      ></iframe>
    </Box>
  );
};

export default AppPageAudioComponent;
