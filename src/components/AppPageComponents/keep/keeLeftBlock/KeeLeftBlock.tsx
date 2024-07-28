import {useState} from 'react';
import {Button} from "@mui/material";
import {Box} from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import cl from "./style.module.css"
import {shortcutsType} from "../Keep.tsx";

type propsType = {
    listOfShortcuts:Array<shortcutsType>
}
const KeeLeftBlock = (props:propsType) => {
    const [activeBlock,setActiveBlock]=useState("Заметки")
    const activeBlockStyle={
        border:activeBlock? "1px solid #8683B4" : "none",
        backgroundColor: activeBlock? "#8683B4" : "#fff",
    }
    return (
        <Box className={cl.mainContainer}>
            <Button startIcon={<DeleteIcon />} style={activeBlockStyle}> Заметки</Button>
            <Button startIcon={<DeleteIcon />} > Напоминания</Button>
            <Button startIcon={<DeleteIcon />} > Изменения ярлыков</Button>
            <Button startIcon={<DeleteIcon />} > Архив</Button>
            <Button startIcon={<DeleteIcon />} > Корзина</Button>
             <>{props.listOfShortcuts.map(i=>{<Button key={i.id}> {i.name} </Button>} )}</>
        </Box>
    );
};

export default KeeLeftBlock;