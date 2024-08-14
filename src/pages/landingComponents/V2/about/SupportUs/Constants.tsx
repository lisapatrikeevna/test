import { SupportUsCardProps } from "./SupportUsCard/SupportUsCard.tsx";
import React from "react";

import SparkasseLogo from '../../../../../assets/donate/Sparkasse.png';
import PostBankLogo from '../../../../../assets/donate/Postbank-Logo.svg';
import MasterCardLogo from '../../../../../assets/donate/MasterCard_Logo.svg';
import MaestroLogo from '../../../../../assets/donate/Maestro_Logo.svg';
import VisaLogo from '../../../../../assets/donate/Visa_Inc._logo.svg';
import RevolutLogo from '../../../../../assets/donate/revolute-logo.png';
import PaypalLogo from '../../../../../assets/donate/Paypal_logo.svg';
import BinanceLogo from '../../../../../assets/donate/Binance_logo.svg';

export const SUPPORT_US_ITEMS: Array<SupportUsCardProps> = [
    {
        BIC: "COKSDE33XXX",
        IBAN: "DE46370502991329072051",
        icon_1: <img src={SparkasseLogo} alt={''} height={30}/>,
        icon_2: <img src={MasterCardLogo} alt={''} height={30}/>,
    },
    {
        BIC: "PBNKDEFF",
        IBAN: "DE25100100100754785135",
        icon_1: <img src={PostBankLogo} alt={''} height={30}/>,
        icon_2: <img src={MaestroLogo} alt={''} height={30}/>,
    },
    {
        BIC: "COKSDE33XXX",
        IBAN: "DE46370502991329072051",
        icon_1: <img src={RevolutLogo} alt={''} height={30}/>,
        icon_2: <img src={VisaLogo} alt={''} height={30}/>,
    },
    {
        email: "incomgrp@outlook.com",
        icon_1: <img src={BinanceLogo} alt={''} height={30}/>,
        icon_2: <img src={PaypalLogo} alt={''} height={30}/>,
    },
    ]