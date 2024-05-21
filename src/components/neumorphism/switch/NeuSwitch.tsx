import React from 'react';
import { styled } from '@mui/system';
import { SwitchProps as MuiSwitchProps } from '@mui/material';
import { Shadows } from '../../../types/types';

interface NeuSwitchProps extends Omit<MuiSwitchProps, 'checkedIcon' | 'icon'> {
  dark?: boolean;
  bgColor?: string;
  borderColor?: string;
}

const StyledSwitchContainer = styled('span')<NeuSwitchProps>(({ theme, dark, bgColor, borderColor }) => {
  const typedTheme = theme as typeof theme & { shadows: Shadows };
  
  return {
    width: '48px',
    height: '28px',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    position: 'relative',
    borderRadius: '32px',
    display: 'inline-block',
    boxSizing: 'border-box',
    WebkitAppearance: 'none',
    transition: 'all 200ms ease-in-out',
    backgroundColor: bgColor || typedTheme.palette.background.default,
    boxShadow: dark
      ? 'inset -2px -2px 3px rgba(0, 0, 0, 0.3), inset 2px 2px 3px rgba(255, 255, 255, 0.1)'
      : 'inset -2px -2px 3px rgba(255, 255, 255, 0.7), inset 2px 2px 3px rgba(0, 0, 0, 0.1)',
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      borderRadius: '32px',
      backgroundColor: bgColor || typedTheme.palette.background.default,
    },
    '&:before': {
      zIndex: 2,
      top: '4px',
      left: '4px',
      width: '20px',
      height: '20px',
      transform: 'translate3d(0%, 0, 0)',
      boxShadow: dark
        ? '1px 1px 2px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(255, 255, 255, 0.1)'
        : '1px 1px 2px rgba(255, 255, 255, 0.7), -1px -1px 2px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s cubic-bezier(0.85, 0.05, 0.18, 1.35)',
    },
    '&:after': {
      zIndex: 1,
      width: '48px',
      height: '28px',
      boxShadow: dark
        ? 'inset -2px -2px 3px rgba(0, 0, 0, 0.3), inset 2px 2px 3px rgba(255, 255, 255, 0.1)'
        : 'inset -2px -2px 3px rgba(255, 255, 255, 0.7), inset 2px 2px 3px rgba(0, 0, 0, 0.1)',
    },
    '&:hover:before': {
      backgroundColor: borderColor || typedTheme.palette.primary.main,
    },
    '&.checked:before': {
      transform: 'translate3d(100%, 0, 0)',
      backgroundColor: borderColor || typedTheme.palette.primary.main,
    },
    '&.disabled:before': {
      backgroundColor: typedTheme.palette.action.disabled,
    },
    '&.disabled': {
      opacity: 0.75,
    },
  };
});

const NeuSwitch: React.FC<NeuSwitchProps> = ({ checked, onChange, ...props }) => {
  const handleClick = () => {
    if (onChange) {
      const event = { target: { checked: !checked } } as React.ChangeEvent<HTMLInputElement>;
      onChange(event, !checked);
    }
  };

  return (
    <StyledSwitchContainer
      onClick={handleClick}
      className={`${checked ? 'checked' : ''} ${props.disabled ? 'disabled' : ''}`}
      {...props}
    />
  );
};

export default NeuSwitch;
