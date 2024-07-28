import { Paper, Typography } from "@mui/material";
import { noteType } from "./Keep.tsx";

type propsType={
  itemNote:noteType
}
const Note = ({itemNote}:propsType) => {
  return <>
    <Paper elevation={4} style={{backgroundColor:itemNote.background}}>
      {itemNote.img && <img src={itemNote.img} alt="img"/>}
      {itemNote.titleNote && <Typography>{itemNote.titleNote}</Typography>}
      {itemNote.text && <Typography>{itemNote.text}</Typography>}

    </Paper>
  </>
};

export default Note;