import {CreateItemForm} from '@/CreateItemForm.tsx'
import type {Todolist} from "@/app/Main.tsx";
import {createTaskAC} from "@/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TodolistTitle} from "@/Todolists/TodolistTitle/TodolistTitle.tsx";
import {Tasks} from "@/Tasks/Tasks.tsx";
import {FilterButtons} from "@/FilterButtons/FilterButtons.tsx";

type Props = {
  todolist: Todolist
}

export const TodolistItem = ({todolist}: Props) => {
  const dispatch = useAppDispatch();

  const createTask = (title: string) => {
    dispatch(createTaskAC({title, todolistId: todolist.id}))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist}/>
      <CreateItemForm onCreateItem={createTask}/>
      <Tasks todolist={todolist}/>
      <FilterButtons todolist={todolist}/>
    </div>
  )
}
