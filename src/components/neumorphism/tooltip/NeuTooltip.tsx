import { Tooltip as MUITooltip, TooltipProps as MUITooltipProps, styled } from '@mui/material';

interface CustomTooltipProps extends MUITooltipProps {
  customColor?: string;
  inset?: boolean;
  bottom?: boolean;
  top?: boolean;
  left?: boolean;
  right?: boolean;
  visible?: boolean;
  dark?: boolean;
}

const StyledTooltip = styled(MUITooltip, {
  shouldForwardProp: (prop) =>
    prop !== 'customColor' &&
    prop !== 'inset' &&
    prop !== 'bottom' &&
    prop !== 'top' &&
    prop !== 'left' &&
    prop !== 'right' &&
    prop !== 'dark',
})<CustomTooltipProps>(({ theme, customColor, inset, dark }) => ({
  backgroundColor: dark ? theme.palette.grey[900] : theme.palette.common.white,
  color: dark ? theme.palette.common.white : theme.palette.text.primary,
  boxShadow: inset ? `inset 0 0 10px rgba(0,0,0,0.1)` : theme.shadows[1],
  fontSize: '14px',
  padding: '8px 16px',
  zIndex: 10,
  ...(customColor && { color: customColor }),
  // Add other custom styles here
}));

const CustomTooltip: React.FC<CustomTooltipProps> = (props) => {
  const {
    children,
    customColor,
    inset,
    bottom,
    top,
    left,
    right,
    visible,
    dark,
    title,
    ...otherProps
  } = props;

  const position = bottom
    ? 'bottom'
    : top
    ? 'top'
    : left
    ? 'left'
    : right
    ? 'right'
    : 'bottom';

  return (
    <StyledTooltip
      open={visible}
      arrow
      placement={position}
      customColor={customColor}
      inset={inset}
      dark={dark}
      title={title} // Move this to the last position to ensure it's not overwritten
      {...otherProps}
    >
      {children}
    </StyledTooltip>
  );
};

export default CustomTooltip;
