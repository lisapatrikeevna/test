import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Shadows } from '../../../types/types';

interface NeuCardContentProps extends BoxProps {
  dark?: boolean;
  rounded?: boolean;
}

const getContentStyles = (theme: Theme, props: NeuCardContentProps) => {
  const typedTheme = theme as Theme & { shadows: Shadows };
  return {
    backgroundColor: typedTheme.palette.background.default,
    color: typedTheme.palette.text.primary,
    borderRadius: props.rounded ? '24px' : '8px',
  };
};

const StyledCardContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'dark' && prop !== 'rounded',
})<NeuCardContentProps>(({ theme, ...props }) => ({
  ...getContentStyles(theme as Theme, props),
  padding: '16px',
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  backgroundColor: 'var(--bg-color)',
  color: 'var(--text-color)',
  borderRadius: props.rounded ? '24px' : '8px',
}));

const NeuCardContent: React.FC<NeuCardContentProps> = (props) => {
  return <StyledCardContent {...props}>{props.children}</StyledCardContent>;
};

export default NeuCardContent;
