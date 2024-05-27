import { FC } from 'react';
import { Typography, Stack, Box } from '@mui/material';

const Home: FC = () => {
  return (
    <Stack
      direction={{ sm: 'column' }}
      sx={{
        width: '100%',
        height: '100%',
        padding: {
          xs: '20px 15px',
          sm: '20px 15px',
          lg: '1vh 2vw',
        },
        justifyContent: 'left',
        position: 'relative',
      }}
    >
      <Box width="50%" sx={{ marginBottom: '2rem' }}>
      <Typography
          variant="h4"
          sx={{
            fontSize: 'clamp(1.625rem, 0.542rem + 4.81vw, 4.875rem)',
            fontWeight: 500,
            lineHeight: 'clamp(2rem, 1.208rem + 3.52vw, 4.375rem)',
            letterSpacing: '0em',
          }}
        >
          Your
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: 'clamp(1.625rem, 0.542rem + 4.81vw, 4.875rem)',
            fontWeight: 500,
            lineHeight: 'clamp(2rem, 1.208rem + 3.52vw, 4.375rem)',
            letterSpacing: '0em',
          }}
        >
          communication deserves the best – it deserves to be on NeoX!
          Connect and learn with us!
        </Typography>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '35vh',
          left: '47vw',
          width: {
            xs: '80%',
            sm: '60%',
            md: '500px',
            lg: '750px',
          },
          height: {
            xs: '200px',
            sm: '300px',
            md: '280px',
            lg: '400px',
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
    </Stack>
  );
};

export default Home;
