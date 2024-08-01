import {ChangeEvent, useEffect, useState} from 'react';
import {Button, Card, Container, Grid, IconButton, Paper, TextField, Typography} from "@mui/material";
import {Box, styled} from "@mui/system";
import cl from "./Keep.module.css";
import Note from "./Note.tsx";
import InvitationBoxFooter from "./appPageInvitationBoxFooter/InvitationBoxFooter.tsx";
import KeeLeftBlock from "./keeLeftBlock/KeeLeftBlock.tsx";
import NoteCreationPanel from "./noteCreationPanel/NoteCreationPanel.tsx";
import {Todolist} from "./todoList/TodoList.tsx";


export const VisuallyHiddenInput = styled('input')({
   clip: 'rect(0 0 0 0)', clipPath: 'inset(50%)',
   height: 1, overflow: 'hidden', position: 'absolute',
   bottom: 0, left: 0, whiteSpace: 'nowrap', width: 1,
});

export type noteType = {
   id: number; text: string; titleNote: string; img: null | string
   paint: null | string, background: string | null
}
export type TaskType = {
   id: string
   title: string
   isDone: boolean
}
export type FilterValuesType = 'fixed' | 'archive' | 'none' | 'forEditing'
export type TodolistType = {
   background: string | null
   id: string
   title: string
   filter?: FilterValuesType
   flag: flagType
}
export type TasksStateType = {
   [key: string]: TaskType[]
}
export type shortcutsType = {
   id: number
   name: string
}
export type flagType = "note" | "todo"

