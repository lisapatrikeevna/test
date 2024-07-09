import {ToolCardSize} from "./types.ts";
// import MailOutlineIcon from '@mui/icons-material/MailOutline';
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// import ListAltIcon from '@mui/icons-material/ListAlt';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import PublicIcon from '@mui/icons-material/Public';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import {ToolCardProps} from "./ToolCard/ToolCard.tsx";
import MailIcon from '../../../../../assets/landing/envelope pic.png'
import ChatMessagesIcon from '../../../../../assets/landing/dialog pic.png'
import ListIcon from '../../../../../assets/landing/list pic.png'
import PlayerIcon from '../../../../../assets/landing/player pic.png'
import VRIcon from '../../../../../assets/landing/vr pic.png'
import CalendarIcon from '../../../../../assets/landing/calendar pic.png'
import PaymentIcon from '../../../../../assets/landing/payment pic.png'


export const TOOL_ITEMS: Array<ToolCardProps> = [
    { text: 'Send messages, share photos, videos, and documents.',
      icon: <img src={MailIcon} alt="Mail" />,
      size: ToolCardSize.Small
    },
    { text: 'Easily conduct group video conferences and webinars.',
        icon: <img src={ChatMessagesIcon} alt="Mail" />,
        size: ToolCardSize.Small
    },
    { text: 'Use AI to quickly find and select the right courses.',
        icon: <img src={ListIcon} alt="Mail" />,
        size: ToolCardSize.Medium
    },
    { text: 'Platform for hosting and viewing educational videos.',
        icon: <img src={PlayerIcon} alt="Mail" />,
        size: ToolCardSize.Small
    },
    { text: 'Virtual 2D and 3D boards for interactive learning.',
        icon: <img src={VRIcon} alt="Mail" />,
        size: ToolCardSize.Small
    },
    { text: 'Integrated planning tools: calendar, notes tied to dates.',
        icon: <img src={CalendarIcon} alt="Mail" />,
        size: ToolCardSize.Small
    },
    { text: 'Convenient payment terminal to purchase courses.',
        icon: <img src={PaymentIcon} alt="Mail" />,
        size: ToolCardSize.Small
    },
]