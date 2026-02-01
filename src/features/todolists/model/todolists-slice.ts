import { createAsyncThunk } from "@reduxjs/toolkit";
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts";
import { createAppSlice } from "@/common/utils";
import { setAppStatusAC } from "@/app/app-slice.ts";

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolist[],
  reducers: (create) => ({
    changeTodolistFilterAC: create.reducer<{
      id: string;
      filter: FilterValues;
    }>((state, action) => {
      const todolist = state.find(
        (todolist) => todolist.id === action.payload.id,
      );
      if (todolist) {
        todolist.filter = action.payload.filter;
      }
    }),
    fetchTodolistsTC: create.asyncThunk(
      async (_, { dispatch, rejectWithValue }) => {
        try {
          dispatch(setAppStatusAC({ status: "loading" }));
          const res = await todolistsApi.getTodolists();
          dispatch(setAppStatusAC({ status: "succeeded" }));
          return { todolists: res.data };
        } catch (error) {
          dispatch(setAppStatusAC({ status: "failed" }));
          return rejectWithValue(null);
        }
      },
      {
        fulfilled: (state, action) => {
          action.payload.todolists.forEach((tl) => {
            state.push({ ...tl, filter: "all" });
          });
        },
        rejected: (state, _) => {
          return state;
        },
      },
    ),
  }),
  extraReducers: (builder) => {
    builder
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const index = state.findIndex(
          (todolist) => todolist.id === action.payload.id,
        );
        if (index !== -1) {
          state[index].title = action.payload.title;
        }
      })
      .addCase(createTodolistTC.fulfilled, (state, action) => {
        state.push({
          ...action.payload,
          filter: "all",
        });
      })
      .addCase(deleteTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex(
          (todolist) => todolist.id === action.payload.id,
        );
        if (index !== -1) {
          state.splice(index, 1);
        }
      });
  },
  selectors: {
    selectTodolists: (state) => state,
  },
});

export const { changeTodolistFilterAC, fetchTodolistsTC } =
  todolistsSlice.actions;
export const { selectTodolists } = todolistsSlice.selectors;
export const todolistsReducer = todolistsSlice.reducer;

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (arg: { id: string; title: string }, thunkAPI) => {
    try {
      await todolistsApi.changeTodolistTitle({ id: arg.id, title: arg.title });
      return arg;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);
export const createTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/createTodolistTC`,
  async (title: string, thunkAPI) => {
    try {
      const res = await todolistsApi.createTodolist(title);
      return res.data.data.item;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export const deleteTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/deleteTodolistTC`,
  async (arg: { id: string }, thunkAPI) => {
    try {
      await todolistsApi.deleteTodolist(arg.id);
      return arg;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  },
);

export type Todolist = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type FilterValues = "all" | "active" | "completed";
export type DomainTodolist = Todolist & {
  filter: FilterValues;
};
