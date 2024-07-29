import {Box} from "@mui/system";
import cl from "../Keep.module.css";
import {IconButton, TextField} from "@mui/material";
import Checkbox from "../../../../assets/notes/Checkbox.svg";
import Paintbrush from "../../../../assets/notes/Paintbrush.svg";
import downloadImg from "../../../../assets/notes/Image.svg";
import {VisuallyHiddenInput} from "../Keep.tsx";
import AddAlertIcon from '@mui/icons-material/AddAlert';
import {ChangeEvent} from "react";



type propsType={
    isOpen:boolean
    newNoteImg:string|null
    newNoteTitle:string
    isTodoList:boolean
    newNote:string
    inputTitleHandler:(e: ChangeEvent<HTMLInputElement>)=>void
    inputTexHandler:(e: ChangeEvent<HTMLInputElement>)=>void
    inputImgHandler:(e: ChangeEvent<HTMLInputElement>)=>void
    imgOnBlurHandler:(w:string)=>void
}
const NoteCreationPanel = ({isOpen,newNoteImg,newNoteTitle,isTodoList,newNote,...props}:propsType) => {


    return (
        <Box className={cl.invitationBox}>
            {/*-----basic block--------*/}
            {isOpen &&<>
                {newNoteImg && <img src={newNoteImg} alt={"img"}/>}
                <Box className={cl.wrapInput}>
                    <TextField variant="standard" placeholder={'Введите заголовок'} style={{borderBottom:0}}
                               value={newNoteTitle} fullWidth onChange={(e)=>props.inputTitleHandler}/>
                </Box></>}
            {!isTodoList?
                <Box className={cl.boxHeading}>
                    <Box className={cl.wrapInput}>
                        <TextField variant="standard" placeholder={'Заметка…'} value={newNote} fullWidth onChange={(e)=>props.inputTexHandler} onFocus={handleFocus} style={{borderBottom:0}}/>
                    </Box>
                    {!isOpen && <Box className={cl.boxHeadingBtn}>
                        {/*<BrushIcon/>*/}
                        {/*<LibraryAddCheckIcon/>*/}
                        <img src={Checkbox} alt="Checkbox"/>
                        <img src={Paintbrush} alt="Paintbrush"/>

                        <IconButton aria-label="download" tabIndex={-1} component="label">
                            {/*<AddToPhotosIcon fontSize="inherit"/>*/}
                            <img src={downloadImg} alt="downloadImg"/>
                            <VisuallyHiddenInput type="file" onChange={()=>props.inputImgHandler} onBlur={()=>props.imgOnBlurHandler}/>
                        </IconButton>
                    </Box>}
                </Box>:
                <Box>todo</Box>
            }

        </Box>
    );
};

export default NoteCreationPanel;