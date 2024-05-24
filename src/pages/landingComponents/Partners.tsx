import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import NeuCard from '../../components/neumorphism/card/NeuCard';
import NeuCardContent from '../../components/neumorphism/card/NeuCardContent';
import { FixedSizeGrid as Grid } from 'react-window';
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
  { name: 'NeoX', logo: logo },
  { name: 'NeoX', logo: logo },
  { name: 'NeoX', logo: logo },
  { name: 'NeoX', logo: logo },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cellRenderer = ({ columnIndex, rowIndex, style }: any) => {
  const index = rowIndex * 4 + columnIndex;
  if (index >= partners.length) {
    return null;
  }

  const partner = partners[index];

  return (
    <Box style={{ ...style, padding: '20px' }} key={index}>
      <Box sx={{ boxShadow: 'none', overflow: 'visible' }}>
        <NeuCard elevation={3} rounded>
          <NeuCardContent>
            <Box display="flex" alignItems="center" sx={{ backgroundColor: 'transparent' }}>
              <img src={partner.logo} alt={`${partner.name} Logo`} style={{ width: 50, height: 50, marginRight: 16 }} />
              <Typography variant="h6">{partner.name}</Typography>
            </Box>
          </NeuCardContent>
        </NeuCard>
      </Box>
    </Box>
  );
};

const Partners: React.FC = () => {
    return (
        <Container sx={{ overflow: 'hidden', height: 'calc(100vh - 200px)', padding: '20px' }}>
          <Typography variant="h4" sx={{ mb: 2, pl: 3 }}>Partners</Typography>
          <Box sx={{ overflowY: 'auto' }}>
            <Grid
              columnCount={4}
              columnWidth={250}
              height={window.innerHeight - 200} // Adjust height as needed
              rowCount={Math.ceil(partners.length / 4)}
              rowHeight={170} // Adjust height to account for padding
              width={1000} // Adjust width as needed
            >
              {cellRenderer}
            </Grid>
          </Box>
        </Container>
      );
};

export default Partners;
