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
import NeuButton from '../../components/neumorphism/button/NeuButton';

const CustomContainer = styled(Container)({
    width: '100%',
    margin: '0 auto',
});

const ScrollableContainer = styled(Box)({
    width: '100%',
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 400px)', 
    paddingTop: '10px',
    paddingBottom: '10px'
});

const tiers = [
    {
        title: 'Free',
        price: 0,
        description: [],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
    },
    {
        title: 'Basic',
        price: 11.99,
        oldPrice: 17.99,
        description: [
            'Access to chats.',
            'Access to videos.',
            'Access to conferences.',
            'Access to calendar.',
            'Access to notes.'
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Prime',
        subheader: 'Most popular',
        price: 21.99,
        oldPrice: 27.99,
        description: [
            'Access to interactive board.',
            'Ability to create 5 private groups.',
            'Possibility to post 10 videos.',
            'Ability to start a group conference for 1 hour.',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Business',
        price: 31.99,
        oldPrice: 41.99,
        description: [
            'Access to interactive board.',
            'Ability to create 5 private groups.',
            'Possibility to post 10 videos.',
            'Ability to start a group conference for 1 hour.',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Enterprise',
        description: [
            'Contact us to arrange all the functionality you need.'
        ],
        buttonText: 'Contact us',
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
                {/* <Typography component="h1" variant="h2" align="center" color="text.primary">
                    Pricing
                </Typography> */}
                <Typography variant="h5" align="center" color="text.secondary" component="p" mt={'20px'}>
                    Since the platform is at the development stage, this list of features and prices may change.
                </Typography>
            </CustomContainer>

            <ScrollableContainer>
                <CustomContainer className="Pricing-container" maxWidth="xl">
                    <Grid container spacing={4} alignItems="flex-end" justifyContent={'center'}>
                        {tiers.map((tier) => (
                            <Grid item key={tier.title} xs={12} sm={6} md={4} lg={3} xl={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <NeuCard sx={{ width: 300, height: tier.title === 'Prime' ? '540px' : '500px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <NeuCardHeader
                                        title={tier.title}
                                        avatar={tier.title === 'Prime' ? <StarIcon /> : null}
                                        subtitle={tier.subheader}
                                    />
                                    <NeuCardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                                        {tier.oldPrice && (
                                            <Typography component="span" variant="subtitle1" color="text.secondary" sx={{ textDecoration: 'line-through', fontSize: '1.25rem' }}>
                                                {`$${calculateOldPrice(tier.oldPrice)}`}
                                            </Typography>
                                        )}
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 2 }}>
                                            <Typography component="h2" variant={tier.title === 'Enterprise' ? "h6" : "h3"} color="text.primary">
                                                {tier.price ? `$${calculatePrice(tier.price)}` : tier.title === 'Enterprise' ? 'Contact us' : 'Free'}
                                            </Typography>
                                            <Typography variant="h6" color="text.secondary">
                                                {tier.title === 'Enterprise' || tier.title === 'Free' ? '' : `${isYearly ? 'yr' : 'mo'}`}
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
                                    <NeuCardAction>
                                        <NeuButton fullWidth rounded variant={tier.buttonVariant as 'text' | 'outlined' | 'contained'}>
                                            {tier.buttonText}
                                        </NeuButton>
                                    </NeuCardAction>
                                </NeuCard>
                            </Grid>
                        ))}
                    </Grid>
                </CustomContainer>
            </ScrollableContainer>
        </Box>
    );
};

export default Pricing;
