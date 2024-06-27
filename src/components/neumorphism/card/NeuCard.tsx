import React from 'react';
import { Card, CardProps } from '@mui/material';
import { styled } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Shadows } from '../../../types/types';
import { useSpring, animated } from 'react-spring';

// Define custom properties for the NeuCard component, extending CardProps from MUI
interface NeuCardProps extends CardProps {
  dark?: boolean; // If true, applies dark mode styles
  flat?: boolean; // If true, removes the box shadow
  inset?: boolean; // If true, adds an inset shadow
  rounded?: boolean; // If true, makes the card rounded
  outlined?: boolean; // If true, outlines the card with a border
  bordered?: boolean; // If true, adds a border to the card
  elevation?: number; // Custom elevation level for the card
  in?: boolean; // Controls the animation state
}

// Function to get custom card styles based on the theme and props
const getCardStyles = (theme: Theme, props: NeuCardProps) => {
  const typedTheme = theme as Theme & { shadows: Shadows };
  const commonStyles = {
    boxShadow: typedTheme.shadows[1],
    color: typedTheme.palette.text.primary,
    borderRadius: typedTheme.shape.borderRadius,
    transition: 'box-shadow 100ms ease-in-out',
  };

  const shadowLevel = props.elevation ? props.elevation : 1;

  return {
    ...commonStyles,
    backgroundColor: typedTheme.palette.background.paper,
    '--text-color': typedTheme.palette.text.primary,
    '--box-shadow': typedTheme.shadows[shadowLevel],
  };
};

// Styled Card component with custom styles applied
const StyledCard = styled(Card, {
  shouldForwardProp: (prop) =>
    prop !== 'dark' &&
    prop !== 'flat' &&
    prop !== 'inset' &&
    prop !== 'rounded' &&
    prop !== 'outlined' &&
    prop !== 'bordered' &&
    prop !== 'elevation',
})<NeuCardProps>(({ theme, ...props }) => ({
  ...getCardStyles(theme as Theme, props),
  outline: 'none',
  padding: '16px',
  userSelect: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'auto',
  boxSizing: 'border-box',
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'var(--box-shadow)',
  color: 'var(--text-color)',
  transition: 'box-shadow 200ms ease-in-out',
  borderRadius: props.rounded ? '24px' : '8px', // Set border radius based on rounded prop
  ...(props.bordered && { border: '1px solid var(--border-color)' }), // Add border if bordered is true
  ...(props.outlined && {
    boxShadow: 'none !important',
    transition: 'none !important',
    border: `1px solid var(--border-color)`,
  }),
  ...(props.flat && { boxShadow: 'none !important' }), // Remove box shadow if flat is true
  ...(props.inset && { boxShadow: 'var(--box-shadow-inset)' }), // Add inset shadow if inset is true
  backgroundImage: 'none !important',
}));

// Wrapper component for content with animation
const ContentWrapper = styled('div')<{ inProp: boolean }>(({ inProp }) => ({
  opacity: inProp ? 1 : 0,
  transition: 'opacity 300ms ease-in-out',
}));

// Custom NeuCard component
const NeuCard: React.FC<NeuCardProps> = (props) => {
  const { in: inProp = true, children, ...rest } = props;

  const animationProps = useSpring({
    transform: inProp ? 'scale(1)' : 'scale(0)',
    opacity: inProp ? 1 : 0,
    config: { tension: 170, friction: 26 },
  });

  return (
    <animated.div style={animationProps}>
      <StyledCard {...rest}>
        <ContentWrapper inProp={inProp}>{children}</ContentWrapper>
      </StyledCard>
    </animated.div>
  );
};

export default NeuCard;
