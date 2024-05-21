import React from 'react';
import { styled } from '@mui/system';
import { useTheme, Theme as MuiTheme } from '@mui/material/styles';
import { Shadows } from '../../../types/types';

interface NeuDividerProps {
  dark?: boolean;
  dense?: boolean;
  elevated?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

const getDividerStyles = (theme: MuiTheme & { shadows: Shadows }, dark: boolean, dense: boolean, elevated: boolean) => {
  const baseStyles = {
    border: 0,
    borderRadius: '10px',
    height: '7px',
    background: theme.palette.background.default,
    boxShadow: dense
      ? (dark ? theme.shadows[3] : theme.shadows[1])
      : (dark ? theme.shadows[2] : theme.shadows[0]),
  };

  return {
    ...baseStyles,
    ...(elevated && {
      height: dense ? '3px' : '4px',
      boxShadow: dense
        ? (dark ? theme.shadows[4] : theme.shadows[2])
        : (dark ? theme.shadows[3] : theme.shadows[1]),
    }),
  };
};

const StyledDivider = styled('hr')<NeuDividerProps>(({ theme, dark, dense, elevated }) => ({
  ...getDividerStyles(theme as MuiTheme & { shadows: Shadows }, dark!, dense!, elevated!),
}));

const NeuDivider: React.FC<NeuDividerProps> = ({ dark = false, dense = false, elevated = false, style, className }) => {
  const theme = useTheme<MuiTheme & { shadows: Shadows }>();

  return (
    <StyledDivider
      theme={theme}
      dark={dark}
      dense={dense}
      elevated={elevated}
      style={style}
      className={className}
    />
  );
};

export default NeuDivider;
