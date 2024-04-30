
import { Card, CardContent, styled } from '@mui/material';

const StyledCard = styled(Card)({
    position: 'relative',
    borderRadius: 25,
    background: 'linear-gradient(135deg, #cb27d1 0%, #034ceb 100%)',
    transition: 'opacity 0.3s, transform 0.3s ease',
    opacity: 1,
});

const StyledCardContent = styled(CardContent)({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    width: '100%',
    height: '100%',
    borderRadius: 25,
    background: 'var(--body)',
    zIndex: 3,
});

interface CardComponentProps {
    cardHeight?: string;
    cardWidth?: string;
    children: React.ReactNode;

}

    const CardComponent: React.FC<CardComponentProps> = ({ cardHeight, cardWidth, children }) => {
        return (
                    <StyledCard style={{height: cardHeight, width: cardWidth}}>
                        <StyledCardContent>
                            {children}
    </StyledCardContent>
    </StyledCard>
    );
};

export default CardComponent;