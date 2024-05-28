import React from 'react';
import { styled } from '@mui/system';
import { CheckboxProps as MuiCheckboxProps } from '@mui/material';
import { Shadows } from '../../../types/types';

interface NeuCheckboxProps extends Omit<MuiCheckboxProps, 'checkedIcon' | 'icon'> {
  bgColor?: string;
  borderColor?: string;
}

const StyledCheckboxContainer = styled('span')<NeuCheckboxProps>(({ theme, bgColor }) => {
  const primaryColor = theme.palette.primary.main;

  // Приведение theme.shadows к типу Shadows
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
    backgroundColor: bgColor || theme.palette.background.paper,
    boxShadow: shadows[1],
    transition: 'all 200ms ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '8px',
      height: '14px',
      borderRight: `3px solid gray`,
      borderBottom: `3px solid gray`,
      transform: 'rotate(45deg)',
      transition: 'border-color 200ms ease-in-out',
    },
    '&:hover:after': {
      borderColor: primaryColor,
    },
    '&.checked': {
      boxShadow: `inset ${shadows[1]}`,
      '&:after': {
        borderColor: primaryColor,
      },
    },
    '&.Mui-disabled': {
      pointerEvents: 'none',
      color: theme.palette.action.disabled,
      '&.checked:after': {
        borderRight: '3px solid transparent',
        borderBottom: '3px solid transparent',
      },
    },
  };
});

const NeuCheckbox: React.FC<NeuCheckboxProps> = ({ checked, onChange, ...props }) => {
  const handleClick = () => {
    if (onChange) {
      const event = { target: { checked: !checked } } as React.ChangeEvent<HTMLInputElement>;
      onChange(event, !checked);
    }
  };

  return (
    <StyledCheckboxContainer
      onClick={handleClick}
      className={checked ? 'checked' : ''}
      {...props}
    />
  );
};

export default NeuCheckbox;
