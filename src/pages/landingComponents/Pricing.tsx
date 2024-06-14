import { useState } from 'react';
import {
    AppBar, Box, Grid, Toolbar, Typography, GlobalStyles, Container, Switch, FormControlLabel,
    CssBaseline, List, ListItem, ListItemText
} from '@mui/material';
import StarIcon from '@mui/icons-material/StarBorder';
import { styled } from '@mui/system';
import NeuCard from '../../components/neumorphism/card/NeuCard';
import NeuCardHeader from '../../components/neumorphism/card/NeuCardHeader';
import NeuCardContent from '../../components/neumorphism/card/NeuCardContent';
import NeuCardAction from '../../components/neumorphism/card/NeuCardAction';
import NeuButton from '../../components/neumorphism/button/NeuButton'; // Импорт NeuButton

const CustomContainer = styled(Container)({
    width: '100%',
    margin: '0 auto',
});

const ScrollableContainer = styled(Box)({
    width: '100%',
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 275px)', 
    paddingTop: '10px',
    paddingBottom: '10px'
});

const tiers = [
    {
        title: 'Free',
        price: 0,
        description: [
            'Access to chats.',
            'Access to videos.',
            'Access to conferences.',
            'Access to calendar.',
            'Access to notes.'
        ],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
    },
    {
        title: 'Basic',
        price: 11.99,
        oldPrice: 17.99,
        description: [
            'All in Free +',
            'Access to interactive board.',
            'Ability to create 5 private groups.',
            'Possibility to post 15 GB of video content.',
            'Ability to start a group conference.'
        ],
        buttonText: 'Get started',
        buttonVariant: '',
    },
    {
        title: 'Prime',
        subheader: 'Most popular',
        price: 21.99,
        oldPrice: 27.99,
        description: [
            'All in Free +',
            'Access to interactive board.',
            'Ability to create 10 private groups.',
            'Possibility to post 30 GB of video content.',
            'Ability to start a group conference.',
        ],
        buttonText: 'Get started',
        buttonVariant: '',
    },
    {
        title: 'Business',
        price: 31.99,
        oldPrice: 41.99,
        description: [
            'All in Free +',
            'Access to interactive board.',
            'Ability to create an unlimited number of private groups.',
            'Possibility to post 50 GB of video content.',
            'Ability to start a group conference.',
        ],
        buttonText: 'Get started',
        buttonVariant: '',
    },
    {
        title: 'Enterprise',
        description: [
            'Contact us to arrange all the functionality you need.'
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
    },
    {
        title: 'Custom',
        description: [
            'Each user can select the features that suit them best, tailored to their individual needs.'
        ],
        buttonText: 'Constructor',
        buttonVariant: 'outlined',
    },
];

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(false);

    const toggleYearly = () => {
        setIsYearly(!isYearly);
    };

    const calculatePrice = (price: number) => {
        if (isYearly) {
            const yearlyPrice = price * 12 * 0.8;
            return (Math.floor(yearlyPrice) + 0.99).toFixed(2);
        }
        return price.toFixed(2);
    };

    const calculateOldPrice = (price: number) => {
        if (isYearly) {
            const yearlyOldPrice = price * 12;
            return (Math.floor(yearlyOldPrice) + 0.99).toFixed(2);
        }
        return price.toFixed(2);
    };

    return (
        <Box>
            <GlobalStyles styles={{
                '.MuiContainer-root.Pricing-container': {
                    maxWidth: '1920px !important',
                    maxHeight: '1080px !important',
                }
            }} />
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        NeoXonline pricing
                    </Typography>
                    <FormControlLabel
                        control={<Switch checked={isYearly} onChange={toggleYearly} />}
                        label={isYearly ? 'Yearly' : 'Monthly'}
                        sx={{ my: 1, mx: 1.5 }}
                    />
                </Toolbar>
            </AppBar>

            <CustomContainer className="Pricing-container" sx={{ pb: 2 }} maxWidth="xl">
                <Typography variant="h5" align="center" color="text.secondary" component="p" mt={'20px'}>
                    Limits on gigabytes and chats are set until the end of beta testing. We also welcome your suggestions for changes or additions
                </Typography>
            </CustomContainer>

            <ScrollableContainer>
                <CustomContainer className="Pricing-container" maxWidth="xl">
                    <Grid container spacing={4} alignItems="flex-end" justifyContent={'center'}>
                        {tiers.slice(0, 4).map((tier) => (
                            <Grid item key={tier.title} xs={12} sm={6} md={4} lg={3} xl={2}>
                                <NeuCard sx={{ height: tier.title === 'Prime' ? '585px' : '570px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <NeuCardHeader
                                        title={tier.title}
                                        avatar={tier.title === 'Prime' ? <StarIcon sx={{ ml: '5px' }}/> : null}
                                        subtitle={tier.subheader}
                                        sx={{ textAlign: 'center', alignItems: 'center', justifyContent: tier.title === 'Prime' ? '' : 'center' }}
                                    />
                                    <NeuCardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1, p: 1 }}>
                                        {tier.oldPrice && (
                                            <Typography component="span" variant="subtitle1" color="text.secondary" sx={{ position: 'relative', textDecoration: 'none', fontSize: '1.25rem' }}>
                                                {`€${calculateOldPrice(tier.oldPrice)}`}
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        position: 'absolute',
                                                        left: 0,
                                                        bottom: '10%',
                                                        width: '100%',
                                                        height: '1px',
                                                        bgcolor: 'text.secondary',
                                                        transform: 'rotate(-30deg)',
                                                        transformOrigin: 'left bottom',
                                                    }}
                                                />
                                            </Typography>
                                        )}
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 1 }}>
                                            <Typography component="h2" variant="h3" color="text.primary">
                                                {tier.price ? `€${calculatePrice(tier.price)}` : 'Free'}
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary">
                                                {tier.price ? `${isYearly ? 'yr' : 'mo'}` : ''}
                                            </Typography>
                                        </Box>
                                        <List sx={{ width: '190px', padding: 0, listStyleType: 'disc', paddingLeft: '15px' }}>
                                            {tier.description.map((line) => (
                                                <ListItem key={line} sx={{ display: 'list-item', padding: 0 }}>
                                                    <ListItemText primary={line} sx={{ textAlign: 'left' }} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </NeuCardContent>
                                    <NeuCardAction sx={{ p: 1 }}>
                                        <NeuButton fullWidth rounded variant={tier.buttonVariant as 'text' | 'outlined' | 'contained'}>
                                            {tier.buttonText}
                                        </NeuButton>
                                    </NeuCardAction>
                                </NeuCard>
                            </Grid>
                        ))}
                        <Grid item container direction="column" spacing={4} xs={12} sm={6} md={4} lg={3} xl={2}>
                            {tiers.slice(4).map((tier) => (
                                <Grid item key={tier.title}>
                                    <NeuCard sx={{ height: '270px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <NeuCardHeader
                                            title={tier.title}
                                            sx={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}
                                        />
                                        <NeuCardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1, p: 1 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 1 }}>
                                                <Typography component="h2" variant="h6" color="text.primary">
                                                    {tier.title === 'Custom' ? '' : 'Contact us'}
                                                </Typography>
                                            </Box>
                                            <List sx={{ width: '190px', padding: 0, listStyleType: 'disc', paddingLeft: '15px' }}>
                                                {tier.description.map((line) => (
                                                    <ListItem key={line} sx={{ display: 'list-item', padding: 0 }}>
                                                        <ListItemText primary={line} sx={{ textAlign: 'left' }} />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </NeuCardContent>
                                        <NeuCardAction sx={{ p: 1 }}>
                                            <NeuButton fullWidth rounded variant={tier.buttonVariant as 'text' | 'outlined' | 'contained'}>
                                                {tier.buttonText}
                                            </NeuButton>
                                        </NeuCardAction>
                                    </NeuCard>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </CustomContainer>
            </ScrollableContainer>
        </Box>
    );
};

export default Pricing;
