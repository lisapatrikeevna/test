import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { BadgeProps as MuiBadgeProps } from '@mui/material';

// Define custom properties for the NeuBadge component, extending MuiBadgeProps from MUI
interface NeuBadgeProps extends Omit<MuiBadgeProps, 'overlap'> {
  dot?: boolean; // If true, the badge will be a small dot
  left?: boolean; // If true, the badge will be positioned on the left
  inline?: boolean; // If true, the badge will be displayed inline
  bottom?: boolean; // If true, the badge will be positioned at the bottom
  square?: boolean; // If true, the badge will have square corners
  overlap?: boolean; // Custom overlap property (not used in this code)
  visible?: boolean; // Controls the visibility of the badge
  label?: string; // Accessible label for the badge
  bordered?: boolean; // If true, the badge will have a border
  noPadding?: boolean; // If true, the badge will have no padding
  bgColor?: string; // Custom background color
  borderColor?: string; // Custom border color
}

// Styled span element with custom styles applied
const StyledBadge = styled('span')<NeuBadgeProps>(({ theme, dot, left, inline, bottom, square, bordered, noPadding, bgColor, borderColor }) => ({
  position: 'relative',
  display: 'flex',
  userSelect: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white, // Set text color
  backgroundColor: bgColor || theme.palette.primary.main, // Set background color
  borderColor: borderColor || theme.palette.common.white, // Set border color
  borderRadius: square ? '0px' : '12px', // Set border radius
  padding: noPadding ? '0px' : '2px 6px', // Set padding
  boxSizing: 'border-box',
  minWidth: '20px',
  height: dot ? '8px' : '20px', // Set height based on dot property
  transition: '0.3s ease-in-out', // Add transition for smooth appearance
  ...(bordered && { border: `2px solid ${borderColor}` }), // Add border if bordered is true
  ...(inline && { position: 'relative', margin: '0 4px' }), // Set inline styles
  ...(!inline && {
    position: 'absolute',
    top: bottom ? 'auto' : '0px',
    bottom: bottom ? '0px' : 'auto',
    left: left ? '0px' : 'auto',
    right: left ? 'auto' : '0px',
    transform: `translate(${left ? '-50%' : '50%'}, ${bottom ? '50%' : '-50%'})`, // Position the badge
  }),
}));

// Custom NeuBadge component
const NeuBadge: React.FC<NeuBadgeProps> = (props) => {
  const { children, content, dot, visible = true, label, ...rest } = props;
  const [id] = useState(() => `badge-${Math.random().toString(36).substr(2, 9)}`); // Generate unique ID for the badge

  useEffect(() => {
    const elem = document.getElementById(id);
    if (elem) {
      const { bgColor, color, borderColor } = props;
      elem.style.setProperty('--badge-bg-color', bgColor || '');
      elem.style.setProperty('--badge-text-color', color || '');
      elem.style.setProperty('--badge-border-color', borderColor || '');
    }
  }, [id, props]);

  if (!visible) {
    return <>{children}</>; // If not visible, render children without badge
  }

  return (
    <span id={id} style={{ position: 'relative' }}>
      {children} // Render children inside the badge container
      <StyledBadge aria-label={label} dot={dot} {...rest}>
        {dot ? null : content} // If dot is true, render nothing, else render content
      </StyledBadge>
    </span>
  );
};

export default NeuBadge;
