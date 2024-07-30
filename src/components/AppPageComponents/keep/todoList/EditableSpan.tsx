import { ChangeEvent, useState ,KeyboardEvent} from "react";
import {TextField} from "@mui/material";

type PropsType = {
   value: string
   onChange: (newTitle: string) => void
   placeholder?:string
};

export const EditableSpan = ({value, onChange,placeholder="enter task"}: PropsType) => {
   const [editMode, setEditMode] = useState(false)
   const [title, setTitle] = useState(value)

   const activateEditModeHandler = () => {
      setEditMode(true)
   }

   const deactivateEditModeHandler = () => {
      setEditMode(false)
      onChange(title)
      setTitle('')
   }

   const changeTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
      setTitle(event.currentTarget.value)
   }
   const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
           setEditMode(false)
           onChange(title)
           setTitle('')
        }
    }

   return (<>
      {editMode ?
         <TextField value={title} onChange={changeTextHandler} onBlur={deactivateEditModeHandler} autoFocus
                    placeholder={placeholder} onKeyUp={addItemOnKeyUpHandler}/>
         : <span onDoubleClick={activateEditModeHandler}>{value.length>0 ? value: placeholder}</span>}
   </>);
};
