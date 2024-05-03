import { Stack, TextField, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import HashTagsBlock from './HashTagsBlock';

interface Tag {
  id: string;
  title: string;
}

interface DescriptionBlockModalProps {
  myNickName: string;
  myStatus: string;
  arrTags: Array<Tag>;
}

const DescriptionBlockModal = ({
  myStatus,
  myNickName,
  arrTags,
}: DescriptionBlockModalProps) => {
  return (
    <Stack sx={{ display: 'flex', gap: '10px' }}>
      <Stack
        direction="row"
        sx={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <InfoIcon />
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h6" sx={{ lineHeight: 1 }}>
            {myNickName}
          </Typography>
          <Typography maxWidth={20}>{myStatus}</Typography>
        </Stack>
      </Stack>
      <TextField
        id="outlined-multiline-static"
        label="About me"
        multiline
        maxRows={6}
        inputProps={{ maxLength: 255 }}
      />
      <Typography sx={{ top: '125px', fontSize: '12px ' }}>*max 255</Typography>
      <HashTagsBlock arrTags={arrTags} />
    </Stack>
  );
};
export default DescriptionBlockModal;
