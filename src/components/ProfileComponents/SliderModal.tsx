import { Box, Modal, Stack } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { data } from './utils';
import Picture from './Picture';
import Slider from 'react-slick';

type Props = {
  isOpenPhotoModal: boolean;
  handleClickOutside: () => void;
  handleClickInside: (e: React.MouseEvent) => void;
};

const SliderModal = ({
  isOpenPhotoModal,
  handleClickOutside,
  handleClickInside,
}: Props) => {
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
            {data.map((elem) => (
              <Picture key={elem.id} {...elem} />
            ))}
          </Slider>
        </Box>
      </Modal>
    </Stack>
  );
};
export default SliderModal;
