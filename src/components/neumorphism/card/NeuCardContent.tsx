import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Shadows } from '../../../types/types';

// Define custom properties for the NeuCardContent component, extending BoxProps from MUI
interface NeuCardContentProps extends BoxProps {
  dark?: boolean; // If true, applies dark mode styles
  rounded?: boolean; // If true, makes the content area rounded
}

// Function to get custom content styles based on the theme and props
const getContentStyles = (theme: Theme, props: NeuCardContentProps) => {
  const typedTheme = theme as Theme & { shadows: Shadows };
  return {
    backgroundColor: typedTheme.palette.background.paper,
    color: typedTheme.palette.text.primary,
    borderRadius: props.rounded ? '24px' : '8px',
  };
};

// Styled Box component with custom styles applied
const StyledCardContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'dark' && prop !== 'rounded',
})<NeuCardContentProps>(({ theme, ...props }) => ({
  ...getContentStyles(theme as Theme, props),
  padding: '16px',
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  backgroundColor: theme.palette.background.paper,
  color: 'var(--text-color)',
  borderRadius: props.rounded ? '24px' : '8px', // Set border radius based on rounded prop
}));

// Custom NeuCardContent component
const NeuCardContent: React.FC<NeuCardContentProps> = (props) => {
  return <StyledCardContent {...props}>{props.children}</StyledCardContent>;
};

export default NeuCardContent;
