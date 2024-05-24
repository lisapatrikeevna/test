import React from 'react';
import { styled } from '@mui/system';
import { CheckboxProps as MuiCheckboxProps } from '@mui/material';
import { Shadows } from '../../../types/types'; 

interface NeuCheckboxProps extends Omit<MuiCheckboxProps, 'checkedIcon' | 'icon'> {
  bgColor?: string;
  borderColor?: string;
}

const StyledCheckboxContainer = styled('span')<NeuCheckboxProps>(({ theme, bgColor, borderColor }) => {
  const primaryColor = theme.palette.primary.main;
  const textColor = theme.palette.text.primary;

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
    boxShadow: (theme.shadows as Shadows)[1],
    transition: 'all 200ms ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '8px',
      height: '14px',
      borderRight: `3px solid ${borderColor || textColor}`,
      borderBottom: `3px solid ${borderColor || textColor}`,
      transform: 'rotate(45deg)',
    },
    '&.checked': {
      boxShadow: `inset ${(theme.shadows as Shadows)[1]}`,
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
