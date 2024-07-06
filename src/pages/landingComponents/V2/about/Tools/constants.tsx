import {ToolCardSize} from "./types.ts";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PublicIcon from '@mui/icons-material/Public';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import {ToolCardProps} from "./ToolCard/ToolCard.tsx";


export const TOOL_ITEMS: Array<ToolCardProps> = [
    { text: 'Send messages, share photos, videos, and documents.',
      icon: <MailOutlineIcon fontSize={'large'}/>,
      size: ToolCardSize.Small
    },
    { text: 'Easily conduct group video conferences and webinars.',
        icon: <QuestionAnswerIcon fontSize={'large'}/>,
        size: ToolCardSize.Small
    },
    { text: 'Use AI to quickly find and select the right courses.',
        icon: <ListAltIcon fontSize={'large'}/>,
        size: ToolCardSize.Medium
    },
    { text: 'Platform for hosting and viewing educational videos.',
        icon: <PlayArrowIcon fontSize={'large'}/>,
        size: ToolCardSize.Small
    },
    { text: 'Virtual 2D and 3D boards for interactive learning.',
        icon: <PublicIcon/>,
        size: ToolCardSize.Small
    },
    { text: 'Integrated planning tools: calendar, notes tied to dates.',
        icon: <CalendarMonthIcon/>,
        size: ToolCardSize.Small
    },
    { text: 'Convenient payment terminal to purchase courses.',
        icon: <LocalAtmIcon/>,
        size: ToolCardSize.Small
    },
]