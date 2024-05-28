import React, { useState, useEffect, memo } from 'react';
import { Box, Container, Grid, Typography, Skeleton } from '@mui/material';
import NeuCard from '../../components/neumorphism/card/NeuCard';
import NeuCardContent from '../../components/neumorphism/card/NeuCardContent';
import logo from '../../assets/neox-logo.svg';

const partners = [
  { name: 'NeoX', logo: logo },
  { name: 'NeoX', logo: logo },
  { name: 'NeoX', logo: logo },
  { name: 'NeoX', logo: logo },
  { name: 'NeoX', logo: logo },
  { name: 'NeoX', logo: logo },
  { name: 'NeoX', logo: logo },
  { name: 'NeoX', logo: logo },
  { name: 'NeoX', logo: logo },
  { name: 'NeoX', logo: logo },
  { name: 'NeoX', logo: logo },
  { name: 'NeoX', logo: logo },
];

const Partners: React.FC = memo(() => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container sx={{ overflowY: 'auto', padding: '20px', maxHeight: 'calc(100vh - 200px)' }}>
      <Typography variant="h4" sx={{ mb: 2, pl: 3 }}>Partners</Typography>
      <Grid container spacing={4} justifyContent="center">
        {loading ? (
          Array.from(new Array(partners.length)).map((_, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Skeleton variant="rectangular" height={100} sx={{ borderRadius: '25px' }} />
            </Grid>
          ))
        ) : (
          partners.map((partner, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
              <Box sx={{ boxShadow: 'none', overflow: 'visible' }}>
                <NeuCard elevation={3} rounded>
                  <NeuCardContent>
                    <Box display="flex" alignItems="center" sx={{ backgroundColor: 'transparent' }}>
                      <img loading="lazy" src={partner.logo} alt={`${partner.name} Logo`} style={{ width: 50, height: 50, marginRight: 16 }} />
                      <Typography variant="h6">{partner.name}</Typography>
                    </Box>
                  </NeuCardContent>
                </NeuCard>
              </Box>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
});

export default Partners;
