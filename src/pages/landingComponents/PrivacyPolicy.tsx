import { FC } from "react";
import { Box, Typography, Link } from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    height: '100%',
    boxShadow: 'none',
    border: 'none',
}));

const MainList = styled('ol')(({ theme }) => ({
    paddingInlineStart: theme.spacing(3),
    listStyleType: 'none',
    '& > li': {
        marginBottom: theme.spacing(2),
    },
}));

const SubList = styled('ul')(({ theme }) => ({
    paddingInlineStart: theme.spacing(3),
    listStyleType: 'disc',
    '& > li': {
        marginBottom: theme.spacing(1),
    },
}));

const PrivacyPolicy: FC = () => {
    return (
        <StyledBox>
            <Typography align="center">
                <br /><span>Last Updated On 04-Apr-2024</span>
                <br /><span>Effective Date 04-Apr-2024</span>
            </Typography>

            <Typography>
                This Privacy Policy describes the policies of
                IT-Assistent,
                Am Meisenberg 14,
                Nordrhein-Westfalen
                51491,
                Germany,
                email: info@neoxonline.com,
                phone: +491623067782
                on the collection,
                use and disclosure of your information that we collect
                when you use our website ( https://neoxonline.com ).
                (the “Service”). By accessing or using
                the
                Service, you are consenting to the collection, use and
                disclosure of your information in accordance with this
                Privacy Policy. If you do not consent to the same,
                please do not access or use the Service.
            </Typography>

            <Typography align="center">
                We may modify this Privacy Policy at any time without
                any prior notice to you and will post the revised
                Privacy Policy on the Service. The revised Policy will
                be effective 180 days from when the
                revised Policy is posted in the Service and your
                continued access or use of the Service after such time
                will constitute your acceptance of the revised Privacy
                Policy. We therefore recommend that you periodically
                review this page.
            </Typography>

            <MainList>
                <li>
                    <Typography sx={{ fontSize: '2rem' }} align="left">
                        How We Use Your Information:
                    </Typography>
                    <Typography variant="body1" align="left">
                        We will use the information that we collect
                        about you for the following purposes:
                    </Typography>
                    <SubList>
                        <li>Support</li>
                        <li>Administration info</li>
                    </SubList>
                    <Typography variant="body1">
                        If we want to use your information for any other
                        purpose, we will ask you for consent and will
                        use your information only on receiving your
                        consent and then, only for the purpose(s) for
                        which grant consent unless we are required to do
                        otherwise by law.
                    </Typography>
                </li>
                <li>
                    <Typography variant="h2" sx={{ fontSize: '2rem' }} align="left">
                        How We Share Your Information:
                    </Typography>
                    <Typography variant="body1" align="left">
                        We will not transfer your personal information
                        to any third party without seeking your consent,
                        except in limited circumstances as described
                        below:
                    </Typography>
                    <SubList>
                        <li>Analytics</li>
                    </SubList>
                    <Typography variant="body1" align="left">
                        We require such third party’s to use the
                        personal information we transfer to them only
                        for the purpose for which it was transferred and
                        not to retain it for longer than is required for
                        fulfilling the said purpose.
                    </Typography>
                    <Typography variant="body1" align="left">
                        We may also disclose your personal information
                        for the following: (1) to comply with applicable
                        law, regulation, court order or other legal
                        process; (2) to enforce your agreements with us,
                        including this Privacy Policy; or (3) to respond
                        to claims that your use of the Service violates
                        any third-party rights. If the Service or our
                        company is merged or acquired with another
                        company, your information will be one of the
                        assets that is transferred to the new owner.
                    </Typography>
                </li>
                <li>
                    <Typography variant="h2" sx={{ fontSize: '2rem' }}>
                        Your Rights:
                    </Typography>
                    <Typography variant="body1">
                        Depending on the law that applies, you may have
                        a right to access and rectify or erase your
                        personal data or receive a copy of your personal
                        data, restrict or object to the active
                        processing of your data, ask us to share (port)
                        your personal information to another entity,
                        withdraw any consent you provided to us to
                        process your data, a right to lodge a complaint
                        with a statutory authority and such other rights
                        as may be relevant under applicable laws. To
                        exercise these rights, you can write to us at
                        info@neoxonline.com.
                        We will respond to your
                        request in accordance with applicable law.
                    </Typography>
                    <Typography variant="body1">
                        Do note that if you do not allow us to collect
                        or process the required personal information or
                        withdraw the consent to process the same for the
                        required purposes, you may not be able to access
                        or use the services for which your information
                        was sought.
                    </Typography>
                </li>
                <li>
                    <Typography variant="h2" sx={{ fontSize: '2rem' }}>
                        Cookies Etc.
                    </Typography>
                    <Typography variant="body1">
                        To learn more about how we use these
                        and your choices in relation to these tracking
                        technologies, please refer to our
                        <Link href="https://neoxonline.com"> Cookie Policy.</Link>
                    </Typography>
                </li>
                <li>
                    <Typography variant="h2" sx={{ fontSize: '2rem' }}>
                        Security:
                    </Typography>
                    <Typography variant="body1">
                        The security of your information is important to
                        us and we will use reasonable security measures
                        to prevent the loss, misuse or unauthorized
                        alteration of your information under our
                        control. However, given the inherent risks, we
                        cannot guarantee absolute security and
                        consequently, we cannot ensure or warrant the
                        security of any information you transmit to us
                        and you do so at your own risk.
                    </Typography>
                </li>
                <li>
                    <Typography variant="h2" sx={{ fontSize: '2rem' }}>
                        Third Party Links &amp; Use Of Your Information:
                    </Typography>
                    <Typography variant="body1">
                        Our Service may contain links to other websites
                        that are not operated by us. This Privacy Policy
                        does not address the privacy policy and other
                        practices of any third parties, including any
                        third party operating any website or service
                        that may be accessible via a link on the
                        Service. We strongly advise you to review the
                        privacy policy of every site you visit. We have
                        no control over and assume no responsibility for
                        the content, privacy policies or practices of
                        any third party sites or services.
                    </Typography>
                </li>
                <li>
                    <Typography variant="h2" sx={{ fontSize: '2rem' }}>
                        Grievance / Data Protection Officer:
                    </Typography>
                    <Typography variant="body1">
                        If you have any queries or concerns about the
                        processing of your information that is available
                        with us, you may email our Grievance Officer at
                        NeoX,
                        Am Meisenberg 14, 51491 Overath,
                        email: info@neoxonline.com.
                        We will address your concerns in accordance with applicable law.
                    </Typography>
                </li>
            </MainList>
        </StyledBox>
    );
};

export default PrivacyPolicy;
