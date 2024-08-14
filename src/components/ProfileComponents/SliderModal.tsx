import {Avatar, Box, Modal, Stack} from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import {useEffect, useState} from "react";
import {getUserAvatar} from "../getUserAvatar.tsx";

type Props = {
  isOpenPhotoModal: boolean;
  handleClickOutside: () => void;
  handleClickInside: (e: React.MouseEvent) => void;
  userId: string;
};

const SliderModal = ({
  isOpenPhotoModal,
  handleClickOutside,
  handleClickInside,
    userId
}: Props) => {
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  //#region settings for slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  };
  //#endregion settings for slider

  //#region useEffect for fetching user avatar
  useEffect(() => {
    const fetchAvatar = async () => {
      if (userId) {
        const userAvatar = await getUserAvatar(userId);
        if (typeof userAvatar === 'string') {
          setUserAvatar(userAvatar);
        }
      }
    };

    fetchAvatar();
  }, [userId]);
  //#endregion useEffect for fetching user avatar

  return (
    <Stack>
      <Modal
        open={isOpenPhotoModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClick={handleClickOutside}
      >
        <Box
          sx={{
            width: {
              xs: '90%',
              sm: '90%',
              md: '60%',
              lg: '40%',
            },
            aspectRatio: 1,
            margin: '0 auto',
            padding: '20px',
          }}
          onClick={handleClickInside}
        >
          <Slider {...settings}>
            <Avatar src={userAvatar || ''}/>
          </Slider>
        </Box>
      </Modal>
    </Stack>
  );
};
export default SliderModal;
