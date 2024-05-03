import { FC } from 'react';
import { Typography, Stack } from '@mui/material';
import RotatingWordsNew from '../../components/RotatingWordsNew.tsx';

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
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: 'clamp(2.25rem, 1rem + 5.56vw, 6rem)',
          fontWeight: 800,
          lineHeight: 'clamp(2.5rem, 0.625rem + 8.33vw, 8.125rem)',
          letterSpacing: '0em',
        }}
      >
        <RotatingWordsNew
          words={['Kommunizieren', 'Lernen', 'Tauschen', 'Erhalten']}
          interval={3000}
        />
      </Typography>
      <Typography
        variant="h2"
        sx={{
          fontSize: 'clamp(1.875rem, 0.625rem + 5.56vw, 5.625rem)',
          fontWeight: 700,
          lineHeight: 'clamp(2.5rem, 1.042rem + 6.48vw, 6.875rem)',
          letterSpacing: '0em',
        }}
      >
        Sie{' '}
        <RotatingWordsNew
          words={['', '', 'sich aus', 'Informationen']}
          interval={3000}
        />
      </Typography>
      <Typography
        variant="h3"
        sx={{
          fontSize: 'clamp(1.875rem, 0.75rem + 5vw, 5.25rem)',
          fontWeight: 600,
          lineHeight: 'clamp(2.25rem, 1.125rem + 5vw, 5.625rem)',
          textAlign: 'left',
          letterSpacing: '0em',
        }}
      >
        ohne Limit
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
        alles in einer
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontSize: 'clamp(1.375rem, 0.333rem + 4.63vw, 4.5rem)',
          fontWeight: 400,
          lineHeight: 'clamp(1.25rem, 0.417rem + 3.7vw, 3.75rem)',
          letterSpacing: '0em',
        }}
      >
        einzigen App.
      </Typography>
      <Stack
        sx={{
          position: {
            xs: 'relative',
            sm: 'relative',
            md: 'absolute',
            lg: 'absolute',
          },
          marginTop: '80px',
          right: {
            xs: '0',
            sm: '0',
            lg: '3vw',
          },
          bottom: '12vh',
          width: {
            xs: '100%',
            sm: '80%',
            md: '500px',
            lg: '560px',
          },
          height: {
            xs: '300px',
            sm: '400px',
            md: '280px',
            lg: '315px',
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
      </Stack>
    </Stack>
  );
};

export default Home;
