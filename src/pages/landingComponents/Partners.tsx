import React, { useState, useEffect, useRef, memo } from 'react';
import { Box, Container, Link, Skeleton } from '@mui/material';
import ionosLogo from '../../assets/partners/ionosLogo.jpg';
import Binance from '../../assets/partners/Binance-logo.png';
import Facebook from '../../assets/partners/Facebook-logo.svg';
import Telegram from '../../assets/partners/Telegram_logo.svg';
import LinkedIn from '../../assets/partners/LinkedIn_Logo.svg';
import YouTube from '../../assets/partners/youtube-logo.png';
import Revolute from '../../assets/partners/revolute-logo.png';
import Paypal from '../../assets/partners/Paypal_logo.png';
import JetBrains from '../../assets/partners/JetBrains_logo.svg';
import VSCode from '../../assets/partners/VSCode-logo.png';
import Reactlogo from '../../assets/partners/React-logo.svg';
import Unity from '../../assets/partners/unity-logo.png';

const partners = [
    { logo: ionosLogo, link: 'https://acn.ionos.de/aff_c?offer_id=2&aff_id=7772' },
    { logo: Binance, link: 'https://binance.com/' },
    { logo: Revolute, link: 'https://revolut.com/' },
    { logo: Paypal, link: 'https://paypal.com/' },
    { logo: JetBrains, link: 'https://jetbrains.com/' },
    { logo: VSCode, link: 'https://code.visualstudio.com/' },
    { logo: Reactlogo, link: 'https://react.com/' },
    { logo: Facebook, link: 'https://facebook.com/' },
    { logo: Telegram, link: 'https://web.telegram.org/' },
    { logo: LinkedIn, link: 'https://linkedin.com/' },
    { logo: YouTube, link: 'https://youtube.com/' },
    { logo: Unity, link: 'https://unity.com/' },
];

const Partners: React.FC = memo(() => {
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (scrollRef.current && containerRef.current) {
            const container = scrollRef.current;
            const handleScroll = () => {
                const children = container.children;
                const screenCenter = window.innerWidth / 2;

                Array.from(children).forEach((child: Element) => {
                    const rect = child.getBoundingClientRect();
                    const childCenter = rect.left + rect.width / 2;
                    const distanceFromCenter = Math.abs(screenCenter - childCenter);
                    const maxDistance = screenCenter;
                    const scale = Math.max(0.3, 0.95 - distanceFromCenter / maxDistance);
                    const opacity = Math.max(0 , 1 - (distanceFromCenter-100) / (maxDistance/2));
                    (child as HTMLElement).style.transform = `scale(${scale})`;
                    (child as HTMLElement).style.opacity = `${opacity}`;
                });
            };

            const animationInterval = setInterval(() => {
                if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                    container.scrollLeft = 0;
                } else {
                    container.scrollLeft += 1;
                }
                handleScroll();
            }, 20);

            handleScroll(); // Initialize on mount

            return () => clearInterval(animationInterval);
        }
    }, []);

    return (
        <Container
            sx={{
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
            }}
            ref={containerRef}
        >
            <Box
                ref={scrollRef}
                sx={{
                    display: 'flex',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    willChange: 'transform',
                }}
            >
                {[...partners, ...partners].map((partner, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'inline-block',
                            padding: '0 20px',
                            transition: 'transform 0.3s, opacity 0.3s',
                        }}
                    >
                        <Link href={partner.link} target="_blank" rel="noopener noreferrer" underline="none">
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100px',
                                    height: '100px',
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    boxShadow: 3,
                                }}
                            >
                                {loading ? (
                                    <Skeleton variant="rectangular" height={80} width={80} sx={{ borderRadius: '10px' }} />
                                ) : (
                                    <Box
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            backgroundImage: `url(${partner.logo})`,
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                        }}
                                    />
                                )}
                            </Box>
                        </Link>
                    </Box>
                ))}
            </Box>
        </Container>
    );
});

export default Partners;
