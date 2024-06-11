import { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import NeuButton from './neumorphism/button/NeuButton';
import NeuTextField from './neumorphism/input/NeuTextField';

interface CaptchaProps {
    onResult: (result: boolean) => void;
    reset: boolean;
}

const Captcha = ({ onResult, reset }: CaptchaProps) => {
    const [num1, setNum1] = useState(Math.floor(Math.random() * 9) + 1);
    const [num2, setNum2] = useState(Math.floor(Math.random() * 9) + 1);
    const [operator, setOperator] = useState(Math.random() < 0.5 ? '+' : '-');
    const [userAnswer, setUserAnswer] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const [isPassed, setIsPassed] = useState(false);

    useEffect(() => {
        setCorrectAnswer(operator === '+' ? num1 + num2 : num1 - num2);
    }, [num1, num2, operator]);

    useEffect(() => {
        if (reset) {
            setIsPassed(false);
            setNum1(Math.floor(Math.random() * 9) + 1);
            setNum2(Math.floor(Math.random() * 9) + 1);
            setOperator(Math.random() < 0.5 ? '+' : '-');
            setUserAnswer('');
        }
    }, [reset]);

    const checkAnswer = () => {
        if (parseInt(userAnswer) === correctAnswer) {
            onResult(true);
            setIsPassed(true);
        } else {
            onResult(false);
        }
        // Generate new numbers and operator after each check
        setNum1(Math.floor(Math.random() * 9) + 1);
        setNum2(Math.floor(Math.random() * 9) + 1);
        setOperator(Math.random() < 0.5 ? '+' : '-');
        setUserAnswer('');
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Cancel the default Enter action, if needed
            checkAnswer(); // Call the checkAnswer function when the Enter key is pressed
        }
    };

    return (
        <Box>
            {isPassed ? (
                <Typography variant="body1">Passed</Typography>
            ) : (
                <div>
                    <Typography gutterBottom sx={{ mt: 1, ml: 1 }} variant="body1">Answer the question:</Typography>
                    <Typography sx={{ mt: 1, ml: 1 }} gutterBottom variant="body1">{`${num1} ${operator} ${num2} = ?`}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <NeuTextField
                            rounded
                            type="number"
                            value={userAnswer}
                            InputProps={{
                                style: { color: 'var(--text)' }
                            }}
                            InputLabelProps={{
                                style: { color: 'var(--text)' }
                            }}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            onKeyDown={handleKeyDown} // Add the keydown event listener
                        />
                        <NeuButton rounded variant="contained" onClick={checkAnswer}>Check</NeuButton>
                    </Box>
                </div>
            )}
        </Box>
    );
};

export default Captcha;
