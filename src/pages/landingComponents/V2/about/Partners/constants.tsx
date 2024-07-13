import {PartnersCardProps} from "./PartnersCard/PartnersCard.tsx";
import BinanceIcon from '../../../../../assets/partners/Binance-logo.png'
import IonosIcon from "../../../../../assets/partners/ionosLogo.jpg";
import RevoluteIcon from "../../../../../assets/partners/revolute-logo.png";
import PaypalIcon from "../../../../../assets/partners/Paypal_logo.png";
import JetBrainsIcon from "../../../../../assets/partners/JetBrains_logo.svg";
import VSCodeIcon from "../../../../../assets/partners/VSCode-logo.png";
import ReactIcon from "../../../../../assets/partners/React-logo.svg";
import FacebookIcon from "../../../../../assets/partners/Facebook-logo.svg";
import TelegramIcon from "../../../../../assets/partners/Telegram_logo.svg";
import LinkedInIcon from "../../../../../assets/partners/LinkedIn_Logo.svg";
import YouTubeIcon from "../../../../../assets/partners/youtube-logo.png";
import UnityIcon from "../../../../../assets/partners/unity-logo.png";


export const PARTNERS_ITEMS: Array<PartnersCardProps> = [
    { 
        icon: <img src={IonosIcon} alt="Binance" width={'100%'}/>,
        url: 'https://acn.ionos.de/aff_c?offer_id=2&aff_id=7772' 
    },
    { 
        icon: <img src={BinanceIcon} alt="Binance"  width={'100%'}/>,
        url: 'https://binance.com/' },
    { 
        icon: <img src={RevoluteIcon} alt="Binance" width={'100%'} />,
        url: 'https://revolut.com/' 
    },
    { 
        icon: <img src={PaypalIcon} alt="Binance" width={'100%'} />,
        url: 'https://paypal.com/' 
    },
    { 
        icon: <img src={JetBrainsIcon} alt="Binance" width={'100%'} />,
        url: 'https://jetbrains.com/' 
    },
    { 
        icon: <img src={VSCodeIcon} alt="Binance" width={'100%'} />,
        url: 'https://code.visualstudio.com/' 
    },
    { 
        icon: <img src={ReactIcon} alt="Binance" width={'100%'} />,
        url: 'https://react.com/' 
    },
    {
        icon: <img src={FacebookIcon} alt="Binance" width={'100%'} />,
        url: 'https://facebook.com/' 
    },
    { 
        icon: <img src={TelegramIcon} alt="Binance" width={'100%'} />,
        url: 'https://web.telegram.org/' 
    },
    { 
        icon: <img src={LinkedInIcon} alt="Binance" width={'100%'} />,
        url: 'https://linkedin.com/'
    },
    { 
        icon: <img src={YouTubeIcon} alt="Binance" width={'100%'} />,
        url: 'https://youtube.com/' 
    },
    { 
        icon: <img src={UnityIcon} alt="Binance" width={'100%'} />,
        url: 'https://unity.com/' 
    },
]