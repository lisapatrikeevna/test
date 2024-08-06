import React, {ChangeEvent, useEffect, useState} from 'react';
import {Box, Grid, IconButton, Paper, Typography} from "@mui/material";
import {styled} from "@mui/system";
import cl from "./style.ts";
import InvitationBoxFooter from "./appPageInvitationBoxFooter/InvitationBoxFooter.tsx";
import KeeLeftBlock from "./keeLeftBlock/KeeLeftBlock.tsx";
import {Todolist} from "./todoList/TodoList.tsx";
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import BrushIcon from '@mui/icons-material/Brush';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';


export const VisuallyHiddenInput = styled('input')({
   clip: 'rect(0 0 0 0)', clipPath: 'inset(50%)',
   height: 1, overflow: 'hidden', position: 'absolute',
   bottom: 0, left: 0, whiteSpace: 'nowrap', width: 1,
});


export type TaskType = {
   id: string
   title: string
   isDone: boolean
}
export type FilterValuesType = 'fixed' | 'archive' | 'none' | 'forEditing' | 'new'

export type TodolistType = {
   background: string
   id: string
   title: string
   filter?: FilterValuesType
   flag: flagType
}
export type TasksStateType = {
   [key: string]: TaskType[]
}
export type ImgStateType = {
   [key: string]: string[]
}
export type shortcutsType = {
   id: number
   name: string
}
export type flagType = "note" | "todo"


