import { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Stack,
  Divider,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import HeaderModal from '../components/ProfileComponents/HeaderModal';
import AvatarModal from '../components/ProfileComponents/AvatarModal';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';

type MyModalProps = {
  open: boolean;
  onClose: () => void;
};

const MyModalProfile = ({ open, onClose }: MyModalProps) => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [nickname, setNickname] = useState('');
  const [status, setStatus] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const [tags, setTags] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [page, setPage] = useState('');
  const [socialName, setSocialName] = useState('');
  const [socialAddress, setSocialAddress] = useState('');
  const [showDeleteButton, setShowDeleteButton] = useState(false);

  // Load data from localStorage when modal is opened
  useEffect(() => {
    if (open) {
      const storedData = localStorage.getItem('userObject');
      if (storedData) {
        const userData = JSON.parse(storedData);
        setName(userData.name ?? '');
        setLastname(userData.lastname ?? '');
        setNickname(userData.nickname ?? '');
        setStatus(userData.status ?? '');
        setAboutMe(userData.aboutMe ?? '');
        setTags(userData.tags ?? '');
        setPhone(userData.phone ?? '');
        setEmail(userData.email ?? '');
        setPage(userData.page ?? '');
        setSocialName(userData.socialName ?? '');
        setSocialAddress(userData.socialAddress ?? '');
      }
    }
  }, [open]);
  // Save data to localStorage
  const handleSave = () => {
    const data = {
      name,
      lastname,
      nickname,
      status,
      tags,
      aboutMe,
      phone,
      email,
      page,
      socialName,
      socialAddress,
    };

    localStorage.setItem('userObject', JSON.stringify(data));
  };
  // Close the modal and save data
  const handleClose = () => {
    handleSave(); // Save before closing
    onClose(); // Call the onClose function passed as a prop
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          padding: '15px',
          borderRadius: 3,
          width: {
            xs: '90%',
            sm: '90%',
            md: '80%',
            lg: '70%',
          },
          margin: 'auto',
          mt: 2,
          background: 'white',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <Stack>
          <HeaderModal onClose={handleClose} none />{' '}
          <Stack spacing={3} direction={{ lg: 'row', sm: 'row', xs: 'column' }}>
            <AvatarModal name={name} lastname={lastname} />
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Your lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Stack>
        </Stack>
        <Divider sx={{ margin: '15px 0', background: 'black' }} />
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={2} alignItems="center">
            <InfoIcon />
            <Typography variant="h6" id="modal-title">
              About me
            </Typography>
          </Stack>
          <Stack direction={{ lg: 'row', sm: 'row', xs: 'column' }} spacing={2}>
            <TextField
              id="outlined-basic"
              label="Your nickname"
              variant="outlined"
              fullWidth
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <Button variant="contained" sx={{ width: '200px' }}>
              Check
            </Button>
            <TextField
              id="outlined-basic"
              label="Status"
              variant="outlined"
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </Stack>
          <TextField
            id="outlined-multiline-static"
            label="About me"
            multiline
            maxRows={6}
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            inputProps={{ maxLength: 255 }}
          />
          <Typography sx={{ top: '125px', fontSize: '12px ' }}>
            *max 255
          </Typography>
          <TextField
            id="outlined-required"
            label="Tags"
            fullWidth
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <Typography sx={{ top: '125px', fontSize: '12px ' }}>
            *max 10 tags, put your tags without any marks
          </Typography>
        </Stack>
        <Divider sx={{ margin: '15px 0 15px', background: 'black' }} />
        <Stack>
          <Typography variant="h6" id="modal-modal-title">
            Add your contacts
          </Typography>
          <Stack
            direction={{ lg: 'row', sm: 'row', xs: 'column' }}
            spacing={2}
            mt={2}
          >
            <TextField
              fullWidth
              id="outlined-required"
              label="Your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              fullWidth
              id="outlined-required"
              label="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              id="outlined-required"
              label="Your page"
              value={page}
              onChange={(e) => setPage(e.target.value)}
            />
          </Stack>
        </Stack>
        <Divider sx={{ margin: '15px 0 15px', background: 'black' }} />
        <Stack>
          <Typography variant="h6" id="modal-modal-title">
            Add your socials
          </Typography>
          <Stack
            direction={{ lg: 'row', sm: 'row', xs: 'column' }}
            alignItems="center"
            spacing={2}
            mt={2}
            onMouseEnter={() => setShowDeleteButton(true)}
            onMouseLeave={() => setShowDeleteButton(false)}
          >
            <TextField
              fullWidth
              id="outlined-required"
              label="Add name"
              value={socialName}
              onChange={(e) => setSocialName(e.target.value)}
            />
            <TextField
              fullWidth
              id="outlined-required"
              label="Add URL"
              value={socialAddress}
              onChange={(e) => setSocialAddress(e.target.value)}
            />
            {showDeleteButton && <DeleteIcon cursor="pointer" />}
          </Stack>

          <Typography
            variant="h6"
            id="modal-modal-title"
            mt={1}
            sx={{ cursor: 'pointer' }}
          >
            + Add social
          </Typography>
        </Stack>
      </Box>
    </Modal>
  );
};

export default MyModalProfile;
