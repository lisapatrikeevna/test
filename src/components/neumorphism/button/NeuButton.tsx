import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Shadows } from '../../../types/types';

interface NeuButtonProps extends ButtonProps {
  dark?: boolean;
  text?: boolean;
  block?: boolean;
  active?: boolean;
  noPress?: boolean;
  rounded?: boolean;
  bordered?: boolean;
  outlined?: boolean;
  depressed?: boolean;
}

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
  borderRadius: props.rounded ? '56px' : '4px',
  '&:hover': {
    boxShadow: 'var(--box-shadow-hover)',
  },
  '&:active': {
    boxShadow: 'var(--box-shadow-inset)',
  },
  ...(props.bordered && { border: '1px solid var(--light-border-color)' }),
  ...(props.outlined && {
    boxShadow: 'none !important',
    transition: 'none !important',
    '--bg-color': 'transparent !important',
    border: `1px solid var(--border-color)`,
  }),
  ...(props.depressed && { boxShadow: 'var(--box-shadow-hover)' }),
  ...(props.block && { display: 'flex' }),
  ...(props.text && { boxShadow: 'none !important', transition: 'none !important', '--bg-color': 'transparent !important' }),
  ...(props.active && { boxShadow: 'var(--box-shadow-inset-low) !important' }),
  ...(props.noPress && { boxShadow: 'none !important' }),
}));

const NeuButton: React.FC<NeuButtonProps> = (props) => {
  return <StyledButton {...props} />;
};

export default NeuButton;