const Keep = () => {
   const [newNoteImg, setNewNoteImg] = useState<string | null>(null)
   const [newNote, setNewNote] = useState('')
   const [noteBackgroundColor, setNoteBackgroundColor] = useState<string>("#fff")
   const [newNoteTitle, setNewNoteTitle] = useState('')

   const [isOpen, setOpen] = useState(false)
   const [isTodoList, setIsTodoList] = useState(false)

   const [pinnedNotes, setPinnedNotes] = useState<Array<string>>([])
   const [listOfShortcuts, setListOfShortcuts] = useState<Array<shortcutsType>>([])
   const [archive, setToArchive] = useState<Array<any>>([])

   const [todolists, setTodolists] = useState<TodolistType[]>(
      // []as TodolistType[])
      [{id: 'j123', title: 'What to learn', filter: 'none', background: "#fff", flag: "todo"},
         {id: "v1()", title: 'What to buy', filter: 'none', background: "#fff", flag: "todo"},
         {id: "jhji", title: 'delete note component', filter: 'none', background: "#fff", flag: "note"},
      ])
   const [tasks, setTasks] = useState<TasksStateType>(
      // {}as TasksStateType)
      {
         ['j123']: [
            {id: "12ml3", title: 'HTML&CSS', isDone: true},
            {id: "19l0", title: 'JS', isDone: true},
            {id: "nij", title: 'ReactJS', isDone: false},
         ],
         ["v1()"]: [
            {id: "hbnjk", title: 'Rest API', isDone: true},
            {id: "bjjh", title: 'GraphQL', isDone: false},
         ],
         ["jhji"]: []
      })
   // useEffect(() => {
   //    localStorage.setItem('todolists', JSON.stringify(todolists));
   //    localStorage.setItem('tasks', JSON.stringify(tasks));
   // }, [tasks,todolists]);
   // useEffect(() => {
   //    const todolists=localStorage.getItem("todolists")
   //    const tasks=localStorage.getItem("tasks")
   //    setTodolists(todolists && JSON.parse(todolists))
   //    setTasks(tasks && JSON.parse(tasks))
   // }, []);

   const updatePinnedNotes = (noteId: string) => setPinnedNotes([noteId, ...pinnedNotes])
   const inputTexHandler = (e: ChangeEvent<HTMLInputElement>) => setNewNote(e.currentTarget.value)
   const inputTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewNoteTitle(e.currentTarget.value)
   const inputImgHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewNoteImg(e.currentTarget.value)
      addTodolist()
   }
   const imgOnBlurHandler = () => {
      setOpen(true)
   }
   const backgroundHandler = (bg: string) => setNoteBackgroundColor(bg)


   const removeTask = (taskId: string, todolistId: string) => {
      const newTodolistTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
      setTasks(newTodolistTasks)
   }
   const addTask = (todolistId: string) => {
      const newTask = {
         id: "v1()hkj",
         title: newNote,
         isDone: false
      }
      const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
      setTasks(newTodolistTasks)
      setNewNote('')
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
   const addTodolist = () => {
      const todolistId = "v1()bhjk" + todolists.length
      const newTodolist: TodolistType = {
         id: todolistId,
         title: newNoteTitle,
         filter: "forEditing",
         background: noteBackgroundColor,
         flag: isTodoList ? "todo" : "note"
      }
      setTodolists([newTodolist, ...todolists])
      setTasks({...tasks, [todolistId]: []})
      localStorage.setItem("todolists", JSON.stringify(todolists));
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setNoteBackgroundColor("#fff")
   }
   const updateTask = (todolistId: string, taskId: string, title: string) => {
      const newTodolistTasks = {
         ...tasks,
         [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
      }
      setTasks(newTodolistTasks)
   }
   const updateTodolist = (todolistId: string) => {
      let updated = false;
      if (newNote) {
         addTask(todolistId);
         let updatedTodolist=todolists.map(tl=>{
            if (tl.id === todolistId) {
               const filterValue = tl.filter === "forEditing" ? "none" : tl.filter;
               return { ...tl, filter: filterValue };
            }
            return tl})
         setTodolists(updatedTodolist)
      }

      const newTodolists = todolists.map(tl => {
         if (tl.id === todolistId) {
            let updatedTodolist = {...tl};

            if (newNoteTitle && tl.title !== newNoteTitle) {
               updatedTodolist.title = newNoteTitle;
               updatedTodolist.filter = "none";
               updated = true;
               setNewNoteTitle('');
            }

            // Проверяем, отличается ли background в todolist от noteBackgroundColor
            if (noteBackgroundColor && tl.background !== noteBackgroundColor) {
               updatedTodolist.background = noteBackgroundColor;
               updatedTodolist.filter = "none";
               updated = true;
               setNoteBackgroundColor("#fff")
            }

            return updatedTodolist;
         }
         return tl;
      });

      if (updated) {
         setTodolists(newTodolists);
         console.log("updateTodolist", newTodolists);
      }

      setOpen(!isOpen);
   };
   const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
      const newTodolistTasks = {
         ...tasks,
         [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
      }
      setTasks(newTodolistTasks)
   }
   const handleFocus = () => {
      newNoteTitle.length < 1 && setOpen(true)
      addTodolist()
   }
   const toArchiveHandler = () => {
      alert("пока реализован только для заметок")
      const smb = {
         // id: todolists.length + 1,
         text: newNote,
         titleNote: newNoteTitle,
         img: newNoteImg,
         paint: null,
         background: noteBackgroundColor
      }
      setToArchive([...archive, smb])
      setOpen(!isOpen)
      setNewNote('')
      setNewNoteTitle('')
      setNewNoteImg(null)
      setNoteBackgroundColor("#fff")
   }
   // const setText = () => {
   //    const note = {
   //       id: arrNotes.length + 1,
   //       text: newNote,
   //       titleNote: newNoteTitle,
   //       img: newNoteImg,
   //       paint: null,
   //       background: noteBackgroundColor
   //    }
   //    isOpen && (newNote.trim().length > 0 || newNoteTitle.trim().length > 0 || newNoteImg || noteBackgroundColor) ? (setArrNotes([...arrNotes, note]), setOpen(!isOpen)) : setOpen(!isOpen)
   //    console.log("setText");
   //    setNewNote('')
   //    setNewNoteTitle('')
   //    setNewNoteImg(null)
   //    setNoteBackgroundColor("#fff")
   // }
   const listOfShortcutsHandler = (newShortcuts: string) => {
      const newObj = {id: listOfShortcuts.length + 1, name: newShortcuts}
      setListOfShortcuts([...listOfShortcuts, newObj])
   }
   const isTodoHandler = () => setIsTodoList(!isTodoList)
   useEffect(() => {
      if (isTodoList) {
         addTodolist()
      }
   }, [isTodoList]);


   const mausHandl = () => {
      console.log("mausHandl");
      // setText()
      alert("make my")
   }


   console.log("task", tasks[todolists[0].id].length);
   console.log("todolists", todolists);






   return <Box style={{padding: "20px 10px"}} className={cl.containerBox}>
      <KeeLeftBlock listOfShortcuts={listOfShortcuts}/>
      <Box className={cl.centredBox}>
         <Box>
            <Paper square={false} pt={2} pb={2} className={cl.paper} style={{backgroundColor: noteBackgroundColor}}
                   onmouseleave={mausHandl}>
               {/*<Card variant="outlined" sx={{maxWidth: 360}} className={cl.paper} autoFocus onBlur={setText}>*/}
               {todolists.length > 0 && todolists[0].id ?

                  <NoteCreationPanel isOpen={isOpen} isTodoList={isTodoList} handleFocus={handleFocus}
                                     isTodoHandler={isTodoHandler} updatePinnedNotes={updatePinnedNotes}
                                     imgOnBlurHandler={imgOnBlurHandler} inputImgHandler={inputImgHandler}
                                     inputTitleHandler={inputTitleHandler}
                                     inputTexHandler={inputTexHandler} newNoteImg={newNoteImg} addTodolist={addTodolist}
                     // newNoteTitle={newNoteTitle}
                                     newNote={newNote} updateTodolist={updateTodolist}
                                     updateTask={updateTask} addTask={addTask}
                                     removeTask={removeTask} changeTodoFilter={changeFilter}
                                     changeTaskStatus={changeTaskStatus} removeTodolist={removeTodolist}
                     // todolistId={todolists[0].id}
                                     todo={todolists[0]} tasks={tasks[todolists[0].id]}
                  /> : <p>loading ... </p>
               }
               {isOpen &&
                   <InvitationBoxFooter setText={updateTodolist} getBackground={backgroundHandler}
                                        getImg={inputImgHandler}
                                        listOfShortcuts={listOfShortcuts} addNewShortcuts={listOfShortcutsHandler}
                                        isTodoHandler={isTodoHandler} toArchiveHandler={toArchiveHandler}
                                        todoId={todolists[0].id}/>
               }
            </Paper>


            {/*----- drawing todo sheets --------*/}
            <Grid container spacing={1} mt={3}>
               {/*{arrNotes.map(i => <Grid item xs={6} gap={1} spacing={1}> <Note itemNote={i} key={i.id}/> </Grid>)}*/}

               <Box style={{display: "flex"}}>
                  {todolists.map((tl) => {
                     const tasksForTodolist = tasks[tl.id]
                     return tl.filter != 'forEditing' ?

                        <Todolist
                           key={tl.id}
                           todo={tl}
                           tasks={tasksForTodolist}
                           removeTask={removeTask}
                           // changeFilter={changeFilter}
                           addTask={addTask}
                           changeTaskStatus={changeTaskStatus}
                           filter={tl.filter}
                           removeTodolist={removeTodolist}
                           updateTask={updateTask}
                           updateTodolist={updateTodolist}
                           inputTexHandler={inputTexHandler}
                           newNoteImg={newNoteImg}
                           newNote={newNote}
                           isTodoList={isTodoList}
                           updatePinnedNotes={updatePinnedNotes}
                        /> : null

                  })}


               </Box>


            </Grid>
         </Box>
      </Box>

   </Box>


};

export default Keep;