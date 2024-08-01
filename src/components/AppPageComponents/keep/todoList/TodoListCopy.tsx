import {ChangeEvent} from "react";
import {FilterValuesType, TaskType, TodolistType} from "../Keep.tsx";
import {AddItemForm} from "./AddItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import {Box, Button, Paper, Typography} from "@mui/material";
import keepIcon from "./../../../../assets/notes/keep.svg"

type PropsType = {
   // todoTitle: string
   // todolistId: string
   todo: TodolistType
   tasks: TaskType[]
   // removeTask: (taskId: string, todolistId: string) => void
   // changeFilter: (filter: FilterValuesType, todolistId: string) => void
   addTask: (todolistId: string) => void
   // changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
   filter?: FilterValuesType
   // removeTodolist: (todolistId: string) => void
   // updateTask: (todolistId: string, taskId: string, title: string) => void
   updateTodolist: (todolistId: string, title: string) => void
   inputTexHandler: (e: ChangeEvent<HTMLInputElement>) => void
   newNote: string
   newNoteImg: string | null
   isTodoList: boolean
   updatePinnedNotes: (noteId: string) => void
}

export const Todolist = (props: PropsType) => {
   const {
      todo,
      tasks,
      // removeTask,
      // addTask,
      // changeTaskStatus,
      // removeTodolist,
      // updateTask,
      // updateTodolist,
      inputTexHandler,
      newNoteImg,
      isTodoList,
   } = props

   // const changeFilterTasksHandler = (filter: FilterValuesType) => {
   //     changeFilter(filter, props.todolistId)
   // }
   console.log("task", tasks);
   // const removeTodolistHandler = () => {
   //    removeTodolist(todo.id)
   // }
   //
   // const addTaskCallback = () => {
   //    addTask(todo.id)
   // }
   //
   // const updateTodolistHandler = (updatedTodoTitle: string) => {
   //    updateTodolist(todo.id, updatedTodoTitle)
   // }
   const updatePinnedNotesHandler = () => {
      props.updatePinnedNotes(todo.id)
   }


   return <Paper style={{background: "pink"}}>
      {}
      {newNoteImg && <img src={newNoteImg} alt={"img"}/>}
      <div className={"todolist-title-container"} style={{display: 'flex', justifyContent: 'space-between'}}>
         <Typography variant={'h4'}>
            {/*<EditableSpan value={todo.title} onChange={updateTodolistHandler} placeholder={"enter title"}/>*/}
         </Typography>
         <Button title={'pin a note'} onClick={updatePinnedNotesHandler}>
            <img src={keepIcon} alt={"keepIcon"}/>
         </Button>
         {/*<Button title={'delete'} onClick={removeTodolistHandler}>x</Button>*/}
      </div>

      {tasks.length < 1 && !isTodoList && todo.filter === "forEditing" ?
         <Box style={{border: "2px solid red"}}>
            <p>+</p>
            {/*<input addItem={inputTexHandler} text={props.newNote} placeholder={"new task"}/>*/}
            <AddItemForm addItem={inputTexHandler} text={props.newNote} placeholder={"new task"}/>
            {/*<Button title={'add'} onClick={addTaskCallback}>+</Button>*/}
         </Box>
         : <>
            <ul>
               {tasks.map((task) => {
                  // const removeTaskHandler = () => {
                  //    removeTask(task.id, todo.id)
                  // }
                  // const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                  //    const newStatusValue = e.currentTarget.checked
                  //    changeTaskStatus(task.id, newStatusValue, todo.id)
                  // }
                  const changeTaskTitleHandler = (title: string) => {
                    alert("changeTaskTitleHandler")
                     // updateTask(todo.id, task.id, title)
                  }

                  return <>
                     <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        {/*<input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>*/}
                        <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                        {/*<Button onClick={removeTaskHandler} title={'x'}>x</Button>*/}
                     </li>
                  </>
               })}
            </ul>
            {todo.filter === "forEditing" &&
                <Box style={{border: "2px solid blue"}}>
                    <AddItemForm addItem={inputTexHandler} text={props.newNote} placeholder={"new task"}/>
                    {/*<Button title={'add'} onClick={addTaskCallback}>+</Button>*/}
                </Box>
            }

         </>
      }
      {/*<EditableSpan value={props.todoTitle} onChange={updateTodolistHandler}/>*/}
      {/*<AddItemForm addItem={addTaskCallback} text={props.todoTitle}/>*/}
      {/*<div>*/}
      {/*    <Button className={filter === 'all' ? 'active-filter' : ''} title={'All'} onClick={() => changeFilterTasksHandler('all')}/>*/}
      {/*    <Button className={filter === 'active' ? 'active-filter' : ''} title={'Active'} onClick={() => changeFilterTasksHandler('active')}/>*/}
      {/*    <Button className={filter === 'completed' ? 'active-filter' : ''} title={'Completed'} onClick={() => changeFilterTasksHandler('completed')}/>*/}
      {/*</div>*/}
   </Paper>
}
