import { styled, Theme } from '@mui/material/styles';
import { Instagram, Telegram, YouTube, Facebook, LinkedIn } from '@mui/icons-material';
import ActiveSectionContext from "../../contexts/ActiveSectionContext.tsx";
import { FC, useContext } from "react";
import NeuIconButton from "../../components/neumorphism/button/NeuIconButton"; 
import NeuButton from '../../components/neumorphism/button/NeuButton.tsx';

const FooterContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    bottom: 0,
    paddingRight: '5vw',
    paddingLeft: '20vw',
    width: '100vw',
    height: '6vh',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[1],
    transition: '0.5s',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    '@media (max-width: 1150px)': {
        flexDirection: 'column',
        height: 'auto',
        padding: theme.spacing(2),
    },
}));

const Copyright = styled('div')(({ theme }) => ({
    position: 'absolute',
    '@media (max-width: 1150px)': {
        position: 'relative',
    },
    left: theme.spacing(1),
    bottom: theme.spacing(1),
    fontFamily: theme.typography.fontFamily,
}));

const SocialLink = styled('a')(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    '@media (max-width: 1150px)': {
        margin: theme.spacing(0.5, 0),
    }
}));

const NeuButtonStyled = styled(NeuButton)(({ theme }) => ({
    margin: theme.spacing(1),
    '@media (max-width: 1150px)': {
        margin: theme.spacing(0.5, 0),
    },
}));

interface FooterProps {
    onImpressumClick: () => void;
    onPrivacyPolicyClick: () => void;
    onDatenschutzClick: () => void;
    theme?: Theme;
}

const Footer: FC<FooterProps> = ({ theme, onImpressumClick, onPrivacyPolicyClick, onDatenschutzClick }) => {
    const context = useContext(ActiveSectionContext);

    if (!context) {
        throw new Error("ActiveSectionContext is not provided");
    }

    const { setActiveSection } = context;

    const contact = () => {
        const sectionElement = document.getElementById("Contacts");
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection("Contacts");
    };

    return (
        <FooterContainer theme={theme}>
            <Copyright>&copy; Copyright 2024 NeoXonline</Copyright>
            <NeuButtonStyled rounded onClick={onImpressumClick}>Impressum</NeuButtonStyled>
            <NeuButtonStyled rounded onClick={onPrivacyPolicyClick}>Privacy</NeuButtonStyled>
            <NeuButtonStyled rounded onClick={onDatenschutzClick}>Datenschutz</NeuButtonStyled>
            <NeuButtonStyled rounded onClick={contact}>Contact</NeuButtonStyled>
            <SocialLink href="https://www.instagram.com/neox_online/" target="_blank" rel="noopener noreferrer">
                <NeuIconButton rounded >
                    <Instagram />
                </NeuIconButton>
            </SocialLink>
            <SocialLink href="https://t.me/neoxonline" target="_blank" rel="noopener noreferrer">
                <NeuIconButton rounded >
                    <Telegram />
                </NeuIconButton>
            </SocialLink>
            <SocialLink href="https://www.facebook.com/profile.php?id=61557996420950" target="_blank" rel="noopener noreferrer">
                <NeuIconButton rounded >
                    <Facebook />
                </NeuIconButton>
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/company/103143013/admin/feed/posts/" target="_blank" rel="noopener noreferrer">
                <NeuIconButton rounded >
                    <LinkedIn />
                </NeuIconButton>
            </SocialLink>
            <SocialLink href="https://www.youtube.com/channel/UC3YWemWS7WPJXReBBKOYfLQ" target="_blank" rel="noopener noreferrer">
                <NeuIconButton rounded >
                    <YouTube />
                </NeuIconButton>
            </SocialLink>
        </FooterContainer>
    );
};

export default Footer;
