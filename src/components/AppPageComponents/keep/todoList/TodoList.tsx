// import { FilterValuesType, TaskType } from "./App";
import {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "../Keep.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Box, Button, Paper, Typography} from "@mui/material";
// import { AddItemForm } from "./AddItemForm";
// import { EditableSpan } from "./EditableSpan";


type PropsType = {
   todoTitle: string
   todolistId: string
   tasks: TaskType[]
   removeTask: (taskId: string, todolistId: string) => void
   // changeFilter: (filter: FilterValuesType, todolistId: string) => void
   addTask: (todolistId: string) => void
   changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
   filter?: FilterValuesType
   removeTodolist: (todolistId: string) => void
   updateTask: (todolistId: string, taskId: string, title: string) => void
   updateTodolist: (todolistId: string, title: string) => void
   inputTexHandler: (e: ChangeEvent<HTMLInputElement>) => void
   newNote: string
}

export const Todolist = (props: PropsType) => {
   const {
      todoTitle,
      tasks,
      filter,
      removeTask,
      addTask,
      changeTaskStatus,
      todolistId,
      removeTodolist,
      updateTask,
      updateTodolist,
      inputTexHandler,
   } = props

   // const changeFilterTasksHandler = (filter: FilterValuesType) => {
   //     changeFilter(filter, props.todolistId)
   // }

   const removeTodolistHandler = () => {
      removeTodolist(todolistId)
   }

   const addTaskCallback = () => {
      addTask(props.todolistId)
   }

   const updateTodolistHandler = (updatedTodoTitle: string) => {
      updateTodolist(props.todolistId, updatedTodoTitle)
   }

   return (<Paper style={{background: "pink"}}>
      <div className={"todolist-title-container"}>
         <Typography variant={'h3'}>
            <EditableSpan value={todoTitle} onChange={updateTodolistHandler} placeholder={"example todo title"}/>
         </Typography>
         <Button title={'delete'} onClick={removeTodolistHandler}>x</Button>
      </div>

      {tasks.length === 0 ?
         <Box>
            <AddItemForm addItem={inputTexHandler} text={props.newNote} placeholder={"new task"}/>
            <Button title={'add'} onClick={addTaskCallback}>+</Button>
         </Box>
         : <ul>
            {tasks.map((task) => {

               const removeTaskHandler = () => {
                  removeTask(task.id, todolistId)
               }

               const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  const newStatusValue = e.currentTarget.checked
                  changeTaskStatus(task.id, newStatusValue, todolistId)
               }

               const changeTaskTitleHandler = (title: string) => {
                  updateTask(todolistId, task.id, title)
               }

               return <>
                  <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                     <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                     <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                     <Button onClick={removeTaskHandler} title={'x'}>x</Button>
                  </li>
                  <Box>
                     <AddItemForm addItem={inputTexHandler} text={props.newNote} placeholder={"new task"}/>
                     <Button title={'add'} onClick={addTaskCallback}>+</Button>
                  </Box>
               </>
            })}
         </ul>}
      {/*<EditableSpan value={props.todoTitle} onChange={updateTodolistHandler}/>*/}
      {/*<AddItemForm addItem={addTaskCallback} text={props.todoTitle}/>*/}
      {/*<div>*/}
      {/*    <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'} onClick={() => changeFilterTasksHandler('all')}/>*/}
      {/*    <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'} onClick={() => changeFilterTasksHandler('active')}/>*/}
      {/*    <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'} onClick={() => changeFilterTasksHandler('completed')}/>*/}
      {/*</div>*/}
   </Paper>)
}
