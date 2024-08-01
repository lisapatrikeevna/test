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
// const [error, setError] = useState<string | null>(null)
const addItemHandler = () => {
        if (text.trim() !== '') {
            addItem(text.trim())
            setText('')
        }
        // else {
        //     setError('Title is required')
        // }
    }
const changeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }
const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        // setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
            console.log("addItemOnKeyUpHandler");
        }
    }

    return (
        <>
            <TextField variant={variant} placeholder={placeholder || "Введите заголовок"}
                       style={{borderBottom:0}} value={text} fullWidth={fullWidth || false}
                       onChange={changeItemHandler}
                       onKeyUp={addItemOnKeyUpHandler}
                       onFocus={props.onFocus}
                       onBlur={addItemHandler}
                       {...props}/>
            <Button title={'+'} onClick={addItemHandler}/>
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </>
    )
}


