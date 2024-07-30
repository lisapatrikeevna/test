import { ChangeEvent, useState } from 'react';
import { Button, Card, Container, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import cl from "./Keep.module.css";
import Note from "./Note.tsx";


import InvitationBoxFooter from "./appPageInvitationBoxFooter/InvitationBoxFooter.tsx";
import KeeLeftBlock from "./keeLeftBlock/KeeLeftBlock.tsx";
import NoteCreationPanel from "./noteCreationPanel/NoteCreationPanel.tsx";
import {a} from "vite/dist/node/types.d-aGj9QkWt";


export const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)', clipPath: 'inset(50%)',
  height: 1, overflow: 'hidden', position: 'absolute',
  bottom: 0, left: 0, whiteSpace: 'nowrap', width: 1,
                                            });

export type noteType = {
  id: number; text: string; titleNote: string; img: null | string
  paint: null | string,background:string|null
}
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
  id: string
  title: string
  filter?: FilterValuesType
}
export type TasksStateType = {
  [key: string]: TaskType[]
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
  const [archive, setToArchive]=useState<Array<any>>([])

  // let todolistID1 = v1()
  // let todolistID2 = v1()
  let todolistID1 = 'j123'
  let todolistID2 = "v1()"

  let [todolists, setTodolists] = useState<TodolistType[]>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    // [todolistID1]: [
    //   {id: v1(), title: 'HTML&CSS', isDone: true},
    //   {id: v1(), title: 'JS', isDone: true},
    //   {id: v1(), title: 'ReactJS', isDone: false},
    // ],
    // [todolistID2]: [
    //   {id: v1(), title: 'Rest API', isDone: true},
    //   {id: v1(), title: 'GraphQL', isDone: false},
    // ],
    [todolistID1]: [
      {id: "12ml3", title: 'HTML&CSS', isDone: true},
      {id: "19l0", title: 'JS', isDone: true},
      {id: "nij", title: 'ReactJS', isDone: false},
    ],
    [todolistID2]: [
      {id: "hbnjk", title: 'Rest API', isDone: true},
      {id: "bjjh", title: 'GraphQL', isDone: false},
    ],
  })


  const inputTexHandler = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("inputTexHandler");
    setNewNote(e.currentTarget.value)
  }
  const inputTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewNoteTitle(e.currentTarget.value)
  const inputImgHandler = (e: ChangeEvent<HTMLInputElement>) => setNewNoteImg(e.currentTarget.value)
  const imgOnBlurHandler=()=>setOpen(true)
  const backgroundHandler=(bg:string)=>setNoteBackgroundColor(bg)
  const handleFocus = () => newNoteTitle.length < 1 && setOpen(true)
  const toArchiveHandler=()=>{
    alert("пока реализован только для заметок")
    const smb = {
      id: arrNotes.length + 1,
      text: newNote,
      titleNote: newNoteTitle,
      img: newNoteImg,
      paint: null,
      background:noteBackgroundColor}
    setToArchive([...archive,smb])
    setOpen(!isOpen)
    setNewNote('')
    setNewNoteTitle('')
    setNewNoteImg(null)
    setNoteBackgroundColor("#fff")
  }
  const setText = () => {
    const note = {
      id: arrNotes.length + 1,
      text: newNote,
      titleNote: newNoteTitle,
      img: newNoteImg,
      paint: null,
      background:noteBackgroundColor}
    isOpen && (newNote.trim().length > 0 || newNoteTitle.trim().length > 0 || newNoteImg || noteBackgroundColor) ? (setArrNotes([...arrNotes, note]), setOpen(!isOpen)) : setOpen(!isOpen)
    console.log("setText");
    setNewNote('')
    setNewNoteTitle('')
    setNewNoteImg(null)
    setNoteBackgroundColor("#fff")
  }
  const listOfShortcutsHandler = (newShortcuts:string) => {
    const newObj={id:listOfShortcuts.length+1,name:newShortcuts}
    setListOfShortcuts([...listOfShortcuts, newObj])
  }
  const isTodoHandler=()=>setIsTodoList(!isTodoList)


  const removeTask = (taskId: string, todolistId: string) => {
    const newTodolistTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
    setTasks(newTodolistTasks)
  }
  const addTask = (title: string, todolistId: string) => {
    const newTask = {
      id: "v1()hkj",
      title: title,
      isDone: false
    }
    const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
    setTasks(newTodolistTasks)
  }
  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    const newTodolists = todolists.map(tl => {
      return tl.id === todolistId ? {...tl, filter} : tl
    })
    setTodolists(newTodolists)
  }
  const removeTodolist = (todolistId: string) => {
    const newTodolists = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(newTodolists)

    delete tasks[todolistId]
    setTasks({...tasks})
  }
  const addTodolist = (title: string="new todoList") => {
    const todolistId = "v1()bhjk"+title[-1]
    const newTodolist: TodolistType = {id: todolistId, title: title}
    // const newTodolist: TodolistType = {id: todolistId, title: title, filter: 'all'}
    setTodolists([newTodolist, ...todolists])
    setTasks({...tasks, [todolistId]: []})
  }
  const updateTask = (todolistId: string, taskId: string, title: string) => {
    const newTodolistTasks = {
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
    }
    setTasks(newTodolistTasks)
  }
  const updateTodolist = (todolistId: string, title: string) => {
    const newTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl)
    setTodolists(newTodolists)
  }
  const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
    const newTodolistTasks = {
      ...tasks,
      [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
    }
    setTasks(newTodolistTasks)
  }

const mausHandl=()=>{
  console.log("mausHandl");
  setText()
}

  return <Box style={{padding: "20px 10px"}} className={cl.containerBox}>
    <KeeLeftBlock listOfShortcuts={listOfShortcuts}/>
    <Box className={cl.centredBox}>
      <Box>
        <Paper square={false} pt={2} pb={2} className={cl.paper} style={{backgroundColor:noteBackgroundColor}} onmouseleave={mausHandl}>
          {/*<Card variant="outlined" sx={{maxWidth: 360}} className={cl.paper} autoFocus onBlur={setText}>*/}

          <NoteCreationPanel isOpen={isOpen} isTodoList={isTodoList} handleFocus={handleFocus} isTodoHandler={isTodoHandler}
                             imgOnBlurHandler={imgOnBlurHandler} inputImgHandler={inputImgHandler} inputTitleHandler={inputTitleHandler}
                             inputTexHandler={inputTexHandler} newNoteImg={newNoteImg} addTodolist={addTodolist}
                             newNoteTitle={newNoteTitle} newNote={newNote}/>

          {isOpen && <InvitationBoxFooter setText={setText} getBackground={backgroundHandler} getImg={inputImgHandler}
                                          listOfShortcuts={listOfShortcuts} addNewShortcuts={listOfShortcutsHandler}
                                          isTodoHandler={isTodoHandler} toArchiveHandler={toArchiveHandler}/> }
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