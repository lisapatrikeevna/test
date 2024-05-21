import React from 'react';
import { styled } from '@mui/system';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import { Shadows } from '../../../types/types';

export interface NeuTextFieldProps extends Omit<MuiTextFieldProps, 'variant'> {
  dark?: boolean;
  dense?: boolean;
  rounded?: boolean;
  bordered?: boolean;
  outlined?: boolean;
  height?: number;
}

const getTextFieldStyles = (theme: Theme, props: NeuTextFieldProps) => {
  const typedTheme = theme as Theme & { shadows: Shadows };
  const isDarkMode = typedTheme.palette.mode === 'dark';
  return {
    backgroundColor: typedTheme.palette.background.default,
    color: typedTheme.palette.text.primary,
    boxShadow: props.outlined
      ? 'none'
      : isDarkMode
      ? 'inset 2px 2px 5px #1a1a1a, inset -2px -2px 5px #333333'
      : 'inset 2px 2px 5px #bebebe, inset -2px -2px 5px #ffffff',
    borderRadius: props.rounded ? '24px' : '8px',
    border: props.bordered && !props.outlined ? `1px solid ${typedTheme.palette.divider}` : 'none',
    '&:hover': {
      boxShadow: props.outlined
        ? 'none'
        : isDarkMode
        ? 'inset 1px 1px 2px #1a1a1a, inset -1px -1px 2px #333333'
        : 'inset 1px 1px 2px #bebebe, inset -1px -1px 2px #ffffff',
    },
    '&.Mui-focused': {
      boxShadow: 'none',
      borderColor: props.outlined ? typedTheme.palette.primary.main : 'none',
    },
    '&.Mui-disabled': {
      opacity: 0.6,
      pointerEvents: 'none',
      color: typedTheme.palette.text.disabled,
    },
    '& .MuiInputBase-root': {
      height: props.dense ? '32px' : '52px',
      padding: '0 16px',
      minHeight: props.height ? `${props.height}px` : 'auto',
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiInputBase-input': {
      height: '100%',
      padding: '0',
      display: 'flex',
      alignItems: 'center',
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: props.rounded ? '24px' : '8px',
      '& fieldset': {
        border: props.outlined ? `1px solid ${typedTheme.palette.divider}` : 'none',
      },
      '&:hover fieldset': {
        border: props.outlined ? `1px solid ${typedTheme.palette.primary.main}` : 'none',
      },
      '&.Mui-focused fieldset': {
        border: props.outlined ? `2px solid ${typedTheme.palette.primary.main}` : 'none',
      },
    },
  };
};

const StyledTextField = styled(MuiTextField, {
  shouldForwardProp: (prop) =>
    prop !== 'dark' &&
    prop !== 'dense' &&
    prop !== 'rounded' &&
    prop !== 'bordered' &&
    prop !== 'outlined' &&
    prop !== 'height',
})<NeuTextFieldProps>(({ theme, ...props }) => ({
  ...getTextFieldStyles(theme as Theme, props),
}));

const NeuTextField: React.FC<NeuTextFieldProps> = (props) => {
  return <StyledTextField {...props} />;
};

export default NeuTextField;
