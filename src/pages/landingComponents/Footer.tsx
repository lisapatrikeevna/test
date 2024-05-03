import { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { logoInstagram, paperPlane, logoYoutube, logoFacebook, logoLinkedin } from 'ionicons/icons';
import { IonIcon } from "@ionic/react";
import ActiveSectionContext from '../../contexts/ActiveSectionContext.tsx';
import {Theme} from "../../theme.tsx";


const useStyles = makeStyles((theme: Theme) => ({
    footer: {
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
        boxShadow: `0 -10px 10px ${theme.palette.mode === 'light' ? theme.shadows[2] : theme.shadows[5]}`,
        transition: '0.5s',
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius,
        color: theme.palette.text.primary,
    },
    copyright: {
        position: 'absolute',
        left: theme.spacing(1),
        bottom: theme.spacing(1),
        fontFamily: theme.typography.fontFamily,
    },
    socialLink: {
        color: theme.palette.primary.main,
    },
}));

interface FooterProps {
    onImpressumClick: () => void;
    onPrivacyPolicyClick: () => void;
    onDatenschutzClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onImpressumClick, onPrivacyPolicyClick, onDatenschutzClick }) => {
    const classes = useStyles();
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
        <div className={classes.footer}>
            <Typography variant="body2">&copy; Copyright 2024 NeoX</Typography>
            <div onClick={onImpressumClick}>Impressum</div>
            <div onClick={onPrivacyPolicyClick}>Privacy</div>
            <div onClick={onDatenschutzClick}>Datenschutz</div>
            <div onClick={contact}>Contact</div>
            <a className={classes.socialLink} href="https://www.instagram.com/neox_online/" target="_blank" rel="noopener noreferrer">
                <IonIcon icon={logoInstagram} />
            </a>
            <a className={classes.socialLink} href="https://t.me/neoxonline" target="_blank" rel="noopener noreferrer">
                <IonIcon icon={paperPlane} />
            </a>
            <a className={classes.socialLink} href="https://www.facebook.com/profile.php?id=61557996420950" target="_blank" rel="noopener noreferrer">
                <IonIcon icon={logoFacebook} />
            </a>
            <a className={classes.socialLink} href="https://www.linkedin.com/company/103143013/admin/feed/posts/" target="_blank" rel="noopener noreferrer">
                <IonIcon icon={logoLinkedin} />
            </a>
            <a className={classes.socialLink} href="https://www.youtube.com/channel/UC3YWemWS7WPJXReBBKOYfLQ" target="_blank" rel="noopener noreferrer">
                <IonIcon icon={logoYoutube} />
            </a>
        </div>
    );
};

export default Footer;
