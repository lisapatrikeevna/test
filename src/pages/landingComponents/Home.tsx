import { FC } from 'react';
import { Typography, Box } from '@mui/material';

const Home: FC = () => {
  const textStyle = {
    fontSize: 'clamp(1.625rem, 0.542rem + 4.81vw, 4.875rem)',
    fontWeight: 500,
    lineHeight: 'clamp(2rem, 1.208rem + 3.52vw, 4.375rem)',
    letterSpacing: '0em',
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: {
          xs: '20px 15px',
          sm: '20px 15px',
          lg: '1vh 2vw',
        },
      }}
    >
      <Box
        sx={{
          flex: '1 1 50%',
          marginRight: '2rem',
        }}
      >
        <Typography
          variant="h4"
          sx={textStyle}
        >
          Your
        </Typography>
        <Typography
          variant="h4"
          sx={textStyle}
        >
          communication deserves the best – it deserves to be on NeoX!
        </Typography>
        <Typography
          variant="h4"
          sx={textStyle}
        >
          Connect and learn with us!
        </Typography>
      </Box>
      <Box
        sx={{
          flex: '1 1 50%',
          maxWidth: {
            xs: '100%',
            sm: '60%',
            md: '550px',
            lg: '700px',
            xl: '830px'
          },
          height: {
            xs: '200px',
            sm: '300px',
            md: '300px',
            lg: '350px',
            xl: '430px'
          },
          borderRadius: '25px',
          boxShadow: `
            -13px -13px 20px var(--shadow_outer_dark),
            13px 13px 20px var(--shadow_outer_light),
            -8px -8px 20px var(--shadow_outer_dark),
            13px 13px 20px var(--shadow_outer_light),
            inset -9px -9px 17px var(--shadow_inner_dark),
            inset 9px 9px 17px var(--shadow_inner_light)
          `,
          marginTop: '15vw' 
        }}
      >
        <iframe
          src="https://www.youtube.com/embed/SMAlg2DKCbU?si=esX7eF6Hqj8mNRlu"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ width: '100%', height: '100%', borderRadius: '25px' }}
        ></iframe>
      </Box>
    </Box>
  );
};

export default Home;
