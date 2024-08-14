import React from 'react';
import { Box, BoxProps, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Shadows } from '../../../types/types';

// Define custom properties for the NeuCardMedia component, extending BoxProps from MUI
interface NeuCardMediaProps extends BoxProps {
  dark?: boolean; // If true, applies dark mode styles
  rounded?: boolean; // If true, makes the media area rounded
  src?: string; // Source URL for the media
  title?: string; // Title text to display
  height?: number; // Height of the media area
}

// Function to get custom media styles based on the theme and props
const getMediaStyles = (theme: Theme, props: NeuCardMediaProps) => {
  const typedTheme = theme as Theme & { shadows: Shadows };
  return {
    backgroundColor: typedTheme.palette.background.paper,
    color: typedTheme.palette.text.primary,
    borderRadius: props.rounded ? '24px' : '0px',
    backgroundImage: `url(${props.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: `${props.height}px`,
  };
};

// Styled Box component with custom styles applied
const StyledCardMedia = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'dark' &&
    prop !== 'rounded' &&
    prop !== 'src' &&
    prop !== 'title' &&
    prop !== 'height',
})<NeuCardMediaProps>(({ theme, ...props }) => ({
  ...getMediaStyles(theme as Theme, props),
  padding: '16px',
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  backgroundColor: theme.palette.background.paper,
  color: 'var(--text-color)',
  borderRadius: props.rounded ? '24px' : '0px', // Set border radius based on rounded prop
}));

// Custom NeuCardMedia component
const NeuCardMedia: React.FC<NeuCardMediaProps> = (props) => {
  const { title, ...rest } = props;

  return (
    <StyledCardMedia {...rest}>
      {title && (
        <Box sx={{ position: 'absolute', bottom: '0px', color: 'inherit' }}>
          <Typography variant="h6">{title}</Typography> // Display title if provided
        </Box>
      )}
    </StyledCardMedia>
  );
};

export default NeuCardMedia;
