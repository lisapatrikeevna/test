import React from 'react';
import {
  Alert as MUIAlert,
  AlertTitle,
  AlertProps as MUIAlertProps,
  IconButton,
  styled,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Theme } from '@mui/material/styles';

// Define custom properties for the Alert component, extending MUIAlertProps from MUI
interface CustomAlertProps extends Omit<MUIAlertProps, 'color'> {
  visible?: boolean; // Controls the visibility of the alert
  customColor?: string; // Allows setting a custom color
  dense?: boolean; // If true, makes the alert more compact
  inset?: boolean; // If true, adds a custom shadow
  bordered?: boolean; // If true, adds a border around the alert
  flat?: boolean; // If true, removes the box shadow
  rounded?: boolean; // If true, rounds the corners of the alert
  outlined?: boolean; // If true, outlines the alert with a border
  closeIcon?: React.ReactNode; // Custom icon for the close button
  onClose?: () => void; // Function to call when the close button is clicked
  icon?: React.ReactNode; // Custom icon for the alert
}

// Function to get custom alert styles based on the theme
const getAlertStyles = (theme: Theme) => ({
  '&.custom-alert': {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    ...(theme.palette.mode === 'dark'
      ? {
          color: theme.palette.text.primary, // Set text color based on theme
        }
      : {
          color: theme.palette.text.primary, // Set text color based on theme
        }),
    '&.dense': {
      padding: '8px 12px', // Compact padding for dense alerts
    },
    '&.bordered': {
      border: `1px solid ${theme.palette.divider}`, // Border style
    },
    '&.flat': {
      boxShadow: 'none', // Remove box shadow
    },
    '&.rounded': {
      borderRadius: theme.shape.borderRadius, // Round corners
    },
    '&.outlined': {
      border: `1px solid ${theme.palette.divider}`, // Outline style
      boxShadow: 'none', // Remove box shadow
    },
    '&.inset': {
      boxShadow: theme.shadows[1], // Custom shadow
    },
  },
});

// Styled MUIAlert component with custom styles applied
const StyledMUIAlert = styled(MUIAlert)<CustomAlertProps>(
  ({ theme, dense, bordered, flat, rounded, outlined, inset }) => ({
    ...getAlertStyles(theme),
    ...(dense && { padding: '8px 12px' }),
    ...(bordered && { border: `1px solid ${theme.palette.divider}` }),
    ...(flat && { boxShadow: 'none' }),
    ...(rounded && { borderRadius: theme.shape.borderRadius }),
    ...(outlined && { border: `1px solid ${theme.palette.divider}`, boxShadow: 'none' }),
    ...(inset && { boxShadow: theme.shadows[1] }), // Custom shadow
  })
);

// Custom Alert component
const Alert: React.FC<CustomAlertProps> = (props) => {
  const {
    children,
    visible = true, // Default visibility is true
    customColor,
    dense,
    inset,
    bordered,
    flat,
    rounded,
    outlined,
    closeIcon,
    onClose,
    icon,
    ...otherProps
  } = props;

  if (!visible) return null; // If not visible, render nothing

  return (
    <StyledMUIAlert
      {...otherProps}
      className={`custom-alert ${dense ? 'dense' : ''} ${bordered ? 'bordered' : ''} ${flat ? 'flat' : ''} ${rounded ? 'rounded' : ''} ${outlined ? 'outlined' : ''} ${inset ? 'inset' : ''}`}
      icon={icon}
      style={{ color: customColor }} // Apply custom color
      action={
        onClose && (
          <IconButton size="small" color="inherit" onClick={onClose}>
            {closeIcon || <CloseIcon fontSize="small" />} // Default close icon
          </IconButton>
        )
      }
    >
      {props.title && <AlertTitle>{props.title}</AlertTitle>} // Render alert title if provided
      {children} // Render alert content
    </StyledMUIAlert>
  );
};

export default Alert;
