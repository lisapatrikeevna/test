import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {ICommunityInfo} from "../../../../types/types.ts";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

interface ListFoundCommunitiesProps {
    items: ICommunityInfo[];
    isLoading: boolean
    isOpen: boolean
}

export const ListFoundCommunities = ({items, isLoading, isOpen}: ListFoundCommunitiesProps) => {
    if(!isOpen){
        return null
    }

    return (
        <Paper style={{ width: '100%', position: 'absolute', zIndex: 1, left: 0, top: 60 }}>
            <List>
                {isLoading ? (
                    <ListItemText primary="Loading..." style={{ padding: '10px' }} />
                ) : (
                    <>
                        {!items.length && <ListItemText primary="Not Found" style={{ padding: '10px' }} />}
                        {items.map((item) => (
                            <ListItemButton key={item.id}>
                                <ListItemText primary={item.name} />
                                <IconButton onClick={() =>{}}>
                                    <AddIcon />
                                </IconButton>
                            </ListItemButton>
                        ))}
                    </>
                )}
            </List>
        </Paper>
    )
}
