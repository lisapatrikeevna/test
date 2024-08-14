import React from 'react';
import { styled } from '@mui/system';
import { Avatar as MuiAvatar, AvatarProps as MuiAvatarProps } from '@mui/material';

// Define custom properties for the NeuAvatar component, extending MuiAvatarProps from MUI
interface NeuAvatarProps extends MuiAvatarProps {
  square?: boolean; // If true, the avatar will have square corners
  rounded?: boolean; // If true, the avatar will have slightly rounded corners
  color?: string; // Custom text color
  bgColor?: string; // Custom background color
  size?: 'small' | 'medium' | 'large' | number; // Size of the avatar
  loaded?: boolean; // Custom prop to indicate if the avatar has loaded (not used in this code)
  children?: React.ReactNode; // Content to be displayed inside the avatar
}

// Styled MuiAvatar component with custom styles applied
const StyledAvatar = styled(MuiAvatar)<NeuAvatarProps>(({ theme, square, rounded, bgColor, color, size }) => {
  const isSizeNumber = typeof size === 'number'; // Check if the size is a number
  const sizeValue = isSizeNumber ? size : size === 'small' ? 24 : size === 'medium' ? 40 : size === 'large' ? 56 : 40; // Determine size value
  const variant = square ? '0px' : rounded ? '8px' : '50%'; // Determine border radius

  return {
    display: 'flex',
    overflow: 'hidden',
    userSelect: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    color: color || theme.palette.common.white, // Set text color
    backgroundColor: bgColor || theme.palette.primary.main, // Set background color
    width: isSizeNumber ? `${sizeValue}px` : undefined, // Set width if size is a number
    height: isSizeNumber ? `${sizeValue}px` : undefined, // Set height if size is a number
    borderRadius: variant, // Set border radius
    '& img': {
      width: '100%', // Ensure image covers the avatar
      height: '100%', // Ensure image covers the avatar
      objectFit: 'cover', // Cover the avatar without distortion
      textAlign: 'center', // Center-align the image
    },
  };
});

// Custom NeuAvatar component
const NeuAvatar: React.FC<NeuAvatarProps> = (props) => {
  const { alt, src, children, size, ...rest } = props; // Destructure props
  return (
    <StyledAvatar
      alt={alt}
      src={src}
      size={size}
      {...rest}
    >
      {children} // Render children inside the avatar
    </StyledAvatar>
  );
};

export default NeuAvatar;
