import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import type {Todolist} from "@/app/Main.tsx";
import {changeTodolistTitleAC, deleteTodolistAC} from "@/model/todolists-reducer.ts";
import {EditableSpan} from "@/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  todolist: Todolist
}

export const TodolistTitle = ({todolist}: Props) => {
  const {id, title} = todolist

  const dispatch = useAppDispatch()

  const deleteTodolist = () => {
    dispatch(deleteTodolistAC({id}))
  }

  const changeTodolistTitle = (title: string) => {
    dispatch(changeTodolistTitleAC({id, title}))
  }

  return (
    <div className={'container'}>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle}/>
      </h3>
      <IconButton onClick={deleteTodolist}>
        <DeleteIcon/>
      </IconButton>
    </div>
  )
}