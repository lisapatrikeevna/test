import {ChangeEvent, ComponentPropsWithoutRef, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";


type PropsType = {
    addItem: (text:string) => void
    placeholder?:string
    fullWidth?:boolean
    variant?: string
}& ComponentPropsWithoutRef<"input">

export const AddItemForm = ({addItem,placeholder,fullWidth,variant="standard",...props}: PropsType) => {

const [text, setText] = useState('')
const addItemHandler = () => {
        if (text.trim() !== '') {
            addItem(text.trim())
            setText('')
        }
    }
const changeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItemHandler()
            console.log("addItemOnKeyUpHandler");
        }
    }

    return (
        <>
            <TextField variant placeholder={placeholder || "Введите заголовок"}
                       style={{borderBottom:0}} value={text} fullWidth={fullWidth || false}
                       onChange={changeItemHandler}
                       onKeyUp={addItemOnKeyUpHandler}
                       onFocus={props.onFocus}
                       onBlur={addItemHandler}
                       {...props}/>
            <Button title={'+'} onClick={addItemHandler}/>
        </>
    )
}


