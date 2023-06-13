import {useAppSelector} from "../../hooks/useSelector/useSelector";
import {addTodolistTC, TodolistDomainType} from "../../store/reducers/todolistReducer/todolists-reducer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {InputLine} from "../../components/InputLine/InputLine";
import React, {useCallback} from "react";
import {useAppDispatch} from "../../hooks/useDispatch/useDispatch";

export const TodolistsList = () => {
    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const dispatch = useAppDispatch()

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    return (
      <>
          <Grid container sx={{justifyContent: 'center', marginTop: "30px"}}>
              <InputLine callBack={addTodolist}/>
          </Grid>

          <Grid container spacing={5} sx={{justifyContent: 'center', marginTop: "20px"}}>
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
          </Grid>
      </>
    )
}