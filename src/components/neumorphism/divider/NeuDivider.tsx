import React from 'react';
import { styled, useTheme, Theme, SxProps } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Shadows } from '../../../types/types';

interface NeuDividerProps {
  baseColor?: string;
  lightShadow?: string;
  dense?: boolean;
  elevated?: boolean;
  sx?: SxProps<Theme>;
  style?: React.CSSProperties;
}

const getDividerStyles = (theme: Theme & { shadows: Shadows }, lightShadow:string | undefined, baseColor: string | undefined, dense: boolean, elevated: boolean) => {
  const isDark = theme.palette.mode === 'dark';
  const defaultBaseColor = isDark ? '#333333' : '#bebebe';
  const defaultLightShadow = isDark ? '#1a1a1a' : '#ffffff';

  const commonStyles = {
    background: theme.palette.background.default,
    borderRadius: '10px',
    height: '7px',
    boxShadow: `inset -3px -3px 5px ${lightShadow || defaultLightShadow}, inset 3px 3px 5px ${baseColor || defaultBaseColor}`,
  };

  return {
    ...commonStyles,
    ...(dense && {
      height: '5px',
      boxShadow: `inset -1px -1px 3px ${lightShadow || defaultLightShadow}, inset 1px 1px 3px ${baseColor || defaultBaseColor}`,
    }),
    ...(elevated && {
      boxShadow: `-2px -2px 5px ${lightShadow || defaultLightShadow}, 2px 2px 5px ${baseColor || defaultBaseColor}`,
    }),
    ...(dense && elevated && {
      height: '3px',
      boxShadow: `-1px -1px 3px ${lightShadow || defaultLightShadow}, 1px 1px 3px ${baseColor || defaultBaseColor}`,
    }),
  };
};

const StyledDivider = styled(Box)<NeuDividerProps>(({ theme, lightShadow, baseColor, dense = false, elevated = false }) => ({
  ...getDividerStyles(theme as Theme & { shadows: Shadows },lightShadow, baseColor, dense, elevated),
}));

const NeuDivider: React.FC<NeuDividerProps> = ({ lightShadow, baseColor, dense = false, elevated = false, sx }) => {
  const theme = useTheme<Theme & { shadows: Shadows }>();

  return (
      <StyledDivider
          theme={theme}
          baseColor={baseColor}
          lightShadow={lightShadow}
          dense={dense}
          elevated={elevated}
          sx={sx}
      />
  );
};

export default NeuDivider;
