import { Link, Stack, Typography } from '@mui/material';
import { hashTagsData } from './utils';

const HashTagsBlock = () => {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {hashTagsData.length > 0 ? (
        hashTagsData
          .slice(0, 10)
          .map((elem) => (
            <Link
              key={elem.id}
              sx={{ cursor: 'pointer' }}
            >{`#${elem.title} `}</Link>
          ))
      ) : (
        <Typography sx={{ color: 'gray' }}>No Tags Available</Typography>
      )}
    </Stack>
  );
};
export default HashTagsBlock;
