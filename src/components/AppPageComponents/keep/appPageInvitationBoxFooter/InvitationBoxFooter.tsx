import cl from "./style.module.css";
import {Box, styled} from "@mui/system";
import {Button, Checkbox, IconButton, Modal, TextField, Typography} from "@mui/material";
import AddSvg from "../../../../assets/notes/Add.svg";
import AddFriend from "../../../../assets/notes/Add friend.svg";
import PaintPalette from "../../../../assets/notes/Paint palette.svg";
import AddImage from "../../../../assets/notes/Add image.svg";
import BoxSvg from "../../../../assets/notes/Box.svg";
import Menu from "../../../../assets/notes/Group 4.svg";
import RedoL from "../../../../assets/notes/redo.svg";
import RedoR from "../../../../assets/notes/redo (1).svg";
import {ChangeEvent, useState} from "react";
import {shortcutsType, TodolistType} from "../Keep.tsx";
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import InventoryIcon from '@mui/icons-material/Inventory';
import MoreVertIcon from '@mui/icons-material/MoreVert';




const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
const colorsArr=[
    {color:"#f80303"},
    {color:"#ff00be"},
    {color:"#ff006b"},
    {color:"#7900ff"},
    {color:"#008eff"},
    {color:"#00ffc2"},
    {color:"#07a113"},
    {color:"#f8e103"},
    {color:"transparent"},
]
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

type propsType={
    onClose:( todoId:string)=>void
    getBackground:(todoId: string , bg:string)=>void
    getImg:(e: ChangeEvent<HTMLInputElement>)=>void
    addNewShortcuts:(name:string)=>void
    listOfShortcuts:Array<shortcutsType>
    isTodoHandler:()=>void
    toArchiveHandler:(todoId:string)=>void
    todoId:string
    taskLength:number
    removeTodolist: (todolistId: string) => void
    isTodoList:boolean
}


const InvitationBoxFooter = ({onClose,getBackground,getImg,listOfShortcuts,toArchiveHandler,...props}:propsType) => {
    const [isOpenPaintPaletteModal, setPaintPaletteModal] = useState(false);
    const [isOpenMoreModal, setMoreModal] = useState(false);
    const [isOpenShortcutsModal, setShortcutsModal] = useState(false);


    const [newShortcuts, setNewShortcuts] = useState<string>('')
    // console.log(listOfShortcuts);
    const paintPaletteModalHandler = () => {
        setPaintPaletteModal(!isOpenPaintPaletteModal)
    }
    const moreModalHandler = () => {
        setMoreModal(!isOpenMoreModal)
    }
    const openShortcutsModalHandler=()=>{
        setMoreModal(!isOpenMoreModal)
        setShortcutsModal(!isOpenShortcutsModal)
    }
    const newTask=true
    const ShortcutsHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewShortcuts(e.target.value)
    }
    const addNewShortcuts = () => {
        props.addNewShortcuts(newShortcuts)
        setNewShortcuts('')
    }
    const isTodoHandler = () => {
        props.isTodoHandler()
        setMoreModal(!isOpenMoreModal)
    }
    const onCloseCallback=()=>{
        onClose(props.todoId)
    }
    const removeTodolistCallback = () => {
        props.removeTodolist(props.todoId)
    }
    console.log("taskLength ",props.taskLength);

    return (<>
        <Box className={cl.buttonsWrap}>
            <Box>
                <IconButton aria-label="delete" title={"save reminder"} onClick={()=>{}}>
                    <img src={AddSvg} alt={"AddSvg"}/>
                </IconButton>
                <IconButton aria-label="delete" title={"co-authors"}>
                    <img src={AddFriend} alt={"AddFriend"}/>
                </IconButton>

                <IconButton aria-label="delete" title={"background parameters"} onClick={paintPaletteModalHandler}>
                    <img src={PaintPalette} alt={"PaintPalette"}/>
                </IconButton>

                <IconButton aria-label="delete" tabIndex={-1} component="label" title={"add a picture"}>
                    <img src={AddImage} alt={"AddImage"}/>
                    <VisuallyHiddenInput type="file" onChange={getImg}/>
                </IconButton>

                <IconButton aria-label="delete" tabIndex={-1} title={"archive"} onClick={()=>toArchiveHandler(props.todoId)}>
                    <img src={BoxSvg} alt={"archive"}/>
                </IconButton>

                <IconButton aria-label="delete" tabIndex={-1} title={"more"} onClick={moreModalHandler}>
                    <img src={Menu} alt={"more"}/>
                </IconButton>

                <IconButton aria-label="delete" title={"undo"} onClick={()=>alert('Make me')}><img src={RedoL} alt={"undo"}/></IconButton>
                <IconButton aria-label="delete" title={"redo"} onClick={()=>alert('Make me')}><img src={RedoR} alt={"redo"}/></IconButton>
            </Box>
            <Button variant="outlined" onClick={onCloseCallback}>Close</Button>
        </Box>


        <Modal open={isOpenPaintPaletteModal} onClose={paintPaletteModalHandler}
            aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box className={cl.boxColors}>
                    {colorsArr.map((i, index) => (<Button key={index}><Box className={cl.itemColor} onClick={()=>getBackground(props.todoId, i.color)} style={{backgroundColor:i.color}}></Box></Button>))}
                </Box>
            </Box>
        </Modal>
        <Modal open={isOpenMoreModal} onClose={moreModalHandler}
            aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}> {!newTask?
                <Box className={cl.moreBox}>
                    <p>some text</p>
                </Box>:
                <Box className={cl.moreBox}>
                    <Button onClick={openShortcutsModalHandler}>add shortcut</Button>
                    <Button onClick={()=>{}}>add picture</Button>
                    {props.taskLength==0 && <Button onClick={isTodoHandler} title={props.isTodoList?"as todoList":"as note"}>{!props.isTodoList?"as todoList":"as note"}</Button>}
                    {props.taskLength>0 && <Button onClick={removeTodolistCallback} title={'delete note'}>delete note</Button>}
                </Box>
            } </Box>
        </Modal>

        <Modal open={isOpenShortcutsModal} onClose={openShortcutsModalHandler}
               aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Box>
                    <Typography>Добавить ярлык</Typography>
                    <TextField onChange={ShortcutsHandler} value={newShortcuts}/>
                    {newShortcuts.length<2 ?
                    <Box>
                        {listOfShortcuts.map(i=><Box key={i.id}> <Checkbox /><Typography>{i.name}</Typography></Box>)}
                    </Box>:
                    <Box>
                        <Button onClick={addNewShortcuts}>create new {newShortcuts}</Button>
                    </Box>
                    }
                </Box>
            </Box>
        </Modal>
   </> );
};

export default InvitationBoxFooter;