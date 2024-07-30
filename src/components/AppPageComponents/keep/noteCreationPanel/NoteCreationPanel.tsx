import {Box} from "@mui/system";
import cl from "../Keep.module.css";
import {IconButton, TextField} from "@mui/material";
import Checkbox from "../../../../assets/notes/Checkbox.svg";
import Paintbrush from "../../../../assets/notes/Paintbrush.svg";
import downloadImg from "../../../../assets/notes/Image.svg";
import {ChangeEvent} from "react";
import {AddItemForm} from "../todoList/AddItemForm.tsx";
import {FilterValuesType, TaskType, VisuallyHiddenInput} from "../Keep.tsx";
import keepIcon from "../../../../assets/notes/keep.svg";
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
   newNoteTitle: string
   updateTask:(todolistId: string, taskId: string, title: string)=>void
   updateTodolist:(todolistId: string, title: string)=>void
   changeTaskStatus:(taskId: string, taskStatus: boolean, todolistId: string)=>void
   removeTodolist:(todolistId: string)=>void
   changeTodoFilter:(filter: FilterValuesType, todolistId: string)=>void
   removeTask:(taskId: string, todolistId: string)=>void
   addTask:( todolistId: string)=>void
   todolistId:string
   tasks:Array<TaskType>
}
const NoteCreationPanel = ({isOpen, newNoteImg, isTodoList, ...props}: propsType) => {

   return (
      <Box className={cl.invitationBox}>
         {/*-----basic block--------*/}

         {!isOpen && !isTodoList ? <Box style={{width:"100%", display:"flex"}}>
               {/*-----block if close--------*/}
               <p onClick={props.handleFocus}>"Заметка…"</p>
               <Box className={cl.boxHeadingBtn}>
                  <IconButton aria-label="Checkbox" onClick={props.isTodoHandler}>
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
               {/*-----block if open--------*/}
               {/*<>*/}
                  {newNoteImg && <img src={newNoteImg} alt={"img"}/>}
               {/*   <Box className={cl.wrapInput}>*/}
               {/*      <AddItemForm addItem={props.inputTitleHandler} fullWidth={true}/>*/}
               {/*      <IconButton onClick={()=>alert('Make me')}><img src={keepIcon} alt={"keepIcon"}/> </IconButton>*/}
               {/*   </Box>*/}
               {/*</>*/}

               {!isTodoList ?
                   <Box className={cl.boxHeading}>
                      <Box className={cl.wrapInput}>
                         <AddItemForm addItem={props.inputTitleHandler} fullWidth={true}/>
                         <IconButton onClick={()=>alert('Make me')}><img src={keepIcon} alt={"keepIcon"}/> </IconButton>
                      </Box>
                       <Box className={cl.wrapInput}>
                           <AddItemForm addItem={props.inputTexHandler} fullWidth={true}
                                        placeholder={"Заметка…"} autoFocus/>
                       </Box>
                   </Box>:
                  <Todolist todoTitle={props.newNoteTitle} todolistId={props.todolistId} tasks={props.tasks} removeTask={props.removeTask} addTask={props.addTask}
                            changeTaskStatus={props.changeTaskStatus} removeTodolist={props.removeTodolist} updateTask={props.updateTask}
                            updateTodolist={props.updateTodolist} inputTexHandler={props.inputTexHandler}
                            />
               }

            </Box>

         }

      </Box>
   );
};

export default NoteCreationPanel;