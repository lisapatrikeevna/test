import React from 'react';
import NeuButton, { NeuButtonProps } from './NeuButton';

// Define properties for the NeuIconButton component, extending NeuButtonProps
interface NeuIconButtonProps extends NeuButtonProps {
  children: React.ReactNode; // Content to be displayed inside the button
}

// Custom NeuIconButton component
const NeuIconButton: React.FC<NeuIconButtonProps> = ({ children, ...otherProps }) => {
  return (
    <NeuButton sx={{ minWidth: '40px', padding: '6px' }} {...otherProps} block={false} depressed={false}>
      {children} // Render children inside the button
    </NeuButton>
  );
};

export default NeuIconButton;