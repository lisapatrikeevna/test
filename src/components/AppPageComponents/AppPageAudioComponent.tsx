// AppPageAudioComponent.tsx
import { Box, Typography } from '@mui/material';

// import sing from '../../assets/for-her-chill-upbeat-summel-travel.mp3';

const AppPageAudioComponent = () => {
  return (
    <Box>
      <Typography variant="h6">Audio Player</Typography>
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
