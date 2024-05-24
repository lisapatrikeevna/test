import React from 'react';
import { styled } from '@mui/system';
import { SwitchProps as MuiSwitchProps } from '@mui/material';
import { WbSunny, DarkMode } from '@mui/icons-material';
import { Shadows } from '../../../types/types';

interface NeuSwitchProps extends Omit<MuiSwitchProps, 'size'> {
  bgColor?: string;
  borderColor?: string;
  size?: 'small' | 'medium' | 'large';
}

const sizeStyles = {
  small: {
    width: '43px',
    height: '22px',
    ballSize: '18px',
    iconSize: '14px',
    translate: '19px',
  },
  medium: {
    width: '50px', 
    height: '26px', 
    ballSize: '22px', 
    iconSize: '16px', 
    translate: '23px',
  },
  large: {
    width: '63px',
    height: '34px', 
    ballSize: '28px', 
    iconSize: '21px', 
    translate: '29px', 
  },
};

const StyledSwitchContainer = styled('span')<NeuSwitchProps>(({ theme, bgColor, size = 'medium' }) => {
  const typedTheme = theme as typeof theme & { shadows: Shadows };
  const styles = sizeStyles[size];

  return {
    width: styles.width,
    height: styles.height,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    position: 'relative',
    borderRadius: styles.height,
    display: 'inline-block',
    boxSizing: 'border-box',
    WebkitAppearance: 'none',
    transition: 'all 200ms ease-in-out',
    backgroundColor: bgColor || typedTheme.palette.background.default,
    boxShadow: typedTheme.palette.mode === 'dark'
      ? 'inset -2px -2px 3px rgba(0, 0, 0, 0.3), inset 2px 2px 3px rgba(255, 255, 255, 0.1)'
      : 'inset -2px -2px 3px rgba(255, 255, 255, 0.7), inset 2px 2px 3px rgba(0, 0, 0, 0.1)',
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      borderRadius: styles.height,
    },
    '&:before': {
      zIndex: 2,
      top: '3px',
      left: '3px',
      width: styles.ballSize,
      height: styles.ballSize,
      transform: 'translate3d(0%, 0, 0)',
      backgroundColor: typedTheme.palette.text.primary,
      boxShadow: typedTheme.palette.mode === 'dark'
        ? '1px 1px 2px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(255, 255, 255, 0.1)'
        : '1px 1px 2px rgba(255, 255, 255, 0.7), -1px -1px 2px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s cubic-bezier(0.85, 0.05, 0.18, 1.35)',
    },
    '&:after': {
      zIndex: 1,
      width: styles.width,
      height: styles.height,
      backgroundColor: bgColor || typedTheme.palette.background.default,
      boxShadow: typedTheme.palette.mode === 'dark'
        ? 'inset -2px -2px 3px rgba(0, 0, 0, 0.3), inset 2px 2px 3px rgba(255, 255, 255, 0.1)'
        : 'inset -2px -2px 3px rgba(255, 255, 255, 0.7), inset 2px 2px 3px rgba(0, 0, 0, 0.1)',
    },
    '.icon': {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: styles.iconSize,
      height: styles.iconSize,
      zIndex: 3,
    },
    '.sun-icon': {
      right: '4px',
      color: 'orange',
    },
    '.moon-icon': {
      left: '4px',
      color: 'gray',
    },
    '&.checked .sun-icon': {
      color: 'gray',
    },
    '&.checked .moon-icon': {
      color: 'gray',
    },
    '&.checked:before': {
      transform: `translate3d(${styles.translate}, 0, 0)`,
      backgroundColor: typedTheme.palette.text.primary,
    },
    '&.checked .sun-icon, &:not(.checked) .moon-icon': {
      display: 'none',
    },
    '&.disabled:before': {
      backgroundColor: typedTheme.palette.action.disabled,
    },
    '&.disabled': {
      opacity: 0.75,
    },
  };
});

const NeuSwitch: React.FC<NeuSwitchProps> = ({ checked, onChange, size = 'medium', ...props }) => {
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
      size={size}
      {...props}
    >
      <WbSunny className="icon sun-icon" />
      <DarkMode className="icon moon-icon" />
    </StyledSwitchContainer>
  );
};

export default NeuSwitch;
