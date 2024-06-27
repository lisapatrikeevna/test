import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Shadows } from '../../../types/types';

// Define custom properties for the NeuCardAction component, extending BoxProps from MUI
interface NeuCardActionProps extends BoxProps {
  dark?: boolean; // If true, applies dark mode styles
  rounded?: boolean; // If true, makes the action area rounded
}

// Function to get custom action styles based on the theme and props
const getActionStyles = (theme: Theme, props: NeuCardActionProps) => {
  const typedTheme = theme as Theme & { shadows: Shadows };
  return {
    backgroundColor: typedTheme.palette.background.default,
    color: typedTheme.palette.text.primary,
    borderRadius: props.rounded ? '24px' : '8px',
  };
};

// Styled Box component with custom styles applied
const StyledCardAction = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'dark' && prop !== 'rounded',
})<NeuCardActionProps>(({ theme, ...props }) => ({
  ...getActionStyles(theme as Theme, props),
  padding: '16px',
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  backgroundColor: 'var(--bg-color)',
  color: 'var(--text-color)',
  borderRadius: props.rounded ? '24px' : '8px', // Set border radius based on rounded prop
}));

// Custom NeuCardAction component
const NeuCardAction: React.FC<NeuCardActionProps> = (props) => {
  return <StyledCardAction {...props}>{props.children}</StyledCardAction>;
};

export default NeuCardAction;
