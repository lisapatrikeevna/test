import {useState} from 'react';
import {Button} from "@mui/material";
import {Box} from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import cl from "./style.ts"
import {shortcutsType} from "../Keep.tsx";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EditIcon from '@mui/icons-material/Edit';
import Inventory2Icon from '@mui/icons-material/Inventory2';




type propsType = {
    listOfShortcuts:Array<shortcutsType>
}
const KeeLeftBlock = (props:propsType) => {
    const [activeBlock,setActiveBlock]=useState("Заметки")
    const activeBlockStyle={
        border:activeBlock? "1px solid #EADDFF" : "none",
        backgroundColor: activeBlock? "#EADDFF" : "#fff",
    }
    return (
        <Box sx={cl.mainContainer}>
            <Button startIcon={<StickyNote2Icon />} style={activeBlockStyle}sx={cl.btn}title={"Заметки"}>notes </Button>
            <Button startIcon={<NotificationsActiveIcon />} sx={cl.btn} title={"Напоминания"}>reminder </Button>
            <Button startIcon={<EditIcon />} sx={cl.btn} title={"Изменения ярлыков"}>change the label</Button>
            <Button startIcon={<Inventory2Icon />} sx={cl.btn}title={"Архив"}>archive </Button>
            <Button startIcon={<DeleteIcon />} sx={cl.btn} title={"Корзина"}>trash </Button>
             <>{props.listOfShortcuts.map(i=>{<Button key={i.id}> {i.name} </Button>} )}</>
        </Box>
    );
};

export default KeeLeftBlock;





