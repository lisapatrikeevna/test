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

interface CustomAlertProps extends Omit<MUIAlertProps, 'color'> {
  visible?: boolean;
  customColor?: string;
  dense?: boolean;
  inset?: boolean;
  bordered?: boolean;
  flat?: boolean;
  rounded?: boolean;
  outlined?: boolean;
  closeIcon?: React.ReactNode;
  onClose?: () => void;
  icon?: React.ReactNode;
}

const getAlertStyles = (theme: Theme) => ({
  '&.custom-alert': {
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    ...(theme.palette.mode === 'dark'
      ? {
          color: theme.palette.text.primary,
        }
      : {
          color: theme.palette.text.primary,
        }),
    '&.dense': {
      padding: '8px 12px',
    },
    '&.bordered': {
      border: `1px solid ${theme.palette.divider}`,
    },
    '&.flat': {
      boxShadow: 'none',
    },
    '&.rounded': {
      borderRadius: theme.shape.borderRadius,
    },
    '&.outlined': {
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: 'none',
    },
    '&.inset': {
      boxShadow: theme.shadows[1], // Use custom shadow
    },
  },
});

const StyledMUIAlert = styled(MUIAlert)<CustomAlertProps>(
  ({ theme, dense, bordered, flat, rounded, outlined, inset }) => ({
    ...getAlertStyles(theme),
    ...(dense && { padding: '8px 12px' }),
    ...(bordered && { border: `1px solid ${theme.palette.divider}` }),
    ...(flat && { boxShadow: 'none' }),
    ...(rounded && { borderRadius: theme.shape.borderRadius }),
    ...(outlined && { border: `1px solid ${theme.palette.divider}`, boxShadow: 'none' }),
    ...(inset && { boxShadow: theme.shadows[1] }), // Use custom shadow
  })
);

const Alert: React.FC<CustomAlertProps> = (props) => {
  const {
    children,
    visible = true,
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

  if (!visible) return null;

  return (
    <StyledMUIAlert
      {...otherProps}
      className={`custom-alert ${dense ? 'dense' : ''} ${bordered ? 'bordered' : ''} ${flat ? 'flat' : ''} ${rounded ? 'rounded' : ''} ${outlined ? 'outlined' : ''} ${inset ? 'inset' : ''}`}
      icon={icon}
      style={{ color: customColor }}
      action={
        onClose && (
          <IconButton size="small" color="inherit" onClick={onClose}>
            {closeIcon || <CloseIcon fontSize="small" />}
          </IconButton>
        )
      }
    >
      {props.title && <AlertTitle>{props.title}</AlertTitle>}
      {children}
    </StyledMUIAlert>
  );
};

export default Alert;
