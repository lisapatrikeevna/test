import { Typography, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HashTagsBlock from './HashTagsBlock';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

//Info of profile of other Users
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
        <QrCode2Icon cursor="pointer" />
        <ShareIcon cursor="pointer" />
        <ContentCopyIcon cursor="pointer" />
      </Stack>
      <Typography variant="body1" gutterBottom>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam velit
        quisquam, perspiciatis beatae quod magnam animi non optio corporis
        architecto nulla! Delectus quo unde incidunt commodi. Saepe molestiae
        eum pariatur!
      </Typography>
      <HashTagsBlock arrTags={[]} />
    </Stack>
  );
};
export default AboutModal;
