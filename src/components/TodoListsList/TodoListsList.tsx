import {useAppSelector} from "../../hooks/useSelector/useSelector";
import {TodolistDomainType} from "../../store/reducers/todolistReducer/todolists-reducer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "../Todolist/Todolist";

export const TodolistsList = () => {
    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)

    return (
      <>
          {todolists.map(todo => {
              return (
                <Grid item key={todo.id}>
                    <Paper style={{padding: '10px'}}>

                        <Todolist todolistId={todo.id}
                                  title={todo.title}
                                  activeFilter={todo.filter}/>

                    </Paper>
                </Grid>
              )
          })}
      </>
    )
}