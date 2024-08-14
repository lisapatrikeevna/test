import React, {useEffect, useRef} from "react";
import {
    Button,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Step,
    StepButton,
    StepContent,
    Stepper,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { Box } from "@mui/system";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const steps = [
    {
        label: 'Always connected and easy to manage',

        title_teacher: `For teachers and schools:`,

        description_teacher_1: `Always stay connected with your students and customers. 
        Our platform allows you to stay connected anytime, anywhere, 
        allowing for seamless collaboration.`,

        description_teacher_2: `Simplified management of subscriptions and access to content, 
        making it easy and efficient to interact with customers.`,

        title_student: `For students:`,
        description_student_1: `Convenient access to learning materials and the ability to 
        The ability to communicate with instructors at any time.`,

        description_student_2: `Integrated tools for participating in webinars 
        and communicating with instructors, making training more flexible and accessible.`,

        imgPath: 'https://via.placeholder.com/600'
    },
    {
        label: 'Complete Toolkit for Online Learning',

        title_teacher: 'For teachers and schools:',

        description_teacher_1: `All the tools you need to teach 
        All the tools you need to teach classes and sell courses in one place. 
        Easily manage groups, host webinars and upload videos.`,

        description_teacher_2: `The ability to record and reuse 
        webinars, which saves you time and effort.`,

        title_student: 'For students:',
        description_student_1: `All the features for learning and communication in one place.
        Easily search and browse educational videos, as well as the ability to 
        Artificial intelligence to select courses.`,

        description_student_2: `Interactive whiteboards for more effective 
        The ability to share your notes and recordings with other students.`,

        imgPath: 'https://via.placeholder.com/600'
    },
    {
        label: 'Planning and Support',

        title_teacher: 'For teachers and schools:',

        description_teacher_1: `All the tools for planning 
        educational events and schedule management in one platform.
        Easy to create and manage schedules.`,

        description_teacher_2: `Platform support for all your 
        needs so you can focus on learning rather than technical issues.`,

        title_student: 'For students:',

        description_student_1: `Convenient tools for planning 
        learning process. Ability to add notes and reminders, 
        so you don't miss important events and deadlines.`,

        description_student_2: `Ease of access to the videos and 
        The ability to share videos with different groups and students.`,

        imgPath: 'https://via.placeholder.com/600'
    },
    {
        label: 'Management and Analytics',

        title_teacher: 'For teachers and schools:',

        description_teacher_1: `Convenient student management and 
        Effective tools for course promotion.
        Analytics and statistics to improve marketing.`,

        description_teacher_2: `Personalized recommendations based 
        personalized recommendations based on students' interests and goals, which helps them choose the 
        the most appropriate courses.`,

        title_student: 'For students:',

        description_student_1: `Artificial intelligence helps you 
        quickly find and select the right courses. Personalized 
        personalized recommendations make the learning process more focused and effective.`,

        description_student_2: `Ability to record webinars for 
        The ability to record webinars for later viewing and effective participation in webinars.`,

        imgPath: 'https://via.placeholder.com/600'
    }
];

const AboutUsPage = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const stepContentRef = useRef<HTMLElement>(null);

    const totalSteps = () => steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    useEffect(() => {
        if (stepContentRef.current) {
            const yOffset = (!isSmallScreen?-110:-90+(activeStep*60)); // высота заголовка или отступ сверху
            const y = stepContentRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }, [activeStep]);

    return (
        <Box
            id="AboutUs"
            sx={{
            width: '100%',
            paddingRight:{
            xs: theme.spacing(0),
            sm: theme.spacing(5),
            lg: theme.spacing(10),
            xl: theme.spacing(15),
        },
            paddingLeft:{
            xs: theme.spacing(0),
            sm: theme.spacing(5),
            lg: theme.spacing(10),
            xl: theme.spacing(15),
        },
            marginBottom: {
            xs: theme.spacing(10),
            }
        }}  ref={stepContentRef}>
            {isSmallScreen ? (
                <>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepButton color="inherit" onClick={handleStep(index)}>
                                    {step.label}
                                </StepButton>
                                <StepContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <Grid container direction={'column'} gap={1}>
                                            <Grid item xs={12} md={5}>
                                                <img src={step.imgPath} alt={step.label}
                                                     style={{marginRight: theme.spacing(2), maxWidth:'100%'}}/>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <List
                                                    subheader={
                                                        <Typography variant={'h4'}>
                                                            {step.title_teacher}
                                                            {<Divider />}
                                                        </Typography>
                                                    }
                                                    sx={{marginTop: theme.spacing(4)}}>
                                                    <ListItem alignItems={'flex-start'} sx={{paddingLeft: 0}}>
                                                        <ListItemIcon sx={{minWidth: '40px'}}>
                                                            <CheckBoxIcon fontSize={'small'}/>
                                                        </ListItemIcon>
                                                        <ListItemText>
                                                            <Typography variant={'body1'}>
                                                                {step.description_teacher_1}
                                                            </Typography>
                                                        </ListItemText>
                                                    </ListItem>
                                                    <ListItem alignItems={'flex-start'} sx={{paddingLeft: 0}}>
                                                        <ListItemIcon sx={{minWidth: '40px'}}>
                                                            <CheckBoxIcon fontSize={'small'}/>
                                                        </ListItemIcon>
                                                        <ListItemText>
                                                            <Typography variant={'body1'}>
                                                                {step.description_teacher_2}
                                                            </Typography>
                                                        </ListItemText>
                                                    </ListItem>
                                                </List>
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <List
                                                    subheader={
                                                        <Typography variant={'h4'}>
                                                            {step.title_student}
                                                            {<Divider />}
                                                        </Typography>
                                                    }
                                                    sx={{marginTop: theme.spacing(4)}}>
                                                    <ListItem alignItems={'flex-start'} sx={{paddingLeft: 0}}>
                                                        <ListItemIcon sx={{minWidth: '40px'}}>
                                                            <CheckBoxIcon fontSize={'small'}/>
                                                        </ListItemIcon >
                                                        <ListItemText>
                                                            <Typography variant={'body1'}>
                                                                {step.description_student_1}
                                                            </Typography>
                                                        </ListItemText>
                                                    </ListItem>
                                                    <ListItem alignItems={'flex-start'} sx={{paddingLeft: 0}}>
                                                        <ListItemIcon sx={{minWidth: '40px'}}>
                                                            <CheckBoxIcon fontSize={'small'}/>
                                                        </ListItemIcon>
                                                        <ListItemText>
                                                            <Typography variant={'body1'}>
                                                                {step.description_student_2}
                                                            </Typography>
                                                        </ListItemText>
                                                    </ListItem>
                                                </List>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box sx={{ mb: 2 }}>
                                        <div>
                                            <Button
                                                disabled={index === 0}
                                                onClick={handleBack}
                                                sx={{ mt: 1, mr: 1, }}
                                                variant='outlined'
                                                size='small'
                                                color='inherit'
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                variant='outlined'
                                                size='small'
                                                color='inherit'
                                                onClick={handleNext}
                                                sx={{ mt: 1, mr: 1, marginLeft: theme.spacing(1) }}
                                                disabled={activeStep === totalSteps() - 1}

                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </Box>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </>
            ) : (
                <>
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((step, index) => (
                            <Step key={step.label}>
                                <StepButton color="inherit" onClick={handleStep(index)}>
                                    {step.label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    <Box sx={{ width: '100%', mt: 2 }}>
                        {steps.map((step, index) => (
                            <Box
                                key={step.label}
                                sx={{
                                    display: activeStep === index ? 'flex' : 'none',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <Grid container direction={'row'} gap={1}>
                                    <Grid item xs={12} md={5}>
                                        <img src={step.imgPath} alt={step.label}
                                             style={{marginRight: theme.spacing(2), maxWidth:'100%'}}/>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <List
                                            subheader={
                                                <Typography variant={'h4'}>
                                                    {step.title_teacher}
                                                    {<Divider />}
                                                </Typography>
                                            }
                                            sx={{marginTop: theme.spacing(4)}}>
                                            <ListItem alignItems={'flex-start'}>
                                                <ListItemIcon >
                                                    <CheckBoxIcon fontSize={'medium'}/>
                                                </ListItemIcon>
                                                <ListItemText>
                                                    <Typography variant={'h6'}>
                                                        {step.description_teacher_1}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItem>
                                            <ListItem alignItems={'flex-start'}>
                                                <ListItemIcon >
                                                    <CheckBoxIcon fontSize={'medium'}/>
                                                </ListItemIcon>
                                                <ListItemText>
                                                    <Typography variant={'h6'}>
                                                        {step.description_teacher_2}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <List
                                            subheader={
                                                <Typography variant={'h4'}>
                                                    {step.title_student}
                                                    {<Divider />}
                                                </Typography>
                                            }
                                            sx={{marginTop: theme.spacing(4)}}>
                                            <ListItem alignItems={'flex-start'}>
                                                <ListItemIcon >
                                                    <CheckBoxIcon fontSize={'medium'}/>
                                                </ListItemIcon>
                                                <ListItemText>
                                                    <Typography variant={'h6'}>
                                                        {step.description_student_1}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItem>
                                            <ListItem alignItems={'flex-start'}>
                                                <ListItemIcon>
                                                    <CheckBoxIcon fontSize={'medium'}/>
                                                </ListItemIcon>
                                                <ListItemText>
                                                    <Typography variant={'h6'}>
                                                        {step.description_student_2}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItem>
                                        </List>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button onClick={handleBack} disabled={activeStep === 0} variant='outlined' size='medium' color='inherit' sx={{marginRight: theme.spacing(1) }}>
                            Back
                        </Button>
                        <Button onClick={handleNext} disabled={activeStep === totalSteps() - 1} variant='outlined' size='medium' color='inherit'sx={{marginLeft: theme.spacing(1) }}>
                            Next
                        </Button>
                    </Box>
                </>
            )}

        </Box>
    );
}

export default AboutUsPage;
