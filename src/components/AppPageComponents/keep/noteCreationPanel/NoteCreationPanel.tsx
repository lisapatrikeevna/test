import {Box} from "@mui/system";
import cl from "../Keep.module.css";
import {IconButton} from "@mui/material";
import Checkbox from "../../../../assets/notes/Checkbox.svg";
import Paintbrush from "../../../../assets/notes/Paintbrush.svg";
import downloadImg from "../../../../assets/notes/Image.svg";
import {ChangeEvent} from "react";
import {FilterValuesType, TaskType, TodolistType, VisuallyHiddenInput} from "../Keep.tsx";
import {Todolist} from "../todoList/TodoList.tsx";

type propsType = {
   isOpen: boolean
   isTodoList: boolean
   handleFocus: () => void
   isTodoHandler: () => void
   imgOnBlurHandler: () => void
   newNoteImg: string | null
   inputTitleHandler: (e: ChangeEvent<HTMLInputElement>) => void
   inputTexHandler: (e: ChangeEvent<HTMLInputElement>) => void
   inputImgHandler: (e: ChangeEvent<HTMLInputElement>) => void
   addTodolist: () => void
   newNote: string
   updateTask: (todolistId: string, taskId: string, title: string) => void
   updateTodolist: (todolistId: string, title: string) => void
   changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
   removeTodolist: (todolistId: string) => void
   changeTodoFilter: (filter: FilterValuesType, todolistId: string) => void
   removeTask: (taskId: string, todolistId: string) => void
   addTask: (todolistId: string) => void
   tasks: Array<TaskType>
   updatePinnedNotes: (noteId: string) => void
   todo: TodolistType
}
const NoteCreationPanel = ({isOpen, newNoteImg, isTodoList, ...props}: propsType) => {

   return (
      <Box className={cl.invitationBox}>
         {/*-----basic block--------*/}

         {!isOpen && !isTodoList ? <Box style={{width: "100%", display: "flex"}}>
               {/*-----block if close--------*/}
               <p onClick={props.handleFocus}>"Заметка…"</p>
               <Box className={cl.boxHeadingBtn}>
                  <IconButton aria-label="Checkbox" onClick={props.isTodoHandler} title={"as todolist"}>
                     <img src={Checkbox} alt="Checkbox"/>
                  </IconButton>
                  <IconButton aria-label="Paintbrush" onClick={() => alert('реализуй меня')}>
                     <img src={Paintbrush} alt="Paintbrush"/>
                  </IconButton>

                  <IconButton aria-label="download" tabIndex={-1} component="label">
                     <img src={downloadImg} alt="downloadImg"/>
                     <VisuallyHiddenInput type="file" onChange={() => props.inputImgHandler}
                                          onBlur={() => props.imgOnBlurHandler}/>
                  </IconButton>
               </Box>
            </Box> :

            <Box>

               <Todolist tasks={props.tasks} removeTask={props.removeTask} todo={props.todo}
                         addTask={props.addTask} newNote={props.newNote} updatePinnedNotes={props.updatePinnedNotes}
                         changeTaskStatus={props.changeTaskStatus} removeTodolist={props.removeTodolist}
                         updateTask={props.updateTask}
                         updateTodolist={props.updateTodolist} inputTexHandler={props.inputTexHandler}
                         newNoteImg={newNoteImg} isTodoList={isTodoList}
               />
               {/*}*/}

            </Box>

         }

      </Box>
   );
};

export default NoteCreationPanel;