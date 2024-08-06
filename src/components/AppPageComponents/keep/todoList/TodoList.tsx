import { TaskType, TodolistType} from "../Keep.tsx";
import {AddItemForm} from "../AddItemForm.tsx";
import {EditableSpan} from "../EditableSpan.tsx";
import {Box, Button, Checkbox, ImageList, ImageListItem, List, ListItem, Typography} from "@mui/material";
import keepIcon from "./../../../../assets/notes/keep.svg"
import React, {ChangeEvent} from "react";
import PushPinIcon from '@mui/icons-material/PushPin';
import cl from "./style.ts"

type PropsType = {
   todo: TodolistType
   tasks: TaskType[]
   removeTask: (taskId: string, todolistId: string) => void
   // changeFilter: (filter: FilterValuesType, todolistId: string) => void
   // changeFlag: (filter: flagType, todolistId: string) => void
   addTask: (todolistId: string,title:string) => void
   changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
   removeTodolist: (todolistId: string) => void
   updateTask: (todolistId: string, taskId: string, title: string) => void
   newNoteImg: Array<string>
   isTodoList: boolean
   updatePinnedNotes: (todoId: string) => void
   addTodoTitle: (todolistId: string, title: string) => void
   updateTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = (props: PropsType) => {
   const {
      newNoteImg,
      todo,
      tasks,
      removeTask,
      changeTaskStatus,
      removeTodolist,
      updateTask,
      isTodoList,
   } = props


   // const changeFilterTasksHandler = (filter: FilterValuesType) => {
   //     changeFilter(filter,todo.id)
   // }

   // const removeTodolistHandler = () => {
   //    removeTodolist(todo.id)
   // }

   const addTaskCallback = (title:string) => {
      props.addTask(todo.id,title)
   }

   const updateTodolistTitleCallback = (updatedTodoTitle: string) => {
      props.updateTodolistTitle(todo.id, updatedTodoTitle)
   }
   const changeTaskTitleCallback = (title: string) => {
      alert("changeTaskTitleHandler")
      updateTask(todo.id, tasks[0].id, title)
   }
   const addPinnedNotesHandler = () => {
      props.updatePinnedNotes(todo.id)
   }
   const addTodoTitleCallback = (todoTitle: string) => {
      props.addTodoTitle(todo.id, todoTitle)
   }

   // console.log("todo", todo);
   // console.log("tasks", tasks);
   return <Box sx={cl.container}>
      {/*{newNoteImg && <ImageList sx={{ width: 500, height: 450 }} cols={3} variant="masonry">*/}
      {newNoteImg && <ImageList variant="woven">
         {newNoteImg.map((imgPath, i) => <ImageListItem key={i} style={{width: "50px"}}>
            <img
               srcSet={`${imgPath}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
               src={`${imgPath}?w=164&h=164&fit=crop&auto=format`}
               alt={'img'}
               loading="lazy"
            />
         </ImageListItem>)}
      </ImageList>}
      {/*{newNoteImg && newNoteImg.map(i => <Box style={{width: "100px"}}><img src={i} alt={'img'} style={{width:'100%'}}/></Box>)}*/}
      {todo.filter !== "new" ?
         <>
            <div>
               <p>{todo.id} , </p>
               <p>{todo.flag} , {todo.filter}</p>
            </div>
            <Box sx={cl.todoTitleContainer} >
               <Typography variant={'h4'}>
                  <EditableSpan value={todo.title} onChange={updateTodolistTitleCallback}/>
               </Typography>
               <Button title={'pin a note'} onClick={addPinnedNotesHandler} sx={cl.btnPinned}>
                  <img src={keepIcon} alt={"keepIcon"}/>
                  {/*<PushPinIcon/>*/}
               </Button>
               {/*<Button title={'delete'} onClick={removeTodolistHandler}>x</Button>*/}
            </Box>
            <>{tasks.length>0 ?
               <List>
                  {tasks.map((task) => {
                     const removeTaskHandler = () => {
                        removeTask(task.id, todo.id)
                     }
                     const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newStatusValue = e.currentTarget.checked
                        changeTaskStatus(task.id, newStatusValue, todo.id)
                     }
                     const changeTaskTitleHandler = (title: string) => {
                        alert("changeTaskTitleHandler")
                        updateTask(todo.id, task.id, title)
                     }

                     return <>
                        <ListItem key={task.id} className={task.isDone ? 'is-done' : ''}>
                           <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                           <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                           <Button onClick={removeTaskHandler} title={'x'}>x</Button>
                        </ListItem>
                     </>
                  })
                  }
               </List>
               : <Box style={{border: "2px solid #000"}}> <AddItemForm addItem={addTaskCallback}
                                                                       placeholder={"+ add task"}/> </Box>
            }
            </>
         </> :
         <>
            <div style={{display: "flex"}}>
               <p>{todo.id} ,</p>
               <p>{todo.flag} ,</p>
               <p>{todo.filter}</p>
            </div>
            <div className={"todolist-title-container"} style={{display: 'flex', justifyContent: 'space-between'}}>
               <Typography variant={'h4'}>
                  {todo.title ?
                     <EditableSpan value={todo.title} onChange={updateTodolistTitleCallback}/>
                     :
                     <AddItemForm addItem={addTodoTitleCallback}/>
                  }
               </Typography>
               <Button title={'pin a note'} onClick={addPinnedNotesHandler}>
                  <img src={keepIcon} alt={"keepIcon"}/>
               </Button>
               {/*<Button title={'delete'} onClick={removeTodolistHandler}>x</Button>*/}
            </div>
            {todo.flag === "note" ?
               <Typography>
                  {!tasks[0] ?
                     <AddItemForm addItem={addTaskCallback} placeholder={"new note"}
                                  style={{height: "30px", width: "100%"}}/>
                     :
                     <EditableSpan value={tasks[0].title} onChange={changeTaskTitleCallback}/>
                  }
               </Typography>
               :
               <>
                  <List sx={cl.ul}>
                     {tasks.map((task) => {
                        const removeTaskHandler = () => {
                           removeTask(task.id, todo.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                           const newStatusValue = e.currentTarget.checked
                           changeTaskStatus(task.id, newStatusValue, todo.id)
                        }
                        const changeTaskTitleHandler = (title: string) => {
                           // alert("changeTaskTitleHandler")
                           updateTask(todo.id, task.id, title)
                        }

                        return <>
                           <ListItem key={task.id} className={task.isDone ? 'is-done' : ''}>
                              <p>{task.id}</p>
                              <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                 <div style={{border:"2px solid red"}}>EditableSpan
                                 <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                 </div>
                              {/*<EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>*/}
                              <Button onClick={removeTaskHandler} title={'x'}>x</Button>
                           </ListItem>
                        </>
                     })}
                  </List>
                  <Box>+ <AddItemForm addItem={addTaskCallback} placeholder={'new task value'}/> </Box>
               </>
            }

         </>
      }

   </Box>
}



