import { useState, useEffect, FC } from 'react';
import { Typography } from '@mui/material';

interface RotatingWordsProps {
  words: string[];
  interval?: number;
}

const RotatingWords: FC<RotatingWordsProps> = ({
  words,
  interval = 2000,
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const changeWord = () => {
      setFade(false);
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFade(true);
      }, 500); // Matches half of the animation interval
    };

    const timer = setInterval(changeWord, interval);

    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <Typography
      sx={{
        transition: 'opacity 0.5s ease-in-out',
        opacity: fade ? 1 : 0,
        fontSize: 'inherit',
        fontWeight: 'inherit',
        lineHeight: 'inherit',
      }}
    >
      {words[currentWordIndex]}
    </Typography>
  );
};

export default RotatingWords;
