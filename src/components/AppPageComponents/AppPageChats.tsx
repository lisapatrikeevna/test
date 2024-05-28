import { Avatar, Divider, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { data } from '../../components/ProfileComponents/utils';

const AppPageChats = () => {
  const [users] = useState(data);
  return (
    <Stack
      direction="row"
      sx={{
        border: '2px solid black',
        width: '100%',
        borderRadius: '5px',
      }}
    >
      <Stack
        direction="column"
        spacing={2}
        padding={1}
        borderRight="1px solid black"
        alignItems="center"
      >
        <Avatar
          src={data[0].img}
          alt="avatar"
          sx={{
            width: 50,
            height: 50,
            cursor: 'pointer',
            position: 'relative',
          }}
        />
        {users.map((elem) => (
          <Avatar key={elem.id} src={elem.img} />
        ))}
      </Stack>
      <Divider sx={{ color: 'black' }} />
      <Stack width="100%" padding={1}>
        <Stack sx={{ textAlign: 'right', marginBottom: '7px' }}>
          <Typography>Hi</Typography>
          <Typography>How are you?</Typography>
        </Stack>
        <Stack sx={{ marginBottom: '7px' }}>
          <Typography>Hi</Typography>
          <Typography>How are you?</Typography>
        </Stack>
        <Stack sx={{ textAlign: 'right', marginBottom: '7px' }}>
          <Typography>Hi</Typography>
          <Typography>How are you?</Typography>
        </Stack>
        <Stack sx={{ marginBottom: '7px' }}>
          <Typography>Hi</Typography>
          <Typography>How are you?</Typography>
        </Stack>
        <Stack sx={{ textAlign: 'right', marginBottom: '7px' }}>
          <Typography>How are you?</Typography>
        </Stack>
        <Stack>
          <TextField size="small" />
        </Stack>
      </Stack>
    </Stack>
  );
};
export default AppPageChats;
