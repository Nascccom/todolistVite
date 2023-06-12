import React, {useCallback, useEffect} from 'react'
import './App.css'
import Container from '@mui/system/Container';
import {ButtonAppBar} from "../components/ButtonAppBar/ButtonAppBar";
import Grid from '@mui/material/Grid';
import {InputLine} from "../components/InputLine/InputLine";
import {useAppDispatch} from "../hooks/useDispatch/useDispatch";
import {addTodolistTC, getTodolistsTC} from "../store/reducers/todolistReducer/todolists-reducer";
import {TodolistsList} from "../components/TodoListsList/TodoListsList";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    return (
      <div className="App">
          <ButtonAppBar/>

          <Container fixed>
              <Grid container sx={{justifyContent: 'center', marginTop: "30px"}}>
                  <InputLine callBack={addTodolist}/>
              </Grid>
              <Grid container spacing={5} sx={{justifyContent: 'center', marginTop: "20px"}}>

                  <TodolistsList/>

              </Grid>
          </Container>

      </div>
    )
}



export default App
