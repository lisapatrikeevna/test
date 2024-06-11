import React from 'react';
import { keyframes } from '@mui/system';
import { styled } from '@mui/material/styles';

const waves = keyframes({
  from: {
    opacity: 1,
    transform: 'translate(-50%, -50%) scale(1)',
  },
  to: {
    opacity: 0,
    transform: 'translate(-50%, -50%) scale(25)',
  }
});

const RippleElement = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: '25px',
  height: '25px',
  pointerEvents: 'none',
  transform: 'translate(-50%, -50%)',
  zIndex: -2,
  maxWidth: '100vw',
  maxHeight: '100vh',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    opacity: 0,
    left: '50%',
    top: '50%',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: theme.palette.mode === 'dark' ? '7px 7px 14px #1a1a1a, -7px -7px 14px #333333' : '7px 7px 14px #bebebe, -7px -7px 14px #eeeeee',
    animation: `${waves} 4s linear forwards`,
  },
  '&::after': {
    animationDelay: '.20s',
  },
}));

const AnimatedRipple: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ripples, setRipples] = React.useState<React.ReactElement[]>([]);

  const throttle = (func: (ev: MouseEvent) => void, limit: number) => {
    let lastFunc: NodeJS.Timeout;
    let lastRan: number;
    return function (ev: MouseEvent) {
      if (!lastRan) {
        func(ev);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if ((Date.now() - lastRan) >= limit) {
            func(ev);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    }
  };

  React.useEffect(() => {
    const handleClick = throttle((ev: MouseEvent) => {
      const rippleElement = (
          <RippleElement
              key={Date.now()}
              style={{ top: ev.clientY, left: ev.clientX }}
              onAnimationEnd={() => setRipples((prev) => prev.filter((ripple) => ripple.key !== rippleElement.key))}
          />
      );
      setRipples((prev) => [...prev, rippleElement]);
    }, 500); // 200ms delay corresponds to 5 times per second

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        {ripples}
        {children}
      </div>
  );
};

export default AnimatedRipple;