import React from 'react';
import { styled } from '@mui/system';
import { CheckboxProps as MuiCheckboxProps } from '@mui/material';
import { Shadows } from '../../../types/types';

// Define custom properties for the NeuCheckbox component, extending MuiCheckboxProps from MUI
interface NeuCheckboxProps extends Omit<MuiCheckboxProps, 'checkedIcon' | 'icon'> {
  bgColor?: string; // Custom background color
  borderColor?: string; // Custom border color
}

// Styled span element with custom styles applied for the checkbox container
const StyledCheckboxContainer = styled('span')<NeuCheckboxProps>(({ theme, bgColor }) => {
  const primaryColor = theme.palette.primary.main;

  // Cast theme.shadows to Shadows type
  const shadows = theme.shadows as Shadows;

  return {
    width: '24px',
    height: '24px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative',
    borderRadius: '4px',
    boxSizing: 'border-box',
    backgroundColor: bgColor || theme.palette.background.paper, // Set background color
    boxShadow: shadows[1], // Set initial box shadow
    transition: 'all 200ms ease-in-out', // Transition for smooth changes
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '8px',
      height: '14px',
      borderRight: `3px solid gray`, // Initial checkmark color
      borderBottom: `3px solid gray`, // Initial checkmark color
      transform: 'rotate(45deg)', // Rotate the checkmark
      transition: 'border-color 200ms ease-in-out', // Transition for checkmark color
    },
    '&:hover:after': {
      borderColor: primaryColor, // Change checkmark color on hover
    },
    '&.checked': {
      boxShadow: `inset ${shadows[1]}`, // Set inset box shadow when checked
      '&:after': {
        borderColor: primaryColor, // Change checkmark color when checked
      },
    },
    '&.Mui-disabled': {
      pointerEvents: 'none', // Disable pointer events when disabled
      color: theme.palette.action.disabled,
      '&.checked:after': {
        borderRight: '3px solid transparent',
        borderBottom: '3px solid transparent', // Make checkmark transparent when disabled and checked
      },
    },
  };
});

// Custom NeuCheckbox component
const NeuCheckbox: React.FC<NeuCheckboxProps> = ({ checked, onChange, ...props }) => {
  // Handle click event to toggle the checkbox state
  const handleClick = () => {
    if (onChange) {
      const event = { target: { checked: !checked } } as React.ChangeEvent<HTMLInputElement>;
      onChange(event, !checked);
    }
  };

  return (
    <StyledCheckboxContainer
      onClick={handleClick}
      className={checked ? 'checked' : ''} // Apply checked class if checked
      {...props}
    />
  );
};

export default NeuCheckbox;
