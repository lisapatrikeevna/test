import { useState } from 'react';
import {
    AppBar, Box, Button, Card, CardActions, CardContent, CardHeader, CssBaseline,
    Grid, Toolbar, Typography, GlobalStyles, Container, Switch, FormControlLabel
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import StarIcon from '@mui/icons-material/StarBorder';
import { styled } from '@mui/system';

// Создаем стилизованный компонент для переопределения стилей контейнера MUI
const CustomContainer = styled(Container)({
    width: '100%',
    margin: '0 auto',
    padding: 0,
});

const tiers = [
    {
        title: 'Free',
        price: 0,
        description: [
            'Unlimited chats',
            'Unlimited contacts',
            'Help center access',
            'Email support',
        ],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
    },
    {
        title: 'Basic',
        price: 15,
        description: [
            '10 Private chats',
            'Unlimited contacts',
            'Help center access',
            'Priority email support',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Prime',
        subheader: 'Most popular',
        price: 15,
        description: [
            '10 Private chats',
            'Unlimited contacts',
            'Help center access',
            'Priority email support',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Business',
        price: 15,
        description: [
            '10 Private chats',
            'Unlimited contacts',
            'Help center access',
            'Priority email support',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Enterprise',
        // price: 30,
        description: [
            '50 users included',
            '30 GB of storage',
            'Help center access',
            'Phone & email support',
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
        return isYearly ? (price * 12 * 0.8).toFixed(2) : price.toFixed(2);
    };

    return (
        <Box>
            <GlobalStyles styles={{
                '.MuiContainer-root': {
                    maxWidth: '1920px !important',
                    maxHeight: '1080px !important',
                },
            }} />
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}>
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        NeoX
                    </Typography>
                    <FormControlLabel
                        control={<Switch checked={isYearly} onChange={toggleYearly} />}
                        label={isYearly ? 'Yearly' : 'Monthly'}
                        sx={{ my: 1, mx: 1.5 }}
                    />
                </Toolbar>
            </AppBar>

            <CustomContainer sx={{ pb: 2 }} maxWidth="xl">
                <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                    Pricing
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" component="p">
                    Quickly build an effective pricing table for your potential customers with
                    this layout. It's built with default MUI components with little
                    customization.
                </Typography>
            </CustomContainer>

            <CustomContainer maxWidth="xl">
                <Grid container spacing={4} alignItems="flex-end" justifyContent={'center'}>
                    {tiers.map((tier) => (
                        <Grid item key={tier.title} xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'Prime' ? <StarIcon /> : null}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', mb: 2 }}>
                                        <Typography component="h2" variant={tier.title==='Enterprise'?"h6":"h3"} color="text.primary">
                                            {tier.price ? `$${calculatePrice(tier.price)}` : tier.title==='Enterprise'?'Contact us':'Free'}
                                        </Typography>
                                        <Typography variant= "h6" color="text.secondary">
                                            {tier.title==='Enterprise'||tier.title==='Free'?'':`${isYearly ? 'yr' : 'mo'}`}
                                        </Typography>
                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography component="li" variant="subtitle1" align="center" key={line}>
                                                {line}
                                            </Typography>
                                        ))}
                                        <Typography component="li" variant="subtitle1" align="center">
                                            <CheckCircleOutlineIcon sx={{ verticalAlign: 'middle' }} /> Feature 1
                                        </Typography>
                                        <Typography component="li" variant="subtitle1" align="center">
                                            <CheckCircleOutlineIcon sx={{ verticalAlign: 'middle' }} /> Feature 2
                                        </Typography>
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Button fullWidth variant={tier.buttonVariant as 'text' | 'outlined' | 'contained'}>
                                        {tier.buttonText}
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </CustomContainer>
        </Box>
    );
};

export default Pricing;
