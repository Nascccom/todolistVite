import {useCallback} from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import {AppRootStateType} from "./store/store";
import {addTodolistAC, TodolistType} from "./store/reducers/todolistReducer/todolists-reducer";
import Container from '@mui/system/Container';
import {ButtonAppBar} from "./components/ButtonAppBar/ButtonAppBar";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {InputLine} from "./components/InputLine/InputLine";
import {Todolist} from "./components/Todolist/Todolist";


function App() {
  const todolist = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
  const dispatch = useDispatch()

  const addTodolist = useCallback((title: string) => {
    dispatch(addTodolistAC(title))
  }, [dispatch])

  return (
    <div className="App">
      <ButtonAppBar/>

      <Container fixed>
          <Grid container style={{margin: '20px auto', justifyContent: 'center',}}>
            <InputLine callBack={addTodolist}/>
          </Grid>
          <Grid container spacing={4}>

            {
              todolist.map(t => {
                return (
                  <Grid item key={t.id}>
                    <Paper style={{padding: '10px'}}>
                      <Todolist
                        todolistId={t.id}
                        title={t.title}
                        activeFilter={t.filter}
                      />
                    </Paper>
                  </Grid>
                )
              })
            }
          </Grid>
        </Container>

      </div>
  )
}

export default App
