import React from 'react';
import { Box, Typography, BoxProps } from '@mui/material';
import { styled } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Shadows } from '../../../types/types';

interface NeuCardHeaderProps extends Omit<BoxProps, 'title'> { // Omit 'title' from BoxProps
  dark?: boolean;
  rounded?: boolean;
  title?: React.ReactNode; // Allow string or ReactNode
  avatar?: React.ReactNode;
  action?: React.ReactNode;
  subtitle?: string;
}

const getHeaderStyles = (theme: Theme, props: NeuCardHeaderProps) => {
  const typedTheme = theme as Theme & { shadows: Shadows };
  return {
    backgroundColor: typedTheme.palette.background.paper,
    color: typedTheme.palette.text.primary,
    borderRadius: props.rounded ? '24px' : '8px',
  };
};

const StyledCardHeader = styled(Box, {
  shouldForwardProp: (prop) =>
      prop !== 'dark' &&
      prop !== 'rounded' &&
      prop !== 'title' &&
      prop !== 'avatar' &&
      prop !== 'action' &&
      prop !== 'subtitle',
})<NeuCardHeaderProps>(({ theme, ...props }) => ({
  ...getHeaderStyles(theme as Theme, props),
  padding: '16px',
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxSizing: 'border-box',
  backgroundColor: theme.palette.background.paper,
  color: 'var(--text-color)',
  borderRadius: props.rounded ? '24px' : '8px',
}));

const NeuCardHeader: React.FC<NeuCardHeaderProps> = (props) => {
  const { title, avatar, action, subtitle, ...rest } = props;

  return (
      <StyledCardHeader {...rest}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {avatar && <Box sx={{ marginRight: '16px' }}>{avatar}</Box>}
          <Box>
            {title && (typeof title === 'string' ? <Typography variant="h6">{title}</Typography> : title)}
            {subtitle && <Typography variant="subtitle1">{subtitle}</Typography>}
          </Box>
        </Box>
        {action && <Box>{action}</Box>}
      </StyledCardHeader>
  );
};

export default NeuCardHeader;
