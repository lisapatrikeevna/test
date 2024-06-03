import React, { useState, useEffect, memo } from 'react';
import { Box, Container, Typography, Skeleton, Link } from '@mui/material';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import NeuCard from '../../components/neumorphism/card/NeuCard';
import NeuCardContent from '../../components/neumorphism/card/NeuCardContent';
import ionosLogo from '../../assets/ionosLogo.jpg';
import aitLogo from '../../assets/aitLogo.svg';
import neoxLogo from '../../assets/neox-logo.svg';

const partners = [
  { logo: ionosLogo, link: 'https://acn.ionos.de/aff_c?offer_id=2&aff_id=7772' },
  { logo: aitLogo, link: 'https://ait.hopp.to/it-assistant' },
  { logo: neoxLogo, link: 'https://neoxonline.com/' },
  { logo: neoxLogo, link: 'https://neoxonline.com/' },
  { logo: neoxLogo, link: 'https://neoxonline.com/' },
  { logo: neoxLogo, link: 'https://neoxonline.com/' },
  { logo: neoxLogo, link: 'https://neoxonline.com/' },
  { logo: neoxLogo, link: 'https://neoxonline.com/' },
  { logo: neoxLogo, link: 'https://neoxonline.com/' },
  { logo: neoxLogo, link: 'https://neoxonline.com/' },
  { logo: neoxLogo, link: 'https://neoxonline.com/' },
  { logo: neoxLogo, link: 'https://neoxonline.com/' },
];

const Partners: React.FC = memo(() => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
    const index = rowIndex * 4 + columnIndex; // assuming 4 columns
    if (index >= partners.length) return null;
    const partner = partners[index];

    return (
      <Box key={index} style={{ ...style, padding: '16px', boxSizing: 'border-box' }}>
        {loading ? (
          <Skeleton variant="rectangular" height={100} sx={{ borderRadius: '25px' }} />
        ) : (
          <Link href={partner.link} target="_blank" rel="noopener noreferrer" underline="none">
            <Box sx={{ boxShadow: 'none', overflow: 'visible' }}>
              <NeuCard elevation={3} rounded sx={{ padding: '10px'}}>
                <NeuCardContent>
                  <Box display="flex" alignItems="center" sx={{ backgroundColor: 'transparent' }}>
                    <Box 
                      sx={{
                        width: 150, 
                        height: 70, 
                        backgroundImage: `url(${partner.logo})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                      }}
                    />
                  </Box>
                </NeuCardContent>
              </NeuCard>
            </Box>
          </Link>
        )}
      </Box>
    );
  };

  return (
    <Container sx={{ padding: '20px', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <Typography variant="h4">Partners</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid
          columnCount={4}
          columnWidth={225}
          height={600}
          rowCount={Math.ceil(partners.length / 4)}
          rowHeight={150}
          width={900}
        >
          {Cell}
        </Grid>
      </Box>
    </Container>
  );
});

export default Partners;
