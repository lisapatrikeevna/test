import SparkasseLogo from '../assets/donate/Sparkasse.png';
import PostBankLogo from '../assets/donate/Postbank-Logo.svg';
import MasterCardLogo from '../assets/donate/MasterCard_Logo.svg';
import MaestroLogo from '../assets/donate/Maestro_Logo.svg';
import VisaLogo from '../assets/donate/Visa_Inc._logo.svg';
import RevolutLogo from '../assets/donate/revolute-logo.png';
import PaypalLogo from '../assets/donate/Paypal_logo.svg';
import BinanceLogo from '../assets/donate/Binance_logo.svg';

export const cardsData = [
    {
        title: "Sparkasse",
        // titleImage: SparkasseLogo, // Add image URL here
        cardType: "Mastercard",
        cardTypeImage: MasterCardLogo, // Add image URL here
        bic: "BIC: COKSDE33XXX",
        iban: "IBAN: DE46370502991329072051"
    },
    {
        title: "PostBank",
        // titleImage: PostBankLogo, // Add image URL here
        cardType: "Maestro",
        cardTypeImage: MaestroLogo, // Add image URL here
        bic: "BIC: PBNKDEFF",
        iban: "IBAN: DE25100100100754785135"
    },
    {
        title: "Revolut",
        // titleImage: RevolutLogo, // Add image URL here
        cardType: "Visa",
        cardTypeImage: VisaLogo, // Add image URL here
        bic: "BIC: REVOLT21",
        iban: "IBAN: LT843250050964665543"
    },
    {
        title: "Paypal",
        titleImage: PaypalLogo, // Add image URL here
        email: "incomgrp@outlook.com"
    },
    {
        title: "Binance",
        titleImage: BinanceLogo, // Add image URL here
        email: "incomgrp@outlook.com"
    },
    {
        title: "Fixed 4.99€ donation",
        link: "https://checkout.revolut.com/payment-link/a8d90880-6d89-46d8-96f0-a1d71e6e4fcb"
    }
];
