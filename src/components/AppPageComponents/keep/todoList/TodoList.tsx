// import { FilterValuesType, TaskType } from "./App";
import {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "../Keep.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Button} from "@mui/material";
// import { AddItemForm } from "./AddItemForm";
// import { EditableSpan } from "./EditableSpan";


type PropsType = {
   todoTitle: string
   todolistId: string
   tasks: TaskType[]
   removeTask: (taskId: string, todolistId: string) => void
   // changeFilter: (filter: FilterValuesType, todolistId: string) => void
   addTask: (title: string, todolistId: string) => void
   changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
   filter?: FilterValuesType
   removeTodolist: (todolistId: string) => void
   updateTask: (todolistId: string, taskId: string, title: string) => void
   updateTodolist: (todolistId: string, title: string) => void
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
      updateTodolist
   } = props

   // const changeFilterTasksHandler = (filter: FilterValuesType) => {
   //     changeFilter(filter, props.todolistId)
   // }

   const removeTodolistHandler = () => {
      removeTodolist(todolistId)
   }

   const addTaskCallback = (title: string) => {
      addTask(title, props.todolistId)
   }

   const updateTodolistHandler = (e: ChangeEvent<HTMLInputElement>) => {
      updateTodolist(props.todolistId, e.currentTarget.value)
   }

   return (<div>
      <div className={"todolist-title-container"}>
         {/*<p>title example</p>*/}
         <h3><EditableSpan value={todoTitle} onChange={updateTodolistHandler}/></h3>
         <Button title={'x'} onClick={removeTodolistHandler}/>
      </div>

      {tasks.length === 0 ? <p>Тасок нет</p> : <ul>
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

            return <li key={task.id} className={task.isDone ? 'is-done' : ''}>
               <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
               <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
               <Button onClick={removeTaskHandler} title={'x'}/>
            </li>
         })}
      </ul>}
      {/*<EditableSpan value={props.todoTitle} onChange={updateTodolistHandler}/>*/}
      {/*<AddItemForm addItem={addTaskCallback} text={props.todoTitle}/>*/}
      {/*<div>*/}
      {/*    <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'} onClick={() => changeFilterTasksHandler('all')}/>*/}
      {/*    <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'} onClick={() => changeFilterTasksHandler('active')}/>*/}
      {/*    <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'} onClick={() => changeFilterTasksHandler('completed')}/>*/}
      {/*</div>*/}
   </div>)
}
