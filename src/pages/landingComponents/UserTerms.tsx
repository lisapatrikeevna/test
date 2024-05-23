import { FC, useState } from "react";
import { FormControlLabel, Typography, Box, IconButton, Container } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NeuCheckbox from "../../components/neumorphism/checkbox/NeuCheckbox";
import { styled } from "@mui/system";
import NeuButton from "../../components/neumorphism/button/NeuButton";

interface UserTermsProps {
    onClose: () => void;
}

const StyledContainer = styled(Container)(({ theme }) => ({
    scrollBehavior: 'smooth',
    width: '100%',
    maxHeight: '100%',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
    position: 'relative',
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    fontSize: '32px',
}));

const UserTerms: FC<UserTermsProps> = ({ onClose }) => {
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);
    const [isAgeConfirmed, setIsAgeConfirmed] = useState(false);

    return (
        <StyledContainer>
            <Typography variant="h1" style={{ fontSize: 42, fontWeight: "bold", paddingBottom: 10 }}>Terms of Use</Typography>
            <CloseButton onClick={onClose}>
                <CloseIcon />
            </CloseButton>
            <Typography variant="body1">
                <Typography component="span" fontWeight="bold">Intellectual Property:</Typography>
                NeoX respects intellectual property rights and expects the same from its users.
                The platform is not responsible for infringement of intellectual property rights by
                users. In the event of a complaint of infringement, NeoX reserves the right to remove infringing content
                without prior notice.
            </Typography>

            <Typography variant="body1">
                <Typography component="span" fontWeight="bold">Privacy:</Typography> NeoX recognizes the importance of privacy and strives to
                protect users' personal information in accordance with applicable data protection laws. However, the platform cannot
                guarantee the absolute security of information transmitted over the Internet and is not responsible for any
                data leakage caused by a security breach.
            </Typography>

            <Typography variant="body1">
                <Typography component="span" fontWeight="bold">Interactions between users:</Typography> NeoX does not control and is not
                responsible for interactions between users within the platform. All communication, transactions and other forms of interaction
                between users are the responsibility of the participants themselves.
            </Typography>

            <Typography variant="body1">
                <Typography component="span" fontWeight="bold">Changes to Terms of Use:</Typography> NeoX reserves the right to make changes to
                the disclaimers and rules of the platform at any time and without prior notice. Continued use of the platform
                services after such changes are made will be deemed acceptance of the new terms.
            </Typography>

            <Typography variant="body1">
                <Typography component="span" fontWeight="bold">Security Efforts:</Typography> NeoX makes every effort to ensure the reliability and
                security of the platform. However, NeoX is not responsible for the content that users create and post on the
                platform. All users are individually responsible for complying with rules and laws when publishing and
                distributing information, materials and data through the platform's services.
            </Typography>

            <Typography variant="body1">
                <Typography component="span" fontWeight="bold">Responsibility for user-generated content:</Typography> User-generated content
                uploaded to the platform is the sole responsibility of the persons posting it. NeoX does not pre-screen, approve or take
                responsibility for the accuracy, legality, completeness or quality of such content. The use of any
                material or data published on the platform is at the discretion and risk of the users.
            </Typography>

            <Typography variant="body1">
                <Typography component="span" fontWeight="bold">Service Availability:</Typography> NeoX does not guarantee uninterrupted access
                to the platform and its services and is not responsible for any technical interruptions, delays or unavailability of
                services. The Company shall not be liable for any direct or indirect damages, loss of data, damage to
                reputation or other damages arising out of the use or inability to use the services of the platform.
            </Typography>

            <Typography variant="body1">
                <Typography component="span" fontWeight="bold">Compliance with legislation:</Typography> Users are obliged to comply with the
                legislation and rules of the platform when using its services. In case of violation of these obligations, the user is
                fully responsible for possible legal consequences, including, but not limited to, civil, administrative and
                criminal liability.
            </Typography>

            <Typography variant="body1">
                <Typography component="span" fontWeight="bold">Changes in the operation of services:</Typography> NeoX reserves the right to
                modify, suspend or discontinue any of the services of the platform at any time without prior notice. NeoX also has the
                right to remove any content that in its opinion violates the platform rules, legislation or may damage the
                reputation of the platform.
            </Typography>

            <Typography variant="body1">
                <Typography component="span" fontWeight="bold">External Links:</Typography> When using external links hosted on the platform,
                users link to third-party sites at their own risk, and NeoX is not responsible for the content and operation of these
                external resources.
            </Typography>

            <Typography variant="body1">
                <Typography component="span" fontWeight="bold">Jurisdiction and applicable law:</Typography> All disputes arising from the use
                of the NeoX platform shall be resolved in accordance with the laws of NeoX's country of incorporation. Users consent to the
                jurisdiction of the courts of that country for the resolution of any disputes.
            </Typography>

            <Typography variant="body1">
                <Typography component="span" fontWeight="bold">Restriction of Use:</Typography> The NeoX Platform is not intended for use by
                persons under the age of majority under the laws of their country of residence. Users under the age of majority must
                obtain permission from a parent or legal representative to use the platform.
            </Typography>

            <FormControlLabel
                sx={{ m: 1 }}
                control={
                    <NeuCheckbox
                        checked={isTermsAccepted}
                        onChange={(e) => setIsTermsAccepted(e.target.checked)}
                        color="primary"
                        id="terms"
                        name="terms"
                    />
                }
                label={<Box sx={{ marginLeft: 1 }}>I accept the terms of use</Box>}
            />
            <FormControlLabel
                sx={{ m: 1 }}
                control={
                    <NeuCheckbox
                        checked={isAgeConfirmed}
                        onChange={(e) => setIsAgeConfirmed(e.target.checked)}
                        color="primary"
                        id="age"
                        name="age"
                    />
                }
                label={<Box sx={{ marginLeft: 1 }}>I am 18 years of age or older</Box>}
            />
            <NeuButton
                sx={{ m: 1 }}
                rounded
                style={{ width: 120, marginLeft: 150 }}
                onClick={onClose}
                disabled={!isTermsAccepted || !isAgeConfirmed}
            >
                Accept
            </NeuButton>
        </StyledContainer>
    );
};

export default UserTerms;
