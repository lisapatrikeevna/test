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
import {shortcutsType} from "../Keep.tsx";



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
    setText:()=>void
    getBackground:(bg:string)=>void
    getImg:(e: ChangeEvent<HTMLInputElement>)=>void
    addNewShortcuts:(name:string)=>void
    listOfShortcuts:Array<shortcutsType>
    isTodoHandler:()=>void
    toArchiveHandler:()=>void
}


const InvitationBoxFooter = ({setText,getBackground,getImg,listOfShortcuts,toArchiveHandler,...props}:propsType) => {
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

                <IconButton aria-label="delete" tabIndex={-1} title={"archive"} onClick={toArchiveHandler}>
                    <img src={BoxSvg} alt={"archive"}/>
                </IconButton>

                <IconButton aria-label="delete" tabIndex={-1} title={"more"} onClick={moreModalHandler}>
                    <img src={Menu} alt={"more"}/>
                </IconButton>

                <IconButton aria-label="delete" tabIndex={-1} title={"undo"} onClick={()=>alert('Make me')}><img src={RedoL} alt={"undo"}/></IconButton>
                <IconButton aria-label="delete" tabIndex={-1} title={"redo"} onClick={()=>alert('Make me')}><img src={RedoR} alt={"redo"}/></IconButton>
            </Box>
            <Button  variant="outlined" onClick={setText}>Close</Button>
        </Box>


        <Modal open={isOpenPaintPaletteModal} onClose={paintPaletteModalHandler}
            aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Box className={cl.boxColors}>
                    {colorsArr.map((i, index) => (<Button key={i.color}><Box className={cl.itemColor} onClick={()=>getBackground(i.color)} style={{backgroundColor:i.color}}></Box></Button>))}
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
                    <Button onClick={isTodoHandler}>as list</Button>
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