import { useState } from 'react';
import {
    Box, Grid, Toolbar, Typography, Switch, FormControlLabel,
    List, ListItem, ListItemText, Card, CardContent, CardActions,
    Button, CardHeader, Divider
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/StarBorder';

interface Tier {
    title: string;
    subheader: string;
    price: number;
    oldPrice?: number;
    description: string[];
    buttonText: string;
    buttonVariant: 'text' | 'outlined' | 'contained';
    buttonAction: () => void;
}

const tiers: Tier[] = [
    {
        title: 'Free',
        subheader: '',
        price: 0,
        description: [
            'Access to chats.',
            'Access to videos.',
            'Access to conferences.',
        ],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
        buttonAction: () => { console.log('Free tier selected'); } // todo add link registration
    },
    {
        title: 'Donate Us',
        subheader: '',
        price: 0,
        oldPrice: 0,
        description: [
            'Each user can select the features that suit them best, tailored to their individual needs.'
        ],
        buttonText: 'Donate',
        buttonVariant: 'outlined',
        buttonAction: () => window.open('https://checkout.revolut.com/payment-link/27a3d78a-db95-4d93-b2be-06b72488adb8', '_blank')
    },
    {
        title: 'Basic',
        subheader: '',
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
        buttonVariant: 'contained',
        buttonAction: () => { console.log('Basic tier selected'); } // todo add link registration
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
        buttonVariant: 'contained',
        buttonAction: () => { console.log('Prime tier selected'); } // todo add link registration
    },
    {
        title: 'Business',
        subheader: '',
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
        buttonVariant: 'contained',
        buttonAction: () => { console.log('Business tier selected'); } // todo add link registration
    },
    {
        title: 'Enterprise',
        subheader: '',
        price: 0,
        oldPrice: 0,
        description: [
            'Contact us to arrange all the functionality you need.'
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
        buttonAction: () => { console.log('Enterprise tier selected'); } // todo add link registration
    },
    {
        title: 'Custom',
        subheader: '',
        price: 0,
        oldPrice: 0,
        description: [
            'Each user can select the features that suit them best, tailored to their individual needs.'
        ],
        buttonText: 'Constructor',
        buttonVariant: 'outlined',
        buttonAction: () => { console.log('Custom tier selected'); } // todo add link registration
    },
];

const Pricing = () => {
    const theme = useTheme();
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
        <Box
            id="Pricing"
            sx={{
                display: 'flex',
                overflowY: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
            <Toolbar sx={{ flexWrap: 'wrap' }}>
                <Typography variant="h4" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    Select a payment period:
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

            <Grid container spacing={4} alignItems="stretch" justifyContent='center' marginY='2vh'>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
                    <Grid container spacing={4} flexDirection={'column'}>
                        {tiers.slice(0, 2).map((tier) => (
                            <Grid item key={tier.title}>
                                <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', backgroundColor: theme.palette.background.paper }}>
                                    <CardHeader
                                        title={
                                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                                <Typography variant="h6">{tier.title}</Typography>
                                                {tier.title === 'Prime' && <StarIcon sx={{ ml: '5px' }} />}
                                            </Box>}

                                        sx={{ textAlign: 'center', alignItems: 'flex-end', justifyContent: 'center',
                                            backgroundColor: theme.palette.primary.dark}}/>

                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography variant="h6" component="div" sx={{ color: theme.palette.error.main }}>
                                            {(tier.title === 'Free' || tier.title === 'Enterprise'|| tier.title === 'Donate Us') ? <br /> : `€${calculateOldPrice(tier.oldPrice as number)}`}
                                            {(tier.title === 'Free' || tier.title === 'Enterprise'|| tier.title === 'Donate Us') ?
                                                '':
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        position: 'absolute',
                                                        width: '60px',
                                                        height: '2px',
                                                        backgroundColor: theme.palette.error.main,
                                                        transform: isYearly ?
                                                            'rotate(-15deg) translate(-60px, -0px)':
                                                            'rotate(-20deg) translate(-60px, -5px)',
                                                    }}
                                                />}
                                        </Typography>

                                        <Box sx={{display: 'flex', flexDirection:'row', alignItems:'flex-end'}}>
                                            {tier.title === 'Enterprise'|| tier.title === 'Donate Us' ? <br /> : <><Typography component="h2" variant="h3" color="text.primary">
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

                                    <CardActions sx={{ mt: 'auto' }} onClick={tier.buttonAction}>
                                        <Button variant='outlined' size='small' color='inherit'>{tier.buttonText}</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {tiers.slice(2, 5).map((tier) => (
                    <Grid item key={tier.title} xs={12} sm={6} md={4} lg={4} xl={2}>
                        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', backgroundColor: theme.palette.background.paper }}>
                            <CardHeader
                                title={
                                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                        <Typography variant="h6">{tier.title}</Typography>
                                        {tier.title === 'Prime' && <StarIcon sx={{ ml: '5px' }} />}
                                    </Box>}
                                // subheader={tier.subheader}
                                sx={{ textAlign: 'center', alignItems: 'flex-end', justifyContent: 'center',
                                    backgroundColor: theme.palette.primary.dark}}
                            />

                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography variant="h6" component="div" sx={{ color: theme.palette.error.main, textDecoration: 'line-through' }}>
                                    {(tier.title === 'Free' || tier.title === 'Enterprise') ? <br /> : `€${calculateOldPrice(tier.oldPrice as number)}`}
                                    {(tier.title === 'Free' || tier.title === 'Enterprise') ?
                                        '': ''
                                        // todo fix visual alternative diagonal line line-through
                                        /*<Box
                                            component="span"
                                            sx={{
                                                position: 'absolute',
                                                width: '60px',
                                                height: '2px',
                                                backgroundColor: theme.palette.error.main,
                                                transform: isYearly ?
                                                    'rotate(-15deg) translate(-60px, -0px)':
                                                    'rotate(-20deg) translate(-60px, -5px)',
                                            }}
                                        />*/}
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

                            <CardActions sx={{ mt: 'auto' }} onClick={tier.buttonAction}>
                                <Button variant='outlined' size='small' color='inherit'>{tier.buttonText}</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}

                <Grid item xs={12} sm={12} md={4} lg={4} xl={2}>
                    <Grid container spacing={4} flexDirection={'column'}>
                        {tiers.slice(5, 7).map((tier) => (
                            <Grid item key={tier.title}>
                                <Card variant="outlined" sx={{ minHeight: '10vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', backgroundColor: theme.palette.background.paper }}>
                                    <CardHeader
                                        title={
                                            <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                                <Typography variant="h6">{tier.title}</Typography>
                                                {tier.title === 'Prime' && <StarIcon sx={{ ml: '5px' }} />}
                                            </Box>}
                                        // subheader={tier.subheader}
                                        sx={{ textAlign: 'center', alignItems: 'flex-end', justifyContent: 'center',
                                            backgroundColor: theme.palette.primary.dark}}
                                    />

                                    <CardContent sx={{ flex: '1 0 auto' }}>
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

                                    <CardActions sx={{ mt: 'auto' }} onClick={tier.buttonAction}>
                                        <Button variant='outlined' size='small' color='inherit'>{tier.buttonText}</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Pricing;