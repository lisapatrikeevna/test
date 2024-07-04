import { Link, Stack, Typography } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CloseIcon from '@mui/icons-material/Close';

type HeaderModalProps = {
  onClose: () => void;
  none?: boolean;
  setIsOpenSettingsModal?: (arg: boolean) => void;
};

const HeaderModal = ({
  onClose,
  none,
}:
HeaderModalProps) => {
  return (
    <Stack
      direction="row"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}
    >
      <Typography
        variant="h4"
        id="modal-modal-title"
        sx={{
          color: 'black',
          fontSize: {
            xs: '1.5rem',
            sm: '1.5rem',
            md: '1.5rem',
            lg: '1.75rem',
          },
        }}
      >
        Information
      </Typography>

      <Stack direction="row" spacing={1}>
        {none ? (
          <>
            <select name="" id="">
              <option value="">En</option>
              <option value="">De</option>
            </select>
          </>
        ) : (
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
                color: 'grey',
              },
            }}
          >
            <LocalPhoneIcon />
          </Link>
        )}

        <CloseIcon onClick={onClose} sx={{ cursor: 'pointer' }} />
      </Stack>
    </Stack>
  );
};
export default HeaderModal;
