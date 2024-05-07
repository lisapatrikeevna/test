import { Link, Stack, Typography } from '@mui/material';
import { hashTagsData } from './utils';

interface Tag {
  id: string;
  title: string;
}

interface HashTagsBlockProps {
  arrTags: Tag[];
}

const HashTagsBlock = ({ arrTags }: HashTagsBlockProps) => {
  console.log(arrTags); // затычка
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
