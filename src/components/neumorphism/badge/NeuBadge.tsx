import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import { BadgeProps as MuiBadgeProps } from '@mui/material';

interface NeuBadgeProps extends Omit<MuiBadgeProps, 'overlap'> {
  dot?: boolean;
  left?: boolean;
  inline?: boolean;
  bottom?: boolean;
  square?: boolean;
  overlap?: boolean; 
  visible?: boolean;
  label?: string;
  bordered?: boolean;
  noPadding?: boolean;
  bgColor?: string;
  borderColor?: string;
}

const StyledBadge = styled('span')<NeuBadgeProps>(({ theme, dot, left, inline, bottom, square, bordered, noPadding, bgColor, borderColor }) => ({
  position: 'relative',
  display: 'flex',
  userSelect: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  backgroundColor: bgColor || theme.palette.primary.main,
  borderColor: borderColor || theme.palette.common.white,
  borderRadius: square ? '0px' : '12px',
  padding: noPadding ? '0px' : '2px 6px',
  boxSizing: 'border-box',
  minWidth: '20px',
  height: dot ? '8px' : '20px',
  transition: '0.3s ease-in-out',
  ...(bordered && { border: `2px solid ${borderColor}` }),
  ...(inline && { position: 'relative', margin: '0 4px' }),
  ...(!inline && {
    position: 'absolute',
    top: bottom ? 'auto' : '0px',
    bottom: bottom ? '0px' : 'auto',
    left: left ? '0px' : 'auto',
    right: left ? 'auto' : '0px',
    transform: `translate(${left ? '-50%' : '50%'}, ${bottom ? '50%' : '-50%'})`,
  }),
}));

const NeuBadge: React.FC<NeuBadgeProps> = (props) => {
  const { children, content, dot, visible = true, label, ...rest } = props;
  const [id] = useState(() => `badge-${Math.random().toString(36).substr(2, 9)}`);

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
    return <>{children}</>;
  }

  return (
    <span id={id} style={{ position: 'relative' }}>
      {children}
      <StyledBadge aria-label={label} dot={dot} {...rest}>
        {dot ? null : content}
      </StyledBadge>
    </span>
  );
};

export default NeuBadge;
