import {flagType, TaskType, TodolistType} from "../Keep.tsx";
import {AddItemForm} from "../AddItemForm.tsx";
import {EditableSpan} from "../EditableSpan.tsx";
import {Box, Button, Checkbox, Typography} from "@mui/material";
import keepIcon from "./../../../../assets/notes/keep.svg"
import {ChangeEvent, useEffect} from "react";
import PushPinIcon from '@mui/icons-material/PushPin';
import cl from "./style.ts"

type PropsType = {
   todo: TodolistType
   tasks: TaskType[]
   removeTask: (taskId: string, todolistId: string) => void
   // changeFilter: (filter: FilterValuesType, todolistId: string) => void
   changeFlag: (filter: flagType, todolistId: string) => void
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
      // addTask,
      changeTaskStatus,
      removeTodolist,
      updateTask,
      isTodoList,
   } = props


   // const changeFilterTasksHandler = (filter: FilterValuesType) => {
   //     changeFilter(filter,todo.id)
   // }

   const removeTodolistHandler = () => {
      removeTodolist(todo.id)
   }

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
   return <Box style={{margin: "1px", border: "2px solid red"}}>
      {newNoteImg && newNoteImg.map(i => <Box style={{width: "50px"}}><img src={i} alt={'img'}/></Box>)}
      {todo.filter !== "new" ?
         <>
            <div>
               <p>{todo.id} , </p>
               <p>{todo.flag} , {todo.filter}</p>
            </div>
            <Box className={"todolist-title-container"} style={{display: 'flex', justifyContent: 'space-between'}}>
               <Typography variant={'h4'}>
                  <EditableSpan value={todo.title} onChange={updateTodolistTitleCallback}/>
               </Typography>
               <Button title={'pin a note'} onClick={addPinnedNotesHandler}>
                  <img src={keepIcon} alt={"keepIcon"}/>
                  {/*<PushPinIcon/>*/}
               </Button>
               {/*<Button title={'delete'} onClick={removeTodolistHandler}>x</Button>*/}
            </Box>
            <>{tasks.length>0 ?
               <ul>
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
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                           <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                           <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                           <Button onClick={removeTaskHandler} title={'x'}>x</Button>
                        </li>
                     </>
                  })
                  }
               </ul>
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
                  <p>todo</p>
                  <ul>
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
                           <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                              <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                              {!task.id ?
                                 +<AddItemForm addItem={addTaskCallback} placeholder={"new note"}
                                               style={{height: "30px", width: "100%"}}/>
                                 :
                                 <EditableSpan value={tasks[0].title} onChange={changeTaskTitleHandler}/>
                              }
                              {/*<EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>*/}
                              <Button onClick={removeTaskHandler} title={'x'}>x</Button>
                           </li>
                        </>
                     })}
                  </ul>
                  <Box>+ <AddItemForm addItem={addTaskCallback}/> </Box>
               </>
            }

         </>
      }

   </Box>
}
