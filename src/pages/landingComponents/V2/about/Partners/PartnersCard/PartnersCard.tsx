import {ReactNode} from "react";
import {Box, useTheme} from "@mui/material";

export interface PartnersCardProps {
    icon: ReactNode,
    url: string;
}

export const PartnersCard = ({ partner }: { partner: PartnersCardProps }) => {
    return (
        <Box component="a"
             href={partner.url}
             target="_blank"
             onClick={(e) => e.stopPropagation()}
             sx={{display: 'flex',
                 justifyContent: 'center',
                 alignItems: 'center',
                 width: '100%',
                 height: '100%',
                 padding: useTheme().spacing(4),
                 backgroundColor: useTheme().palette?.background?.paper,
             borderRadius: useTheme().shape.borderRadius}}>
            {partner.icon}
        </Box>
    );
}