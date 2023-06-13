import React, {useEffect} from 'react'
import './App.css'
import Container from '@mui/system/Container';
import {ButtonAppBar} from "../components/ButtonAppBar/ButtonAppBar";
import {useAppDispatch} from "../hooks/useDispatch/useDispatch";
import {getTodolistsTC} from "../store/reducers/todolistReducer/todolists-reducer";
import {TodolistsList} from "../components/TodolistsList/TodolistsList";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    return (
      <div className="App">
          <ButtonAppBar/>

          <Container fixed>
              <TodolistsList/>
          </Container>

      </div>
    )
}


export default App
