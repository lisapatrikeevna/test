import React from 'react';
import { Card, CardProps } from '@mui/material';
import { styled } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { Shadows } from '../../../types/types';

interface NeuCardProps extends CardProps {
  dark?: boolean;
  flat?: boolean;
  inset?: boolean;
  rounded?: boolean;
  outlined?: boolean;
  bordered?: boolean;
  elevation?: number;
}

const getCardStyles = (theme: Theme, props: NeuCardProps) => {
  const typedTheme = theme as Theme & { shadows: Shadows };
  const commonStyles = {
    boxShadow: typedTheme.shadows[1],
    color: typedTheme.palette.text.primary,
    borderRadius: typedTheme.shape.borderRadius,
    transition: 'box-shadow 200ms ease-in-out',
  };

  const shadowLevel = props.elevation ? props.elevation : 1;

  return {
    ...commonStyles,
    backgroundColor: typedTheme.palette.background.paper,
    '--text-color': typedTheme.palette.text.primary,
    '--box-shadow': typedTheme.shadows[shadowLevel],
  };
};

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
  borderRadius: props.rounded ? '24px' : '8px',
  ...(props.bordered && { border: '1px solid var(--border-color)' }),
  ...(props.outlined && {
    boxShadow: 'none !important',
    transition: 'none !important',
    border: `1px solid var(--border-color)`,
  }),
  ...(props.flat && { boxShadow: 'none !important' }),
  ...(props.inset && { boxShadow: 'var(--box-shadow-inset)' }),
  backgroundImage: 'none !important',
}));

const NeuCard: React.FC<NeuCardProps> = (props) => {
  return <StyledCard {...props} />;
};

export default NeuCard;
