import React, { ChangeEvent, useState, useEffect } from 'react';
import { Box, Grid, IconButton, Paper } from "@mui/material";
import { styled } from "@mui/system";
import cl from "./style";
import InvitationBoxFooter from "./appPageInvitationBoxFooter/InvitationBoxFooter";
import KeeLeftBlock from "./keeLeftBlock/KeeLeftBlock";
import { Todolist } from "./todoList/TodoList";
import Checkbox from "../../../assets/notes/Checkbox.svg";
import Paintbrush from "../../../assets/notes/Paintbrush.svg";
import downloadImg from "../../../assets/notes/Image.svg";
import { title as projectTitle } from "../../../configs/ProjectConfig";

export const VisuallyHiddenInput = styled('input')({
   clip: 'rect(0 0 0 0)',
   clipPath: 'inset(50%)',
   height: 1,
   overflow: 'hidden',
   position: 'absolute',
   bottom: 0,
   left: 0,
   whiteSpace: 'nowrap',
   width: 1,
});

export type TaskType = {
   id: string;
   title: string;
   isDone: boolean;
};

export type FilterValuesType = 'fixed' | 'archive' | 'none' | 'forEditing' | 'new';

export type TodolistType = {
   background: string ;
   id: string;
   title: string;
   filter?: FilterValuesType;
   flag: FlagType;
};

export type TasksStateType = {
   [key: string]: TaskType[];
};

export type ImgStateType = {
   [key: string]: string[];
};

export type ShortcutsType = {
   id: number;
   name: string;
};

export type FlagType = "note" | "todo";

