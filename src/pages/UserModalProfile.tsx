import { Modal, Box, Stack, Divider } from '@mui/material';
import HeaderModal from '../components/ProfileComponents/HeaderModal';
import AvatarModal from '../components/ProfileComponents/AvatarModal';
import AboutModal from '../components/ProfileComponents/AboutModal';
import InfoModal from '../components/ProfileComponents/InfoModal';
import ButtonsBlockModal from '../components/ProfileComponents/ButtonsBlockModal';
import { useState } from 'react';

type UserModalProfileProps = {
  open: boolean; // Определяет, открыто ли модальное окно
  onClose: () => void; // Функция для закрытия модального окна
};

const UserModalProfile = ({ open, onClose }: UserModalProfileProps) => {
  const [name, setName] = useState('Vasya');
  const [lastname, setLastName] = useState('Olegov');

  const handleClose = () => {
    onClose(); // Call the onClose function passed as a prop
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          padding: '15px',
          borderRadius: 3,
          width: {
            xs: '90%',
            sm: '50%',
            md: '40%',
            lg: '30%',
          },
          margin: 'auto',
          mt: 2,
          background: 'white',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <Stack>
          <HeaderModal onClose={handleClose} />
          <AvatarModal name={name} lastname={lastname} none />
        </Stack>
        <Divider sx={{ margin: '15px 0', background: 'black' }} />
        <AboutModal />
        <Divider sx={{ margin: '15px 0', background: 'black' }} />
        <InfoModal />
        <Divider sx={{ margin: '15px 0', background: 'black' }} />
        <ButtonsBlockModal />
      </Box>
    </Modal>
  );
};
export default UserModalProfile;
