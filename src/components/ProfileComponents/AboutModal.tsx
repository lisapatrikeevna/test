import { Typography, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HashTagsBlock from './HashTagsBlock';

const AboutModal = () => {
  return (
    <Stack sx={{ display: 'flex', gap: '7px' }}>
      <Stack
        direction="row"
        sx={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <InfoIcon />
        <Stack>
          <Typography variant="h6" sx={{ lineHeight: 1 }}>
            Username
          </Typography>
        </Stack>
      </Stack>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam velit
        quisquam, perspiciatis beatae quod magnam animi non optio corporis
        architecto nulla! Delectus quo unde incidunt commodi. Saepe molestiae
        eum pariatur!
      </Typography>
      <HashTagsBlock />
    </Stack>
  );
};
export default AboutModal;
