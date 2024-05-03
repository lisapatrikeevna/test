import { Button, Stack } from '@mui/material';
import { useState } from 'react';

const ButtonsBlockModal = () => {
  const [addDeleteContact, setAddDeleteContact] = useState(false);
  const [blockieren, setBlockieren] = useState(false);
  return (
    <Stack spacing={1}>
      <Button variant="contained" color="success" size="small">
        Send message
      </Button>
      {!addDeleteContact && (
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() => setAddDeleteContact(true)}
        >
          Add Contact
        </Button>
      )}
      {addDeleteContact && (
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={() => setAddDeleteContact(false)}
        >
          Delete Contact
        </Button>
      )}
      {!blockieren && (
        <Button
          size="small"
          variant="contained"
          color="warning"
          onClick={() => setBlockieren(true)}
        >
          Block User
        </Button>
      )}
      {blockieren && (
        <Button
          size="small"
          variant="contained"
          color="success"
          onClick={() => setBlockieren(false)}
        >
          Unblock User
        </Button>
      )}
    </Stack>
  );
};
export default ButtonsBlockModal;
