import {AccountBalance, Apps, Build, Call, EuroSymbol, Handshake, LunchDining} from "@mui/icons-material";

export const MENU_ITEMS=["#AboutUs", "#Project", "#Pricing", "#Partners", "#Contacts", "#News", "#Donate"]

export const ICON_MAP: { [key: string]: JSX.Element } = {
    "#Partners": <Handshake />,
    "#Pricing": <EuroSymbol />,
    "#News": <Apps />,
    "#Contacts": <Call />,
    "#AboutUs": <AccountBalance />,
    "#Project": <Build />,
    "#Donate": <LunchDining />
};