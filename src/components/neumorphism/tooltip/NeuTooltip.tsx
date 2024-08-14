import { Tooltip as MUITooltip, TooltipProps as MUITooltipProps, styled } from '@mui/material';

// Define custom properties for the NeuTooltip component, extending MUITooltipProps
interface NeuTooltipProps extends MUITooltipProps {
  customColor?: string; // Custom text color for the tooltip
  inset?: boolean; // If true, applies inset box shadow
  bottom?: boolean; // If true, positions the tooltip at the bottom
  top?: boolean; // If true, positions the tooltip at the top
  left?: boolean; // If true, positions the tooltip at the left
  right?: boolean; // If true, positions the tooltip at the right
  visible?: boolean; // Controls the visibility of the tooltip
  dark?: boolean; // If true, applies dark mode styles
}

// Styled Tooltip component with custom styles applied
const StyledTooltip = styled(MUITooltip, {
  shouldForwardProp: (prop) =>
    prop !== 'customColor' &&
    prop !== 'inset' &&
    prop !== 'bottom' &&
    prop !== 'top' &&
    prop !== 'left' &&
    prop !== 'right' &&
    prop !== 'dark',
})<NeuTooltipProps>(({ theme, customColor, inset, dark }) => ({
  backgroundColor: dark ? theme.palette.grey[900] : theme.palette.common.white,
  color: dark ? theme.palette.common.white : theme.palette.text.primary,
  boxShadow: inset ? `inset 0 0 10px rgba(0,0,0,0.1)` : theme.shadows[1],
  fontSize: '14px',
  padding: '8px 16px',
  zIndex: 10,
  ...(customColor && { color: customColor }),
  // Add other custom styles here
}));

// Custom NeuTooltip component
const NeuTooltip: React.FC<NeuTooltipProps> = (props) => {
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

  // Determine the position of the tooltip
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

export default NeuTooltip;
