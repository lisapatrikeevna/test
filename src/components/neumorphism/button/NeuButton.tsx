import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Shadows } from '../../../types/types';

// Define custom properties for the NeuButton component, extending ButtonProps from MUI
export interface NeuButtonProps extends ButtonProps {
  dark?: boolean; // If true, applies dark mode styles
  text?: boolean; // If true, removes background and box shadow
  block?: boolean; // If true, makes the button take the full width of its container
  active?: boolean; // If true, applies active styles
  noPress?: boolean; // If true, removes press styles
  rounded?: boolean; // If true, makes the button rounded
  bordered?: boolean; // If true, adds a border to the button
  outlined?: boolean; // If true, outlines the button with a border and removes background and box shadow
  depressed?: boolean; // If true, applies depressed styles
}

// Function to get custom button styles based on the theme
const getButtonStyles = (theme: Theme) => {
  const typedTheme = theme as Theme & { shadows: Shadows };
  const commonStyles = {
    boxShadow: typedTheme.shadows[1],
    backgroundColor: typedTheme.palette.background.default,
    color: typedTheme.palette.text.primary,
    borderRadius: typedTheme.shape.borderRadius,
    transition: 'box-shadow 200ms ease-in-out',
  };

  if (typedTheme.palette.mode === 'dark') {
    return {
      ...commonStyles,
      '--bg-color': typedTheme.palette.background.default,
      '--text-color': typedTheme.palette.text.primary,
      '--box-shadow': '5px 5px 12px #1a1a1a, -4px -4px 10px #333333',
      '--box-shadow-hover': '2px 2px 5px #1a1a1a, -2px -2px 5px #333333',
      '--box-shadow-inset': 'inset -2px -2px 5px #333333, inset 2px 2px 5px #1a1a1a',
      '--box-shadow-inset-low': 'inset -1px -1px 3px #333333, inset 1px 1px 3px #1a1a1a',
      '--box-shadow-fab': '10px 10px 20px #1a1a1a, -7px -7px 16px #333333',
    };
  } else {
    return {
      ...commonStyles,
      '--bg-color': typedTheme.palette.background.default,
      '--text-color': typedTheme.palette.text.primary,
      '--box-shadow': '5px 5px 12px #bebebe, -4px -4px 10px #ffffff',
      '--box-shadow-hover': '2px 2px 5px #bebebe, -2px -2px 5px #ffffff',
      '--box-shadow-inset': 'inset -2px -2px 5px #ffffff, inset 2px 2px 5px #bebebe',
      '--box-shadow-inset-low': 'inset -1px -1px 3px #ffffff, inset 1px 1px 3px #bebebe',
      '--box-shadow-fab': '10px 10px 20px #bebebe, -7px -7px 16px #ffffff',
    };
  }
};

// Styled Button component with custom styles applied
const StyledButton = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== 'dark' &&
    prop !== 'text' &&
    prop !== 'block' &&
    prop !== 'active' &&
    prop !== 'noPress' &&
    prop !== 'rounded' &&
    prop !== 'bordered' &&
    prop !== 'outlined' &&
    prop !== 'depressed',
})<NeuButtonProps>(({ theme, ...props }) => ({
  ...getButtonStyles(theme as Theme),
  outline: 'none',
  minWidth: '64px',
  padding: '0 12px',
  userSelect: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'var(--btn-height)',
  boxSizing: 'border-box',
  backgroundColor: 'var(--bg-color)',
  boxShadow: 'var(--box-shadow)',
  color: 'var(--text-color)',
  transition: 'box-shadow 200ms ease-in-out',
  borderRadius: props.rounded ? '56px' : '4px', // Set border radius based on rounded prop
  '&:hover': {
    boxShadow: 'var(--box-shadow-hover)', // Set hover styles
  },
  '&:active': {
    boxShadow: 'var(--box-shadow-inset)', // Set active styles
  },
  ...(props.bordered && { border: '1px solid var(--light-border-color)' }), // Add border if bordered is true
  ...(props.outlined && {
    boxShadow: 'none !important',
    transition: 'none !important',
    '--bg-color': 'transparent !important',
    border: `1px solid var(--border-color)`,
  }),
  ...(props.depressed && { boxShadow: 'var(--box-shadow-hover)' }), // Set depressed styles
  ...(props.block && { display: 'flex' }), // Set block styles
  ...(props.text && { boxShadow: 'none !important', transition: 'none !important', '--bg-color': 'transparent !important' }), // Set text styles
  ...(props.active && { boxShadow: 'var(--box-shadow-inset-low) !important' }), // Set active styles
  ...(props.noPress && { boxShadow: 'none !important' }), // Set noPress styles
}));

// Custom NeuButton component
const NeuButton: React.FC<NeuButtonProps> = (props) => {
  return <StyledButton {...props} />;
};

export default NeuButton;