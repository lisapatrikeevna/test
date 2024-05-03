import { Card, CardContent, styled, Theme } from '@mui/material';


const StyledCard = styled(Card)(({ theme }) => ({
    position: 'relative',
    background: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[5],
    overflowY: 'auto',

}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    background: theme.palette.background.default,
    zIndex: 3,
    flexDirection: "column",
    overflowY: 'auto',

}));

interface CardComponentProps {
    cardHeight?: string;
    cardWidth?: string;
    children: React.ReactNode;
    theme?: Theme; // Corrected theme type
}

const CardComponent: React.FC<CardComponentProps> = ({ cardHeight, cardWidth, children, theme }) => {
    return (
        <StyledCard style={{ height: cardHeight, width: cardWidth }}>
            <StyledCardContent theme={theme}>
                {children}
            </StyledCardContent>
        </StyledCard>
    );
};

export default CardComponent;