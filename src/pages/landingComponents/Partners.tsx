import React, { useState, useEffect, useRef, memo } from 'react';
import { Box, Container, Skeleton, Link, Grid } from '@mui/material';
import NeuCard from '../../components/neumorphism/card/NeuCard';
import NeuCardContent from '../../components/neumorphism/card/NeuCardContent';
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
// import Netflix from '../../assets/partners/Netflix-Logo.png';
import useOnScreen from "../../components/hooks/useOnScreen";

const partners = [
  { logo: ionosLogo, link: 'https://acn.ionos.de/aff_c?offer_id=2&aff_id=7772' },
  { logo: Binance, link: 'https://binance.com/' },
  { logo: Revolute, link: 'https://revolut.com/' },
  { logo: Paypal, link: 'https://paypal.com/' },
  { logo: JetBrains, link: 'https://jetbrains.com/' },
  { logo: VSCode, link: 'https://https://code.visualstudio.com/' },
  { logo: Reactlogo, link: 'https://react.com/' },
  { logo: Facebook, link: 'https://facebook.com/' },
  { logo: Telegram, link: 'https://web.telegram.org/' },
  { logo: LinkedIn, link: 'https://linkedin.com/' },
  { logo: YouTube, link: 'https://youtube.com/' },
  { logo: Unity, link: 'https://unity.com/' },
  // { logo: Netflix, link: 'https://netflix.com/' },
];

const Partners: React.FC = memo(() => {
  const [loading, setLoading] = useState(true);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(containerRef);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let timer: number | undefined;

    if (isVisible && visibleCards.length < partners.length) {
      timer = window.setTimeout(() => {
        setVisibleCards((prev) => [...prev, prev.length]);
      }, 150);
    } else if (!isVisible && visibleCards.length !== 0) {
      setVisibleCards([]);
    }

    return () => clearTimeout(timer);
  }, [isVisible, visibleCards.length]);

  return (
      <Container sx={{ zIndex:'100', padding: '15px 0px 15px', maxHeight: 'calc(100vh - 200px)', overflowY: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} ref={containerRef}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          {/* <Typography variant="h4">Partners</Typography> */}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%'}}>
          <Grid container spacing={4} justifyContent="center">
            {partners.map((partner, index) => (
                <Grid item xs={12} sm={6} md={3} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box sx={{ padding: '13px', boxSizing: 'border-box', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    {loading ? (
                        <Skeleton variant="rectangular" height={130} sx={{ borderRadius: '10px', width: '100%' }} />
                    ) : (
                        <Link href={partner.link} target="_blank" rel="noopener noreferrer" underline="none">
                          <NeuCard
                              in={visibleCards.includes(index)}
                              elevation={3}
                              rounded
                              sx={{ borderRadius: '10px', width: '100%' }}
                          >
                            <NeuCardContent>
                              <Box display="flex" alignItems="center" sx={{ backgroundColor: 'transparent', width: '100%' }}>
                                <Box
                                    sx={{
                                      width: 80,
                                      height: 80,
                                      backgroundImage: `url(${partner.logo})`,
                                      backgroundSize: 'contain',
                                      backgroundRepeat: 'no-repeat',
                                      backgroundPosition: 'center'
                                    }}
                                />
                              </Box>
                            </NeuCardContent>
                          </NeuCard>
                        </Link>
                    )}
                  </Box>
                </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
  );
});

export default Partners;
