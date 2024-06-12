import { styled, Theme } from '@mui/material/styles';
import { Instagram, Telegram, YouTube, Facebook, LinkedIn } from '@mui/icons-material';
import ActiveSectionContext from "../../contexts/ActiveSectionContext.tsx";
import { FC, useContext } from "react";
import NeuIconButton from "../../components/neumorphism/button/NeuIconButton";
import NeuButton from '../../components/neumorphism/button/NeuButton.tsx';
import { Grid, Box } from '@mui/material';

const FooterContainer = styled(Box)(({ theme }) => ({
    position: 'fixed',
    bottom: 0,
    width: '100vw',
    height: 'auto',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[1],
    transition: '0.5s',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    color: theme.palette.text.primary,
    padding: theme.spacing(2, 4),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const GridContainer = styled(Grid)(({ theme }) => ({
    width: '100%',
    position: 'relative',
    paddingLeft: theme.spacing(27),
    [theme.breakpoints.down('md')]: {
        paddingLeft: 0,
    },
}));

const Copyright = styled('div')(({ theme }) => ({
    position: 'absolute',
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
    margin: theme.spacing(0.7),
    [theme.breakpoints.down('md')]: {
        marginBottom: theme.spacing(3.5),
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
            <GridContainer container spacing={2} alignItems="center" justifyContent="space-between">
                <Grid item xs={12} md={6} container spacing={2} justifyContent="space-around">
                    <Grid item>
                        <NeuButton rounded onClick={onImpressumClick}>Impressum</NeuButton>
                    </Grid>
                    <Grid item>
                        <NeuButton rounded onClick={onPrivacyPolicyClick}>Privacy</NeuButton>
                    </Grid>
                    <Grid item>
                        <NeuButton rounded onClick={onDatenschutzClick}>Datenschutz</NeuButton>
                    </Grid>
                    <Grid item sx={{ '@media (max-width: 1280px)': { display: 'none' } }}>
                        <NeuButton rounded onClick={contact}>Contact</NeuButton>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} container justifyContent="space-around">
                    <SocialLink href="https://www.instagram.com/neox_online/" target="_blank" rel="noopener noreferrer">
                        <NeuIconButton rounded>
                            <Instagram />
                        </NeuIconButton>
                    </SocialLink>
                    <SocialLink href="https://t.me/neoxonline" target="_blank" rel="noopener noreferrer">
                        <NeuIconButton rounded>
                            <Telegram />
                        </NeuIconButton>
                    </SocialLink>
                    <SocialLink href="https://www.facebook.com/profile.php?id=61557996420950" target="_blank" rel="noopener noreferrer">
                        <NeuIconButton rounded>
                            <Facebook />
                        </NeuIconButton>
                    </SocialLink>
                    <SocialLink href="https://www.linkedin.com/company/103143013/admin/feed/posts/" target="_blank" rel="noopener noreferrer">
                        <NeuIconButton rounded>
                            <LinkedIn />
                        </NeuIconButton>
                    </SocialLink>
                    <SocialLink href="https://www.youtube.com/channel/UC3YWemWS7WPJXReBBKOYfLQ" target="_blank" rel="noopener noreferrer">
                        <NeuIconButton rounded>
                            <YouTube />
                        </NeuIconButton>
                    </SocialLink>
                </Grid>
            </GridContainer>
        </FooterContainer>
    );
};

export default Footer;