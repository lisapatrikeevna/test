import { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';

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
            event.preventDefault(); // Отменяем стандартное действие Enter
            checkAnswer(); // Вызываем функцию проверки ответа
        }
    };

    return (
        <Box>
            {isPassed ? (
                <Typography variant="body1">Passed</Typography>
            ) : (
                <>
                    <Typography variant="body1">{`${num1} ${operator} ${num2} = ?`}</Typography>
                    <TextField
                        type="number"
                        value={userAnswer}
                        InputProps={{
                            style: { color: 'var(--text)' }
                        }}
                        InputLabelProps={{
                            style: { color: 'var(--text)' }
                        }}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        onKeyDown={handleKeyDown} // Добавляем обработчик нажатия клавиш

                    />
                    <Button sx={{ color: 'var(--text)', backgroundColor: 'var(--body)' }} variant="contained" onClick={checkAnswer}>Check</Button>
                </>
            )}
        </Box>
    );
};

export default Captcha;
