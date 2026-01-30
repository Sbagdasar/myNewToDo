import List from "@mui/material/List";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, type Task} from "@/model/tasks-reducer.ts";
import type {ChangeEvent} from "react";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "@/Todolists/TodolistItem/TodolistItem.styles.ts";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import type {Todolist} from "@/app/Main.tsx";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type Props = {todolist:Todolist}
export const Tasks = ({todolist}: Props) => {
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch();


  const todolistTasks = tasks[todolist.id]
  let filteredTasks = todolistTasks
  if (todolist.filter === 'active') {
    filteredTasks = todolistTasks.filter((task: Task) => !task.isDone)
  }
  if (todolist.filter === 'completed') {
    filteredTasks = todolistTasks.filter((task: Task) => task.isDone)
  }
  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map(task => {

            const deleteTask = () => {
              dispatch(deleteTaskAC({todolistId:todolist.id, taskId: task.id}))
            }
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked
              dispatch(changeTaskStatusAC({todolistId:todolist.id, taskId: task.id, isDone: newStatusValue}))
            }
            const changeTaskTitle = (title: string) => {
              dispatch(changeTaskTitleAC({todolistId:todolist.id, taskId: task.id, title}))
            }

            return (
              <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                <div>
                  <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                  <EditableSpan value={task.title} onChange={changeTaskTitle}/>
                </div>
                <IconButton onClick={deleteTask}>
                  <DeleteIcon/>
                </IconButton>
              </ListItem>
            )
          })}
        </List>
      )}
    </>
  );
};

