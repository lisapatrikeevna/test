import React from 'react';
import { styled } from '@mui/system';
import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from '@mui/material';

interface NeuAvatarProps extends MuiAvatarProps {
  square?: boolean;
  rounded?: boolean;
  color?: string;
  bgColor?: string;
  size?: 'small' | 'medium' | 'large' | number;
  loaded?: boolean;
  children?: React.ReactNode;
}

const StyledAvatar = styled(MuiAvatar)<NeuAvatarProps>(({ theme, square, rounded, bgColor, color, size }) => {
  const isSizeNumber = typeof size === 'number';
  const sizeValue = isSizeNumber ? size : size === 'small' ? 24 : size === 'medium' ? 40 : size === 'large' ? 56 : 40;
  const variant = square ? '0px' : rounded ? '8px' : '50%';

  return {
    display: 'flex',
    overflow: 'hidden',
    userSelect: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    color: color || theme.palette.common.white,
    backgroundColor: bgColor || theme.palette.primary.main,
    width: isSizeNumber ? `${sizeValue}px` : undefined,
    height: isSizeNumber ? `${sizeValue}px` : undefined,
    borderRadius: variant,
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      textAlign: 'center',
    },
  };
});

const NeuAvatar: React.FC<NeuAvatarProps> = (props) => {
  const { alt, src, children, size, ...rest } = props;
  return (
    <StyledAvatar
      alt={alt}
      src={src}
      size={size}
      {...rest}
    >
      {children}
    </StyledAvatar>
  );
};

export default NeuAvatar;
