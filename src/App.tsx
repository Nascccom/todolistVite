import {useCallback, useEffect} from 'react'
import './App.css'
import Container from '@mui/system/Container';
import {ButtonAppBar} from "./components/ButtonAppBar/ButtonAppBar";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {InputLine} from "./components/InputLine/InputLine";
import {Todolist} from "./components/Todolist/Todolist";
import {useAppSelector} from "./hooks/useSelector/useSelector";
import {useAppDispatch} from "./hooks/useDispatch/useDispatch";
import {getTodolistsTC, TodolistDomainType} from "./store/reducers/todolistReducer/todolists-reducer";

function App() {
    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getTodolistsTC())
    }, [])

    const addTodolist = useCallback((title: string) => {
        // dispatch(addTodolistAC(title))
    }, [dispatch])

    return (
      <div className="App">
          <ButtonAppBar/>

          <Container fixed>
              <Grid container sx={{justifyContent: 'center', marginTop: "30px"}}>
                  <InputLine callBack={addTodolist}/>
              </Grid>
              <Grid container spacing={5} sx={{justifyContent: 'center', marginTop: "20px"}}>

                  {
                      todolists.map(todo => {

                          return (
                            <Grid item key={todo.id}>
                                <Paper style={{padding: '10px'}}>

                                    <Todolist todolistId={todo.id}
                                              title={todo.title}
                                              activeFilter={todo.filter}
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
