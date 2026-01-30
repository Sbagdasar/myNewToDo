import {Container, Grid} from "@mui/material";
import {CreateItemForm} from "@/CreateItemForm.tsx";
import {createTodolistAC} from "@/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Todolists} from "@/Todolists/Todolists.tsx";

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}



export type FilterValues = 'all' | 'active' | 'completed'


export const Main = () => {
  const dispatch = useAppDispatch();

  const createTodolist = (title: string) => {
    const action = createTodolistAC(title)
    dispatch(action)
  }

  return (
    <Container maxWidth={'lg'}>
      <Grid container sx={{mb: '30px'}}>
        <CreateItemForm onCreateItem={createTodolist}/>
      </Grid>
      <Grid container spacing={4}>
       <Todolists/>
      </Grid>
    </Container>
  );
};