const Keep = () => {
   const [isOpen, setOpen] = useState(false)
   const [isTodoList, setIsTodoList] = useState(false)
   const [pinnedNotes, setPinnedNotes] = useState<Array<string>>([])
   const [listOfShortcuts, setListOfShortcuts] = useState<Array<shortcutsType>>([])
   const [archive, setToArchive] = useState<Array<string>>([])
   const [initialized, setInitialized] = useState(false)
   const [todolists, setTodolists] = useState<TodolistType[]>(
      [{id: "j123", title: 'What to learn', filter: 'none', background: "#fff", flag: "todo"},
         {id: "v1()", title: 'What to buy', filter: 'none', background: "#fff", flag: "todo"},
         {id: "jhji", title: 'delete note component', filter: 'none', background: "#fff", flag: "note"},
      ])
   const [tasks, setTasks] = useState<TasksStateType>({
      "j123": [
         {id: "12ml3", title: 'HTML&CSS', isDone: true},
         {id: "19l0", title: 'JS', isDone: true},
         {id: "nij", title: 'ReactJS', isDone: false},
      ],
      "v1()": [
         {id: "hbnjk", title: 'Rest API', isDone: true},
         {id: "bjjh", title: 'GraphQL', isDone: false},
      ],
      "jhji": []
   })
   const [imgLists, setImg] = useState<ImgStateType>({
      ["j123"]: ["https://images.unsplash.com/photo-1516802273409-68526ee1bdd6"],
      ["v1()"]: ["https://images.unsplash.com/photo-1551963831-b3b1ca40c98e","https://images.unsplash.com/photo-1551782450-a2132b4ba21d","https://images.unsplash.com/photo-1471357674240-e1a485acb3e1"],
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

   const updatePinnedNotes = (noteId: string) => {
      // setPinnedNotes([noteId, ...pinnedNotes])
      setPinnedNotes(prevPinnedNotes => {
         if (prevPinnedNotes.includes(noteId)) {
            return prevPinnedNotes.filter(id => id !== noteId);
         } else {
            return [noteId, ...prevPinnedNotes];
         }
      });
   }
   const backgroundHandler = (todolistId: string, bg: string) => {
      const newTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, background: bg} : tl)
      setTodolists(newTodolists)
   }
   const addNewImg = (e: ChangeEvent<HTMLInputElement>) => {
      const newNoteImg = e.currentTarget.value
      const todoId = todolists[0].id
      if (!isOpen && todoId) {
         setOpen(true)
         addTodolist()
         setImg(prevImgLists => ({
            ...prevImgLists,
            [todolists[0]!.id]: [...(prevImgLists[todoId] || []), newNoteImg]
         }))
      } else {
         // console.log(imgLists[1]);
         setImg(prevImgLists => ({
            ...prevImgLists,
            [todolists[0]!.id]: [...(prevImgLists[todoId] || []), newNoteImg]
         }));
      }
   }
   // const imgOnBlurHandler = () => {
   //    setOpen(true)
   // }
   const addTodoTitle = (todolistId: string, title: string) => {
      const updatedTodo = todolists.map(tl => tl.id == todolistId ? {...tl, title} : tl)
      setTodolists(updatedTodo)
   }
   const removeTodolist = (todolistId: string) => {
      const newTodolists = todolists.filter(tl => tl.id !== todolistId)
      setTodolists(newTodolists)
      setOpen(false)
      setIsTodoList(false)
      delete tasks[todolistId]
      setTasks({...tasks})
   }
   const removeTask = (taskId: string, todolistId: string) => {
      const newTodolistTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
      setTasks(newTodolistTasks)
   }
   const addTask = (todolistId: string,title:string) => {
      const newTask = {
         id: "v1()hkj"+tasks[todolistId].length,
         title: title,
         isDone: false
      }
      const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
      setTasks(newTodolistTasks)
   }
   const addTodolist = () => {
      const todolistId = "v1()bhjk" + todolists.length
      const newTodolist: TodolistType = {
         id: todolistId,
         title: '',
         filter: "new",
         background: "#fff",
         flag: "note"
      }
      setTodolists([newTodolist, ...todolists])
      setTasks({...tasks, [todolistId]: []})
      // localStorage.setItem("todolists", JSON.stringify(todolists));
      // localStorage.setItem("tasks", JSON.stringify(tasks));
   }
   const updateTask = (todolistId: string, taskId: string, title: string) => {
      const newTodolistTasks = {
         ...tasks,
         [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
      }
      setTasks(newTodolistTasks)
   }
   const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
      alert("fix my")
      const newTodolistTasks = {
         ...tasks,
         [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
      }
      setTasks(newTodolistTasks)
   }
   const updateTodolistTitle = (todolistId: string, title: string) => {
      const newTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl)
      setTodolists(newTodolists)
   }
   const handleFocus = () => {
      if (!isOpen) {
         setOpen(true)
         addTodolist()
      }
   }
   const toArchiveHandler = (id: string) => {
      alert("test my")
      setToArchive([...archive, id])
      setOpen(!isOpen)
   }

   const listOfShortcutsHandler = (newShortcuts: string) => {
      alert("tested my")
      //    const newObj = {id: listOfShortcuts.length + 1, name: newShortcuts}
      //    setListOfShortcuts([...listOfShortcuts, newObj])
   }

   const isTodoHandler = () => {
      setIsTodoList(!isTodoList)
      if(!isOpen){
         addTodolist()
         setOpen(!isOpen)
      }
      // changeFlag(todolists[0].id)
   }
   useEffect(() => {
      addTodolist();
   }, []);
   useEffect(() => {
      changeFlag(todolists[0].id)
   }, [isTodoList]);
   // useEffect(() => {
   //    // alert("changeFlag for todo")
   //    // isTodoList? changeFlag("todo", todolists[0].id):changeFlag("note", todolists[0].id)
   //    if (initialized) {
   //       isTodoList ? changeFlag("todo", todolists[0].id) : changeFlag("note", todolists[0].id)
   //    } else {
   //       setInitialized(true);
   //    }
   // }, [ isTodoList]);

   const changeFlag = (todolistId: string) => {
      const flag = isTodoList ? "todo" : "note";
      const newTodolists=todolists.map(tl => tl.id !== todolistId ? {...tl, flag: flag as flagType, filter: "new" as FilterValuesType} : tl )
      setTodolists(newTodolists)
   }

   const onClose = (todolistId: string) => {
      // сделать проверку не пустой ли
      const newTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, filter: 'none'as FilterValuesType} : tl)
      setTodolists(newTodolists)
      setOpen(false)
      setIsTodoList(false)
   }

   const changeFilter = (filter: FilterValuesType, todolistId: string) => {
      const newTodolists = todolists.map(tl => {
         return tl.id === todolistId ? {...tl, filter} : tl
      })
      setTodolists(newTodolists)
   }

   const mausHandl = () => {
      alert("mausHandl make my");
      // const todolistId=todolists[0].id
      // const newTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, filter: 'none'} : tl)
      // setTodolists(newTodolists)
      // setOpen(!isOpen)
   }


   const getPinnedTodolists = () => {
      return todolists.filter(todolist => pinnedNotes.includes(todolist.id));
   };

   // const getActiveTodolists = () => {
   //    return todolists.filter(todolist => !archive.includes(todolist.id) && todolist.filter !== 'archive');
   // };
   const getActiveTodolists = () => {
      return todolists.filter(todolist => !archive.includes(todolist.id) && !pinnedNotes.includes(todolist.id) && todolist.filter !== 'archive');
   };

   const pinnedTodolists = getPinnedTodolists();
   const activeTodolists = getActiveTodolists();


   console.log(todolists);
   return <Box sx={cl.containerBox} >
      <KeeLeftBlock listOfShortcuts={listOfShortcuts}/>
      <Box sx={cl.centredBox}>
         <Box>
            <Paper square={false} sx={cl.paper} style={{backgroundColor: todolists[0].filter=="new"? todolists[0].background: "#fff"}}
               // onmouseleave={mausHandl} autoFocus onBlur={setText}>  sx={{maxWidth: 360}}
            >
               {todolists.length > 0 && todolists[0].id ?

                  <Box sx={cl.invitationBox}>
                     {/*-----basic block--------*/}

                     {!isOpen ?
                        <Box style={{width: "100%", display: "flex"}} sx={cl.closedBox}>
                           {/*-----block if close--------*/}
                           <Typography variant={"h3"} onClick={handleFocus}>Note...</Typography>
                           <Box sx={cl.boxHeadingBtn}>
                              {/*<IconButton aria-label="Checkbox" onClick={() => setTodoFlag_3("todo")}*/}
                              <IconButton aria-label="Checkbox" onClick={isTodoHandler}
                                          title={"as todolist"}>
                                 {/*<img src={Checkbox} alt="Checkbox"/>*/}
                                 <CheckBoxOutlinedIcon color="inherit"/>
                              </IconButton>
                              <IconButton aria-label="Paintbrush" onClick={() => alert('реализуй меня')}>
                                 {/*<img src={Paintbrush} alt="Paintbrush"/>*/}
                                 <BrushIcon/>
                              </IconButton>

                              <IconButton aria-label="download" tabIndex={-1} component="label">
                                 {/*<img src={downloadImg} alt="downloadImg"/>*/}
                                 <AddPhotoAlternateOutlinedIcon/>
                                 <VisuallyHiddenInput type="file"
                                                      onChange={(e: ChangeEvent<HTMLInputElement>) => addNewImg(e)}
                                    // onBlur={() => imgOnBlurHandler}
                                 />
                              </IconButton>
                           </Box>
                        </Box> :
                        <>
                           <Todolist tasks={tasks[todolists[0].id]}
                                     removeTask={removeTask}
                                     todo={todolists[0]}
                                     addTask={addTask}
                                     updatePinnedNotes={updatePinnedNotes}
                                     changeTaskStatus={changeTaskStatus}
                                     removeTodolist={removeTodolist}
                                     updateTask={updateTask}
                                     newNoteImg={imgLists[todolists[0].id]}
                                     isTodoList={isTodoList}
                                     addTodoTitle={addTodoTitle}
                                     updateTodolistTitle={updateTodolistTitle}
                           />

                           <InvitationBoxFooter onClose={onClose} getBackground={backgroundHandler}
                                                getImg={addNewImg}
                                                listOfShortcuts={listOfShortcuts}
                                                removeTodolist={removeTodolist}
                                                addNewShortcuts={listOfShortcutsHandler}
                                                isTodoHandler={isTodoHandler}
                                                toArchiveHandler={toArchiveHandler}
                                                todoId={todolists[0].id}
                                                taskLength={tasks[todolists[0].id].length}
                                                isTodoList={isTodoList}
                           />
                        </>
                     }
                  </Box>
                  : <p>loading ... </p>}


            </Paper>


            {/*----- drawing todo sheets --------*/}
            <>
               <Typography variant={"h3"}>Pinned notes </Typography>
               {todolists.map(t=><Box>{t.id}, {t.filter} , {t.title}</Box>)}
            <Grid container spacing={1} mt={3} style={{flexWrap: "wrap", gap: 20,}}>
               {pinnedNotes.map(id => <p>{id}</p>)}
               {pinnedTodolists.map((tl) => {

                  const tasksForTodolist = tasks[tl.id]
                  const newNoteImg = imgLists[tl.id]
                  return (tl.filter != 'new' && tl.filter != 'archive') ?
                     <Paper key={tl.id} style={{backgroundColor: tl.background}} sx={cl.todoWrap}>
                     {/*<Paper key={tl.id} style={{backgroundColor: tl.background, width: "240px"}}>*/}
                        <Todolist
                           todo={tl}
                           tasks={tasksForTodolist}
                           removeTask={removeTask}
                           addTask={addTask}
                           updatePinnedNotes={updatePinnedNotes}
                           changeTaskStatus={changeTaskStatus}
                           removeTodolist={removeTodolist}
                           updateTask={updateTask}
                           newNoteImg={newNoteImg}
                           isTodoList={isTodoList}
                           addTodoTitle={addTodoTitle}
                           updateTodolistTitle={updateTodolistTitle}
                        /> </Paper> : null

               })}
            </Grid>
            </>

            <Grid container spacing={1} mt={3} style={{flexWrap: "wrap", gap: 20,}}>

               {/*<Box style={{display: "flex"}}>*/}
               {activeTodolists.map((tl) => {

                  const tasksForTodolist = tasks[tl.id]
                  const newNoteImg = imgLists[tl.id]
                  return (tl.filter != 'new' && tl.filter != 'archive') ?
                     <Paper key={tl.id} style={{backgroundColor: tl.background, width: "240px"}}>
                        <Todolist
                           todo={tl}
                           tasks={tasksForTodolist}
                           removeTask={removeTask}
                           addTask={addTask}
                           updatePinnedNotes={updatePinnedNotes}
                           changeTaskStatus={changeTaskStatus}
                           removeTodolist={removeTodolist}
                           updateTask={updateTask}
                           newNoteImg={newNoteImg}
                           isTodoList={isTodoList}
                           addTodoTitle={addTodoTitle}
                           updateTodolistTitle={updateTodolistTitle}
                        /> </Paper> : null

               })}


            </Grid>
         </Box>
      </Box>

   </Box>


};

export default Keep;