const Keep: React.FC = () => {
   const [isOpen, setOpen] = useState<boolean>(false);
   const [isTodoList, setIsTodoList] = useState<boolean>(false);
   const [pinnedNotes, setPinnedNotes] = useState<string[]>([]);
   const [listOfShortcuts, setListOfShortcuts] = useState<ShortcutsType[]>([]);
   const [archive, setToArchive] = useState<string[]>([]);
   const [todolists, setTodolists] = useState<TodolistType[]>([
      { id: "j123", title: 'What to learn', filter: 'none', background: "#fff", flag: "todo" },
      { id: "v1()", title: 'What to buy', filter: 'none', background: "#fff", flag: "todo" },
      { id: "jhji", title: 'delete note component', filter: 'none', background: "#fff", flag: "note" },
   ]);
   const [tasks, setTasks] = useState<TasksStateType>({
      "j123": [
         { id: "12ml3", title: 'HTML&CSS', isDone: true },
         { id: "19l0", title: 'JS', isDone: true },
         { id: "nij", title: 'ReactJS', isDone: false },
      ],
      "v1()": [
         { id: "hbnjk", title: 'Rest API', isDone: true },
         { id: "bjjh", title: 'GraphQL', isDone: false },
      ],
      "jhji": []
   });
   const [imgLists, setImg] = useState<ImgStateType>({
      "j123": [],
      "v1()": ["https://k6.uzor.su/uploads/posts/2020-05/thumbs/1588356018_610x900_563.jpg"],
      "jhji": []
   });

   useEffect(() => {
      const todolists = localStorage.getItem("todolists");
      const tasks = localStorage.getItem("tasks");
      if (todolists) setTodolists(JSON.parse(todolists));
      if (tasks) setTasks(JSON.parse(tasks));
   }, []);

   useEffect(() => {
      localStorage.setItem('todolists', JSON.stringify(todolists));
      localStorage.setItem('tasks', JSON.stringify(tasks));
   }, [tasks, todolists]);

   const updatePinnedNotes = (noteId: string) => setPinnedNotes([noteId, ...pinnedNotes]);

   const backgroundHandler = (todolistId: string, bg: string) => {
      const newTodolists = todolists.map(tl => tl.id === todolistId ? { ...tl, background: bg } : tl);
      setTodolists(newTodolists);
   };

   const addNewImg = (e: ChangeEvent<HTMLInputElement>) => {
      const newNoteImg = e.currentTarget.value;
      if (!isOpen) {
         setOpen(true);
         addTodolist();
         setImg(prevImgLists => ({
            ...prevImgLists,
            [todolists[0]!.id]: [...(prevImgLists[todolists[0]!.id] || []), newNoteImg]
         }));
      } else {
         setImg(prevImgLists => ({
            ...prevImgLists,
            [todolists[0]!.id]: [...(prevImgLists[todolists[0]!.id] || []), newNoteImg]
         }));
      }
   };

   const addTodoTitle = (todolistId: string, title: string) => {
      const updatedTodo = todolists.map(tl => tl.id === todolistId ? { ...tl, title } : tl);
      setTodolists(updatedTodo);
   };

   const removeTodolist = (todolistId: string) => {
      const newTodolists = todolists.filter(tl => tl.id !== todolistId);
      setTodolists(newTodolists);
      setOpen(false);
      const { [todolistId]: _, ...newTasks } = tasks;
      setTasks(newTasks);
   };

   const removeTask = (taskId: string, todolistId: string) => {
      const newTodolistTasks = { ...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId) };
      setTasks(newTodolistTasks);
   };

   const addTask = (todolistId: string) => {
      const newTask = {
         id: "v1()hkj" + tasks[todolistId].length,
         title: projectTitle,
         isDone: false
      };
      const newTodolistTasks = { ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] };
      setTasks(newTodolistTasks);
   };

   const addTodolist = () => {
      const todolistId = "v1()bhjk" + todolists.length;
      const newTodolist: TodolistType = {
         id: todolistId,
         title: '',
         filter: "new",
         background: "#fff",
         flag: "note"
      };
      setTodolists([newTodolist, ...todolists]);
      setTasks({ ...tasks, [todolistId]: [] });
   };

   const updateTask = (todolistId: string, taskId: string, title: string) => {
      const newTodolistTasks = {
         ...tasks,
         [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, title } : t)
      };
      setTasks(newTodolistTasks);
   };

   const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
      const newTodolistTasks = {
         ...tasks,
         [todolistId]: tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone: taskStatus } : t)
      };
      setTasks(newTodolistTasks);
   };

   const updateTodolistTitle = (todolistId: string, title: string) => {
      const newTodolists = todolists.map(tl => tl.id === todolistId ? { ...tl, title } : tl);
      setTodolists(newTodolists);
   };

   const handleFocus = () => {
      if (!isOpen) {
         setOpen(true);
         addTodolist();
      }
   };

   const toArchiveHandler = (id: string) => {
      setToArchive([...archive, id]);
      setOpen(!isOpen);
   };

   const listOfShortcutsHandler = (newShortcuts: string) => {
      const newObj = { id: listOfShortcuts.length + 1, name: newShortcuts };
      setListOfShortcuts([...listOfShortcuts, newObj]);
   };

   const isTodoHandler = () => setIsTodoList(!isTodoList);

   const onClose = (todolistId: string) => {
      const newTodolists = todolists.map(tl => tl.id === todolistId ? { ...tl, filter: 'none' } : tl);
      setTodolists(newTodolists);
      setOpen(!isOpen);
   };

   const setTodoFlag_3 = (flag: string) => {
      addTodolist();
      setIsTodoList(!isTodoList);
      const newTodolists = todolists.map(tl => tl.id === todolists[0].id ? { ...tl, flag } : tl);
      setTodolists(newTodolists);
   };

   const changeFilter = (filter: FilterValuesType, todolistId: string) => {
      const newTodolists = todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl);
      setTodolists(newTodolists);
   };

   return (
      <Box style={{ padding: "20px 10px" }} className={cl.containerBox}>
         <KeeLeftBlock listOfShortcuts={listOfShortcuts} />
         <Box className={cl.centredBox}>
            <Box>
               <Paper square={false} pt={2} pb={2} className={cl.paper} style={{ backgroundColor: todolists[0].background }}>
                  {todolists.length > 0 && todolists[0].id ? (
                     <Box className={cl.invitationBox}>
                        {!isOpen && !isTodoList ? (
                           <Box style={{ width: "100%", display: "flex" }}>
                              <p onClick={handleFocus}>Заметка…</p>
                              <Box className={cl.boxHeadingBtn}>
                                 <IconButton aria-label="Checkbox" onClick={() => setTodoFlag_3("todo")} title={"as todolist"}>
                                    <img src={Checkbox} alt="Checkbox" />
                                 </IconButton>
                                 <IconButton aria-label="Paintbrush" onClick={() => alert('реализуй меня')}>
                                    <img src={Paintbrush} alt="Paintbrush" />
                                 </IconButton>
                                 <IconButton aria-label="download" tabIndex={-1} component="label">
                                    <img src={downloadImg} alt="downloadImg" />
                                    <VisuallyHiddenInput type="file" onChange={(e: ChangeEvent<HTMLInputElement>) => addNewImg(e)} />
                                 </IconButton>
                              </Box>
                           </Box>
                        ) : (
                           <>
                              <Todolist
                                 tasks={tasks[todolists[0].id]}
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
                              <InvitationBoxFooter
                                 onClose={onClose}
                                 getBackground={backgroundHandler}
                                 getImg={addNewImg}
                                 listOfShortcuts={listOfShortcuts}
                                 removeTodolist={removeTodolist}
                                 addNewShortcuts={listOfShortcutsHandler}
                                 isTodoHandler={isTodoHandler}
                                 toArchiveHandler={toArchiveHandler}
                                 todoId={todolists[0].id}
                              />
                           </>
                        )}
                     </Box>
                  ) : (
                     <p>loading ... </p>
                  )}
               </Paper>

               <Grid container spacing={1} mt={3} style={{ flexWrap: "wrap", gap: 20 }}>
                  {todolists.map((tl) => {
                     const tasksForTodolist = tasks[tl.id];
                     const newNoteImg = imgLists[tl.id];
                     return (tl.filter !== 'new' && tl.filter !== 'archive') ? (
                        <Paper key={tl.id} style={{ backgroundColor: tl.background, width: "240px" }}>
                           <Todolist
                              todo={tl}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              removeTodolist={removeTodolist}
                              updateTask={updateTask}
                              newNoteImg={newNoteImg}
                              isTodoList={isTodoList}
                              updatePinnedNotes={updatePinnedNotes}
                              updateTodolistTitle={updateTodolistTitle}
                           />
                        </Paper>
                     ) : null;
                  })}
               </Grid>
            </Box>
         </Box>
      </Box>
   );

};

export default Keep;