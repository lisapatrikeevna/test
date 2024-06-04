import React from 'react';
import {keyframes} from '@mui/system';
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
    '&::before': {
        // background: 'linear-gradient(to bottom right, #e0e0e0, 0%, #eeeeee 100%)',
    },
    '&::after': {
        animationDelay: '.20s',
    },
}));

const AnimatedRipple: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [ripples, setRipples] = React.useState<React.ReactElement[]>([]);

    React.useEffect(() => {
        const handleClick = (ev: MouseEvent) => {
            const rippleElement = (
                <RippleElement
                    key={Date.now()}
                    style={{ top: ev.clientY, left: ev.clientX }}
                    onAnimationEnd={() => setRipples((prev) => prev.filter((ripple) => ripple.key !== rippleElement.key))}
                />
            );
            setRipples((prev) => [...prev, rippleElement]);
        };

        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div>
            {ripples}
            {children}
        </div>
    );
};

export default AnimatedRipple;