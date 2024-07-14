import { SupportUsCardProps } from "./SupportUsCard/SupportUsCard.tsx";

// import SparkasseLogo from 'src/assets/donate/Sparkasse.png';
// import PostBankLogo from 'src/assets/donate/Postbank-Logo.svg';
// import MasterCardLogo from 'src/assets/donate/MasterCard_Logo.svg';
// import MaestroLogo from 'src/assets/donate/Maestro_Logo.svg';
// import VisaLogo from 'src/assets/donate/Visa_Inc._logo.svg';
// import RevolutLogo from 'src/assets/donate/revolute-logo.png';
// import PaypalLogo from 'src/assets/donate/Paypal_logo.svg';
// import BinanceLogo from 'src/assets/donate/Binance_logo.svg';

export const SUPPORT_US_ITEMS: Array<SupportUsCardProps> = [
    {
        BIC: "COKSDE33XXX",
        IBAN: "DE46370502991329072051",
        icon_1: "src/assets/donate/Sparkasse.png",
        icon_2: "src/assets/donate/MasterCard_Logo.svg",
    },
    {
        BIC: "PBNKDEFF",
        IBAN: "DE25100100100754785135",
        icon_1: 'src/assets/donate/Postbank-Logo.svg',
        icon_2: 'src/assets/donate/Maestro_Logo.svg',
    },
    {
        BIC: "COKSDE33XXX",
        IBAN: "DE46370502991329072051",
        icon_1: 'src/assets/donate/revolute-logo.png',
        icon_2: 'src/assets/donate/Visa_Inc._logo.svg',
    },
    {
        email: "incomgrp@outlook.com",
        icon_1: 'src/assets/donate/Binance_logo.svg',
        icon_2: 'src/assets/donate/Paypal_logo.svg',
    },
    ]