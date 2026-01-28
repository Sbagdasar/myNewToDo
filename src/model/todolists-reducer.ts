import type {FilterValues, Todolist} from 'src/app/App.tsx'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: Todolist[] = []
export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodolist')
export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
  return {payload: {title, id: nanoid()}}
})
export const changeTodolistTitleAC = createAction<{ title: string, id: string }>('todolists/change_todolist_title')

export const changeTodolistFilterAC = createAction<{
  filter: FilterValues,
  id: string
}>('todolists/change_todolist_filter')
export const todolistsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteTodolistAC, (state, action) => {
      const index = state.findIndex(todolist => todolist.id === action.payload.id)
      if (index !== -1) {
        state.splice(index, 1)
      }
    })
    .addCase(createTodolistAC, (state, action) => {
      state.push({id: action.payload.id, title: action.payload.title, filter: 'all'})
    })
    .addCase(changeTodolistTitleAC, (state, action) => {
      const index = state.findIndex(todolist => todolist.id === action.payload.id)
      if (index !== -1) {
        state[index].title = action.payload.title
      }
    })
    .addCase(changeTodolistFilterAC, (state, action) => {
      const todolist = state.find(todolist => todolist.id === action.payload.id)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    })
})



