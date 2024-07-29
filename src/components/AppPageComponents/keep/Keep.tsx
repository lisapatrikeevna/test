import { ChangeEvent, useState } from 'react';
import { Button, Card, Container, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import BrushIcon from '@mui/icons-material/Brush';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { Box, styled } from "@mui/system";
import cl from "./Keep.module.css";
import Note from "./Note.tsx";
import AddAlertIcon from '@mui/icons-material/AddAlert';
import NeuButton from "../../neumorphism/button/NeuButton.tsx";
import downloadImg from "../../../assets/notes/Image.svg";
import Checkbox from "../../../assets/notes/Checkbox.svg";
import Paintbrush from "../../../assets/notes/Paintbrush.svg";

import InvitationBoxFooter from "./appPageInvitationBoxFooter/InvitationBoxFooter.tsx";
import KeeLeftBlock from "./keeLeftBlock/KeeLeftBlock.tsx";
import NoteCreationPanel from "./noteCreationPanel/NoteCreationPanel.tsx";


export const VisuallyHiddenInput = styled('input')({
                                              clip: 'rect(0 0 0 0)', clipPath: 'inset(50%)', height: 1, overflow: 'hidden', position: 'absolute', bottom: 0, left: 0, whiteSpace: 'nowrap', width: 1,
                                            });
export type noteType = {
  id: number; text: string; titleNote: string; img: null | string
  paint: null | string,background:string|null
}
export type shortcutsType={
  id: number
  name: string
}

const Keep = () => {
  const [arrNotes, setArrNotes] = useState<Array<noteType>>([{id: 1, text: 'some text', titleNote: '', img: null, paint: null,background:null}])
  const [newNoteImg, setNewNoteImg] = useState<string|null>(null)
  const [newNote, setNewNote] = useState('')
  const [newNoteTitle, setNewNoteTitle] = useState('')
  const [isOpen, setOpen] = useState(false)
  const [noteBackgroundColor, setNoteBackgroundColor] = useState<string>("#fff")
  const [listOfShortcuts, setListOfShortcuts] = useState<Array<shortcutsType>>([])
  const [isTodoList,setIsTodoList] = useState(false)

  const inputTexHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNote(e.currentTarget.value)
  }
  const inputTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNoteTitle(e.currentTarget.value)
  }
  const inputImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNoteImg(e.currentTarget.value)
  }
  const imgOnBlurHandler=()=>{
    setOpen(true)
  }
  const backgroundHandler=(bg:string)=>{
    setNoteBackgroundColor(bg)
  }
  const handleFocus = () => {
    newNoteTitle.length < 1 && setOpen(true)
  }
  const setText = () => {
    const note = {id: 2, text: newNote, titleNote: newNoteTitle, img: newNoteImg, paint: null,background:noteBackgroundColor}
    isOpen && (newNote.length > 0 || newNoteTitle.length > 0 || newNoteImg) ? (setArrNotes([...arrNotes, note]), setOpen(!isOpen)) : setOpen(!isOpen)
    setNewNote('')
    setNewNoteTitle('')
    setNewNoteImg(null)
    setNoteBackgroundColor("#fff")
  }
  const listOfShortcutsHandler = (newShortcuts) => {
    const newObj={id:listOfShortcuts.length+1,name:newShortcuts}
    setListOfShortcuts([...listOfShortcuts, newObj])
  }
  const isTodoHandler=()=>{
    setIsTodoList(!isTodoList)
  }



  return <Box style={{padding: "20px 10px"}} className={cl.containerBox}>
    <KeeLeftBlock listOfShortcuts={listOfShortcuts}/>
    <Box className={cl.centredBox}>
      <Box>
        <Paper square={false} pt={2} pb={2} className={cl.paper} style={{backgroundColor:noteBackgroundColor}}>
          {/*<Card variant="outlined" sx={{maxWidth: 360}} className={cl.paper} autoFocus onBlur={setText}>*/}

          <NoteCreationPanel imgOnBlurHandler={imgOnBlurHandler} inputImgHandler={inputImgHandler} inputTitleHandler={inputTitleHandler} inputTexHandler={inputTexHandler} newNote={newNote} newNoteImg={newNoteImg} newNoteTitle={newNoteTitle} isOpen={isOpen} isTodoList={isTodoList}/>

          {isOpen && <InvitationBoxFooter setText={setText} getBackground={backgroundHandler} getImg={imgOnBlurHandler}
                                          listOfShortcuts={listOfShortcuts} addNewShortcuts={listOfShortcutsHandler}
                                          isTodoHandler={isTodoHandler}/> }
          {/*</Card>*/}
        </Paper>




        {/*----- drawing todo sheets --------*/}
        <Grid container spacing={1} mt={3}>
          {arrNotes.map(i => <Grid item xs={6} gap={1} spacing={1}> <Note itemNote={i} key={i.id}/> </Grid>)}
        </Grid>
      </Box>
    </Box>

  </Box>


};

export default Keep;