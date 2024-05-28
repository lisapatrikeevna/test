import React from 'react';
import { styled, useTheme, Theme, SxProps } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Shadows } from '../../../types/types';

interface NeuDividerProps {
  dark?: boolean;
  dense?: boolean;
  elevated?: boolean;
  sx?: SxProps<Theme>; 
  style?: React.CSSProperties;
}

const getDividerStyles = (theme: Theme & { shadows: Shadows }, dense: boolean, elevated: boolean) => {
  const isDark = theme.palette.mode === 'dark';
  const baseColor = isDark ? '#333333' : '#bebebe';
  const lightShadow = isDark ? '#1a1a1a' : '#ffffff';

  const commonStyles = {
    background: theme.palette.background.default,
    borderRadius: '10px',
    height: '7px',
    boxShadow: `inset -3px -3px 5px ${lightShadow}, inset 3px 3px 5px ${baseColor}`,
  };

  return {
    ...commonStyles,
    ...(dense && {
      height: '5px',
      boxShadow: `inset -1px -1px 3px ${lightShadow}, inset 1px 1px 3px ${baseColor}`,
    }),
    ...(elevated && {
      boxShadow: `-2px -2px 5px ${lightShadow}, 2px 2px 5px ${baseColor}`,
    }),
    ...(dense && elevated && {
      height: '3px',
      boxShadow: `-1px -1px 3px ${lightShadow}, 1px 1px 3px ${baseColor}`,
    }),
  };
};

const StyledDivider = styled(Box)<NeuDividerProps>(({ theme, dense = false, elevated = false }) => ({
  ...getDividerStyles(theme as Theme & { shadows: Shadows }, dense, elevated),
}));

const NeuDivider: React.FC<NeuDividerProps> = ({ dense = false, elevated = false, sx }) => {
  const theme = useTheme<Theme & { shadows: Shadows }>();

  return (
    <StyledDivider
      theme={theme}
      dense={dense}
      elevated={elevated}
      sx={sx}
    />
  );
};

export default NeuDivider;
