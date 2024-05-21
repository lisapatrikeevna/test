import React from 'react';
import { styled } from '@mui/system';
import { CheckboxProps as MuiCheckboxProps } from '@mui/material';
import { Shadows } from '../../../types/types';

interface NeuCheckboxProps extends Omit<MuiCheckboxProps, 'checkedIcon' | 'icon'> {
  bgColor?: string;
  borderColor?: string;
}

const StyledCheckboxContainer = styled('span')<NeuCheckboxProps>(({ theme, bgColor, borderColor }) => {
  const typedTheme = theme as typeof theme & { shadows: Shadows };

  return {
    width: '20px',
    height: '20px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative',
    borderRadius: '4px',
    boxSizing: 'border-box',
    backgroundColor: bgColor || theme.palette.background.paper,
    boxShadow: typedTheme.shadows[1],
    transition: 'all 200ms ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:after': {
      content: '""',
      position: 'absolute',
      width: '4px',
      height: '10px',
      borderRight: `2px solid ${borderColor || theme.palette.text.primary}`,
      borderBottom: `2px solid ${borderColor || theme.palette.text.primary}`,
      transform: 'rotate(45deg)',
    },
    '&.checked': {
      boxShadow: `inset ${typedTheme.shadows[1]}`,
    },
    '&.checked:after': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover:after, &.checked:not(:hover):after': {
      animation: 'checkbox-check 200ms cubic-bezier(.4, .0, .23, 1) forwards',
    },
    '&:not(:hover):after': {
      animation: 'checkbox-uncheck 150ms cubic-bezier(.4, .0, .23, 1) forwards',
    },
    '&.Mui-disabled': {
      pointerEvents: 'none',
      color: theme.palette.action.disabled,
      '&.checked:after': {
        borderRight: '2px solid transparent',
        borderBottom: '2px solid transparent',
      },
    },
    '@keyframes checkbox-check': {
      '0%': {
        width: '0',
        height: '0',
        borderColor: theme.palette.primary.main,
        transform: 'rotate(45deg)',
      },
      '70%': {
        width: '4px',
        height: '0',
        transform: 'rotate(45deg)',
      },
      '100%': {
        width: '4px',
        height: '10px',
        borderColor: theme.palette.primary.main,
        transform: 'rotate(45deg)',
      },
    },
    '@keyframes checkbox-uncheck': {
      '0%': {
        width: '4px',
        height: '10px',
        borderColor: theme.palette.primary.main,
        transform: 'rotate(45deg)',
      },
      '60%': {
        width: '4px',
        height: '0',
        transform: 'rotate(45deg)',
      },
      '90%': {
        width: '0',
        height: '0',
        borderColor: theme.palette.primary.main,
        transform: 'rotate(45deg)',
      },
      '100%': {
        borderColor: 'transparent',
        transform: 'rotate(45deg)',
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
