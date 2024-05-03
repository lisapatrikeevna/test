import { Link, Stack } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import InstagramIcon from '@mui/icons-material/Instagram';

const InfoModal = () => {
  return (
    <Stack spacing={1}>
      <Stack>
        <Link
          href="tel:+4999999999"
          target="_blank"
          underline="hover"
          color="black"
          sx={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            ':hover': {
              textDecoration: 'none',
              color: 'GrayText',
            },
          }}
        >
          <LocalPhoneIcon />
          Tel: +4999999999999
        </Link>
      </Stack>
      <Stack>
        <Link
          href="mailto:https://google.com"
          target="_blank"
          underline="hover"
          color="black"
          sx={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            ':hover': {
              textDecoration: 'none',
              color: 'GrayText',
            },
          }}
        >
          <EmailIcon />
          testemail@.com
        </Link>
      </Stack>
      <Stack>
        <Link
          href="mailto:https://google.com"
          target="_blank"
          underline="hover"
          color="black"
          sx={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            ':hover': {
              textDecoration: 'none',
              color: 'GrayText',
            },
          }}
        >
          <ContactPageIcon />
          Google
        </Link>
      </Stack>

      <Stack>
        <Link
          href="https://instagram.com"
          target="_blank"
          underline="hover"
          color="black"
          sx={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            ':hover': {
              textDecoration: 'none',
              color: 'GrayText',
            },
          }}
        >
          <InstagramIcon />
          Instagram
        </Link>
      </Stack>
    </Stack>
  );
};
export default InfoModal;
