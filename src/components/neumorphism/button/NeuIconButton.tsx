import React from 'react';
import NeuButton, { NeuButtonProps } from './NeuButton';

interface NeuIconButtonProps extends NeuButtonProps {
  children: React.ReactNode;
}

const NeuIconButton: React.FC<NeuIconButtonProps> = ({ children, ...otherProps }) => {
  return (
    <NeuButton sx={{ minWidth: '40px', padding: '6px' }} {...otherProps} block={false} depressed={false}>
      {children}
    </NeuButton>
  );
};

export default NeuIconButton;
