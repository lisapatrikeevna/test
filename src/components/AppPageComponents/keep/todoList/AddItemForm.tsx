import {ChangeEvent, ComponentPropsWithoutRef, KeyboardEvent, useState} from "react";
import {Button, TextField} from "@mui/material";


type PropsType = {
    addItem: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?:string
    fullWidth?:boolean
    variant?: string
    text:string
}& ComponentPropsWithoutRef<"input">

export const AddItemForm = ({text,addItem,placeholder,fullWidth,variant,...props}: PropsType) => {

// const [text, setText] = useState('')
// const [error, setError] = useState<string | null>(null)
// const addItemHandler = () => {
//         if (text.trim() !== '') {
//             addItem(text.trim())
//             setText('')
//             console.log("addItemHandler");
//         }
//         // else {
//         //     setError('Title is required')
//         // }
//     }
// const changeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
//         setText(e.currentTarget.value)
//     }
// const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
//         setError(null)
//         if (event.key === 'Enter') {
//             addItemHandler()
//             console.log("addItemOnKeyUpHandler");
//         }
//     }

    return (
        <>
            {/*<input autoFocus={true} */}
            {/*    className={error ? 'error' : ''}*/}
            {/*    value={text}*/}
            {/*    onChange={changeItemHandler}*/}
            {/*    onKeyUp={addItemOnKeyUpHandler}*/}
            {/*    */}
            {/*/>*/}
            <TextField variant={variant || "standard"} placeholder={placeholder || "Введите заголовок"}
                       style={{borderBottom:0}} value={text} fullWidth={fullWidth || false}
                       onChange={(e)=>addItem(e)}
                       // onKeyUp={addItemOnKeyUpHandler}
                       onFocus={props.onFocus}
                       {...props}/>
            {/*<Button title={'+'} onClick={addItemHandler}/>*/}
            {/*{error && <div className={'error-message'}>{error}</div>}*/}
        </>
    )
}


