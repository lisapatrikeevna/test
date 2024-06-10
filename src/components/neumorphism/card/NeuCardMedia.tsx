import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Shadows } from '../../../types/types';
import { Typography } from '@mui/material';

interface NeuCardMediaProps extends BoxProps {
  dark?: boolean;
  rounded?: boolean;
  src?: string;
  title?: string;
  height?: number;
}

const getMediaStyles = (theme: Theme, props: NeuCardMediaProps) => {
  const typedTheme = theme as Theme & { shadows: Shadows };
  return {
    backgroundColor: typedTheme.palette.background.paper,
    color: typedTheme.palette.text.primary,
    borderRadius: props.rounded ? '24px' : '0px',
    backgroundImage: `url(${props.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: `${props.height}px`,
  };
};

const StyledCardMedia = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'dark' &&
    prop !== 'rounded' &&
    prop !== 'src' &&
    prop !== 'title' &&
    prop !== 'height',
})<NeuCardMediaProps>(({ theme, ...props }) => ({
  ...getMediaStyles(theme as Theme, props),
  padding: '16px',
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  backgroundColor: theme.palette.background.paper,
  color: 'var(--text-color)',
  borderRadius: props.rounded ? '24px' : '0px',
}));

const NeuCardMedia: React.FC<NeuCardMediaProps> = (props) => {
  const { title, ...rest } = props;

  return (
    <StyledCardMedia {...rest}>
      {title && (
        <Box sx={{ position: 'absolute', bottom: '0px', color: 'inherit' }}>
          <Typography variant="h6">{title}</Typography>
        </Box>
      )}
    </StyledCardMedia>
  );
};

export default NeuCardMedia;
