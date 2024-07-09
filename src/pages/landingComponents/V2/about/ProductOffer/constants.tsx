
import {ProductOfferCardProps} from "./ProductOfferCard/ProductOfferCard.tsx";
import MonitorIcon from "../../../../../assets/landing/dashboard pic.png";
import StudentHatIcon from "../../../../../assets/landing/graduation hat pic.png";
import NoteIcon from "../../../../../assets/landing/diary and pen.png";
import ChartIcon from "../../../../../assets/landing/analytics pic.png";

export const OFFER_ITEMS: Array<ProductOfferCardProps> = [
    {
        icon: <img src={MonitorIcon} alt="Mail"/>,
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


    },
    {
        icon: <img src={StudentHatIcon} alt="Mail"/>,
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


    },
    {
        icon: <img src={NoteIcon} alt="Mail"/>,
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
    },
    {
        icon: <img src={ChartIcon} alt="Mail"/>,
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
    }
]