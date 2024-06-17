import { useState } from 'react';
import {
    Box, Grid, Toolbar, Typography, Switch, FormControlLabel,
    List, ListItem, ListItemText, Card, CardContent, CardActions,
    Button, CardHeader, Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/StarBorder';

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
        price: 0,
        oldPrice: 0,
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
    const currentTheme = useTheme();
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
        <>
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

            <Typography variant="h5" align="center" color="text.secondary" component="p" mt={'20px'}>
                Limits on gigabytes and chats are set until the end of beta testing. We also welcome your suggestions for changes or additions
            </Typography>

            <Grid container spacing={4} alignItems="flex-end" justifyContent='center' marginY='2vh'>
                {tiers.slice(0, 5).map((tier) => (
                    <Grid item key={tier.title} xs={12} sm={6} md={4} lg={3} xl={2}>
                        <Card variant={"outlined"} sx={{ backgroundColor: currentTheme.palette.background.paper, minHeight: '50vh' }} >
                            <CardHeader
                                title={
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography variant="h6">{tier.title}</Typography>
                                        {tier.title === 'Prime' && <StarIcon sx={{ ml: '5px' }} />}
                                    </Box>}
                                subheader={tier.subheader}
                                sx={{ textAlign: 'center', alignItems: 'flex-end', justifyContent: 'center',
                                    backgroundColor: currentTheme.palette.primary.dark}}
                            />

                            <CardContent>
                                <Typography variant="h6" component="div" sx={{ color: currentTheme.palette.error.main }}>
                                    {(tier.title === 'Free' || tier.title === 'Enterprise') ? <br /> : `€${calculateOldPrice(tier.oldPrice as number)}`}
                                    {(tier.title === 'Free' || tier.title === 'Enterprise') ?
                                        '':
                                        <Box
                                            component="span"
                                            sx={{
                                                position: 'absolute',
                                                width: '60px',
                                                height: '2px',
                                                backgroundColor: currentTheme.palette.error.main,
                                                transform: isYearly ?
                                                    'rotate(-15deg) translate(-60px, -0px)':
                                                    'rotate(-20deg) translate(-60px, -5px)',
                                            }}
                                        />}
                                </Typography>

                                <Box sx={{display: 'flex', flexDirection:'row', alignItems:'flex-end'}}>
                                    {tier.title === 'Enterprise' ? <br /> : <><Typography component="h2" variant="h3" color="text.primary">
                                        {tier.price ? `€${calculatePrice(tier.price)}` : '€0'}
                                    </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            {tier.price ? `${isYearly ? 'yr' : 'mo'}` : ''}
                                        </Typography></>}

                                </Box>

                                <Box height={"auto"}>
                                    <List dense sx={{ fontSize: 14 }}>
                                        {tier.description.map((line) => (
                                            <ListItem key={line} alignItems='flex-start' sx={{ display: 'list-item', padding: 0 }}>
                                                <ListItemText primary={line} sx={{ textAlign: 'left' }} />
                                                <Divider/>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </CardContent>

                            <CardActions>
                                <Button variant='outlined' size='small' color='inherit'>Learn More</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Pricing;
