import {PricingCardProps} from "./PricingCard/PricingCard.tsx";
import Handshake from "../../../../../assets/landing/handshake pic.png";


export const PRICING_ITEMS: Array<PricingCardProps> = [
    {
        title: "Free",
        price_M: 0,
        features:
            [
                'Access to chats.',
                'Access to videos.',
                'Access to conferences.',
            ],
        button: "Sign Up For Free",
        onButtonClick: () => { console.log('Free tier selected'); }
    },
    {
        title: "Basic",
        price_M: 11.99,
        features:
            [
                'All in Free +',
                'Access to interactive board.',
                'Ability to create 5 private groups.',
                'Possibility to post 15 GB of video content.',
                'Ability to start a group conference.'
            ],
        button: "Get started",
        onButtonClick: () => { console.log('Basic tier selected'); }
    },
    {
        title: "Prime",
        price_M: 21.99,
        features:
            [
                'All in Free +',
                'Access to interactive board.',
                'Ability to create 10 private groups.',
                'Possibility to post 30 GB of video content.',
                'Ability to start a group conference.',
            ],
        button: "Get started",
        onButtonClick: () => { console.log('Prime tier selected'); }
    },
    {
        title: "Business",
        price_M: 31.99,
        features:
            [
                'All in Free +',
                'Access to interactive board.',
                'Ability to create an unlimited number of private groups.',
                'Possibility to post 50 GB of video content.',
                'Ability to start a group conference.',
            ],
        button: "Get started",
        onButtonClick: () => { console.log('Business tier selected'); }
    },
    {
        icon: <img src={Handshake} width={'100%'}  alt={''}/>,
    },
    {
        title: "Enterprise",
        features:
            [
                'All in Free +',
                'Access to interactive board.',
                'Ability to create an unlimited number of private groups.',
                'Possibility to post 50 GB of video content.',
                'Ability to start a group conference.',
            ],
        button: "Contact us",
        onButtonClick: () => { console.log('Enterprise tier selected'); }
    },
    {
        title: "Custom",
        features:
            [
                'All in Free +',
                'Access to interactive board.',
                'Ability to create an unlimited number of private groups.',
                'Possibility to post 50 GB of video content.',
                'Ability to start a group conference.',
            ],
        button: "Constructor",
        onButtonClick: () => { console.log('Custom tier selected'); }
    },

]