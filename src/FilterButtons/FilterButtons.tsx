import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import type {FilterValues, Todolist} from "@/app/Main.tsx";
import {changeTodolistFilterAC} from "@/model/todolists-reducer.ts";
import {Box} from "@mui/material";
import {containerSx} from "@/Todolists/TodolistItem/TodolistItem.styles.ts";
import Button from "@mui/material/Button";

type Props = {
  todolist: Todolist
}

export const FilterButtons = ({todolist}: Props) => {
  const {id, filter} = todolist

  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValues) => {
    dispatch(changeTodolistFilterAC({id, filter}))
  }

  return (
    <Box sx={containerSx}>
      <Button variant={filter === 'all' ? 'outlined' : 'text'}
              color={'inherit'}
              onClick={() => changeFilter('all')}>
        All
      </Button>
      <Button variant={filter === 'active' ? 'outlined' : 'text'}
              color={'primary'}
              onClick={() => changeFilter('active')}>
        Active
      </Button>
      <Button variant={filter === 'completed' ? 'outlined' : 'text'}
              color={'secondary'}
              onClick={() => changeFilter('completed')}>
        Completed
      </Button>
    </Box>
  )
}