import React from 'react';
import { Box, Typography, BoxProps } from '@mui/material';
import { styled } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Shadows } from '../../../types/types';

// Define custom properties for the NeuCardHeader component, extending BoxProps from MUI
interface NeuCardHeaderProps extends Omit<BoxProps, 'title'> { // Omit 'title' from BoxProps
  dark?: boolean; // If true, applies dark mode styles
  rounded?: boolean; // If true, makes the header area rounded
  title?: React.ReactNode; // Allow string or ReactNode for the title
  avatar?: React.ReactNode; // Avatar element to display
  action?: React.ReactNode; // Action element to display
  subtitle?: string; // Subtitle text to display
}

// Function to get custom header styles based on the theme and props
const getHeaderStyles = (theme: Theme, props: NeuCardHeaderProps) => {
  const typedTheme = theme as Theme & { shadows: Shadows };
  return {
    backgroundColor: typedTheme.palette.background.paper,
    color: typedTheme.palette.text.primary,
    borderRadius: props.rounded ? '24px' : '8px',
  };
};

// Styled Box component with custom styles applied
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
  borderRadius: props.rounded ? '24px' : '8px', // Set border radius based on rounded prop
}));

// Custom NeuCardHeader component
const NeuCardHeader: React.FC<NeuCardHeaderProps> = (props) => {
  const { title, avatar, action, subtitle, ...rest } = props;

  return (
    <StyledCardHeader {...rest}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {avatar && <Box sx={{ marginRight: '16px' }}>{avatar}</Box>} // Display avatar if provided
        <Box>
          {title && (typeof title === 'string' ? <Typography variant="h6">{title}</Typography> : title)} // Display title if provided
          {subtitle && <Typography variant="subtitle1">{subtitle}</Typography>} // Display subtitle if provided
        </Box>
      </Box>
      {action && <Box>{action}</Box>} // Display action if provided
    </StyledCardHeader>
  );
};

export default NeuCardHeader;
