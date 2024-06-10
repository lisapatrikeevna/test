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
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '115%',
        height: '100%',
        padding: {
          xs: '20px 15px',
          sm: '20px 15px',
          lg: '1vh 2vw',
            xl: '15px 0px 15px',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          marginRight: '2rem',
        }}
      >
        <Typography
          variant="h4"
          sx={textStyle}
        >
          Your
          communication deserves the best – it deserves to be on NeoXonline!
          Connect and learn with us!
        </Typography>
      </Box>
        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
            padding: {
                xs: '20px 15px',
                sm: '20px 15px',
                lg: '1vh 2vw',
                xl: '15px 0px 15px',
                justifyContent: 'space-between',
            },}}>
            <Typography variant='h2' sx={{textStyle}}>
            Beta Version, updates planned for 2024
        </Typography>
      <Box
        sx={{
            display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
            width: { xs: '100%',
                sm: '60%',
                md: '550px',
                lg: '700px',
                xl: '830px'},
          height: {
            xs: '200px',
            sm: '300px',
            md: '300px',
            lg: '350px',
            xl: '430px'
          },

            marginTop: '1vw', marginRight: '1vw'
        }}
      >

        <iframe
          src="https://www.youtube.com/embed/SMAlg2DKCbU?si=esX7eF6Hqj8mNRlu"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          style={{ width: '100%', height: '100%', borderRadius: '10px' }}
        ></iframe>
      </Box>
    </Box>
    </Box>
  );
};

export default Home;
