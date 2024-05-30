import React, { useState, useEffect, memo } from 'react';
import { Box, Container, Typography, Skeleton } from '@mui/material';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
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

  const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
    const index = rowIndex * 4 + columnIndex; // assuming 4 columns
    if (index >= partners.length) return null;
    const partner = partners[index];

    return (
      <div key={index} style={{ ...style, padding: '16px', boxSizing: 'border-box' }}>
        {loading ? (
          <Skeleton variant="rectangular" height={100} sx={{ borderRadius: '25px' }} />
        ) : (
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
        )}
      </div>
    );
  };

  return (
    <Container sx={{ padding: '20px', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 2, pl: 3 }}>Partners</Typography>
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
