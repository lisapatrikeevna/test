import {Box} from "@mui/system";
import cl from "../Keep.module.css";
import {IconButton, TextField} from "@mui/material";
import Checkbox from "../../../../assets/notes/Checkbox.svg";
import Paintbrush from "../../../../assets/notes/Paintbrush.svg";
import downloadImg from "../../../../assets/notes/Image.svg";
import {ChangeEvent} from "react";
import {AddItemForm} from "../todoList/AddItemForm.tsx";
import {VisuallyHiddenInput} from "../Keep.tsx";


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
}
const NoteCreationPanel = ({isOpen, newNoteImg, isTodoList, ...props}: propsType) => {

   return (
      <Box className={cl.invitationBox}>
         {/*-----basic block--------*/}
         {!isOpen ? <Box style={{width:"100%", display:"flex"}}>

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
               <>
                  {newNoteImg && <img src={newNoteImg} alt={"img"}/>}
                  <Box className={cl.wrapInput}>
                     <AddItemForm addItem={props.inputTitleHandler} fullWidth={true}/>
                  </Box>
               </>

               {!isTodoList &&
                   <Box className={cl.boxHeading}>
                       <Box className={cl.wrapInput}>
                           <AddItemForm addItem={props.inputTexHandler} fullWidth={true}
                                        placeholder={"Заметка…"} autoFocus/>
                       </Box>
                   </Box>
               }

            </Box>

         }


         {/*    :<Box>*/}
         {/*        <p>'todo block'</p>*/}
         {/*        <Box>*/}
         {/*            /!*<Checkbox checked={true} onCange={() => alert('make my')}/>*!/*/}
         {/*            <TextField value={'todo text'} onChange={() => {}}/>*/}
         {/*            /!*<IconButton delet*!/*/}
         {/*        </Box>*/}


         {/*        /!*<div className="App">*!/*/}
         {/*        /!*    <AddItemForm addItem={props.addTodolist}/>*!/*/}
         {/*            /!*{todolists.map((tl) => {*!/*/}

         {/*            /!*    const allTodolistTasks = tasks[tl.id]*!/*/}
         {/*            /!*    let tasksForTodolist = allTodolistTasks*!/*/}

         {/*            /!*    if (tl.filter === 'active') {*!/*/}
         {/*            /!*        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)*!/*/}
         {/*            /!*    }*!/*/}

         {/*            /!*    if (tl.filter === 'completed') {*!/*/}
         {/*            /!*        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)*!/*/}
         {/*            /!*    }*!/*/}

         {/*            /!*    return <Todolist*!/*/}
         {/*            /!*        key={tl.id}*!/*/}
         {/*            /!*        todolistId={tl.id}*!/*/}
         {/*            /!*        title={tl.title}*!/*/}
         {/*            /!*        tasks={tasksForTodolist}*!/*/}
         {/*            /!*        removeTask={removeTask}*!/*/}
         {/*            /!*        changeFilter={changeFilter}*!/*/}
         {/*            /!*        addTask={addTask}*!/*/}
         {/*            /!*        changeTaskStatus={changeTaskStatus}*!/*/}
         {/*            /!*        filter={tl.filter}*!/*/}
         {/*            /!*        removeTodolist={removeTodolist}*!/*/}
         {/*            /!*        updateTask={updateTask}*!/*/}
         {/*            /!*        updateTodolist={updateTodolist}*!/*/}
         {/*            /!*    />*!/*/}
         {/*            /!*})}*!/*/}
         {/*        /!*</div>*!/*/}


         {/*    </Box>*/}
         {/*}*/}

      </Box>
   );
};

export default NoteCreationPanel;