import React, {memo, useCallback, useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {useDispatch, useSelector} from "react-redux";
import {InputLine} from "../InputLine/InputLine";
import {addTaskAC, TaskType} from "../../store/reducers/taskReducer/task-reducer";
import {ButtonComponent} from "../Button/Button";
import {
    changeFilterAC,
    changeTitleTodolistAC,
    FilterValuesType,
    removeTodolistAC
} from "../../store/reducers/todolistReducer/todolists-reducer";
import {AppRootStateType} from "../../store/store";
import {Task} from "../Task/Task";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import ButtonGroup from "@mui/material/ButtonGroup";

export type PropsType = {
    todolistId: string
    title: string
    activeFilter: FilterValuesType
}

export const Todolist = memo((props: PropsType) => {

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])
    const dispatch = useDispatch()
    const [activeButton, setActiveButton] = useState<FilterValuesType>('All')

    const changeFilterButtonHandler = useCallback((todolistID: string, filterValue: FilterValuesType) => {
        dispatch(changeFilterAC(todolistID, filterValue))
        setActiveButton(filterValue)
    }, [dispatch])

    const deleteAllTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(props.todolistId))
    }, [dispatch, props.todolistId])

    const addTaskForTodolistHandler = useCallback((valueTitle: string) => {
        dispatch(addTaskAC(props.todolistId, valueTitle))
    }, [dispatch, props.todolistId])

    const updateTodolistHandler = useCallback((newTitleTodo: string) => {
        dispatch(changeTitleTodolistAC(props.todolistId, newTitleTodo))
    }, [dispatch, props.todolistId])

    const filteredTasks = (): TaskType[] => {
        let tasksForTodolist;
        switch (props.activeFilter) {
            case 'Active':
                return tasksForTodolist = tasks.filter(t => !t.isDone);
            case 'Completed':
                return tasksForTodolist = tasks.filter(t => t.isDone);
            default:
                return tasksForTodolist = tasks;
        }
    }

    const mappedTasks = filteredTasks().map(t => <Task key={t.id}
                                                       task={t}
                                                       todolistId={props.todolistId}/>)

    return (
      <div>
          <h3>
              <EditableSpan title={props.title}
                            callBack={updateTodolistHandler}/>

              <IconButton aria-label="delete"
                          onClick={deleteAllTodolistHandler}>
                  <DeleteIcon/>
              </IconButton>
          </h3>
          <InputLine callBack={addTaskForTodolistHandler}/>

          <ul>
              {mappedTasks}
          </ul>

          <ButtonGroup size="large" variant="text" aria-label="large outlined button group" sx={{
              display: "flex",
              justifyContent: "space-between",
              ".MuiButtonGroup-grouped:not(:last-of-type)": {
                  border: 'none',
              }
          }}>
              <ButtonComponent buttonName={'All'}

                               color={activeButton === 'All' ? 'success' : "secondary"}
                               callBack={() => changeFilterButtonHandler(props.todolistId, 'All')}/>
              <ButtonComponent buttonName={'Active'}
                               color={activeButton === 'Active' ? 'success' : "secondary"}
                               callBack={() => changeFilterButtonHandler(props.todolistId, 'Active')}/>
              <ButtonComponent buttonName={'Completed'}
                               color={activeButton === 'Completed' ? 'success' : "secondary"}
                               callBack={() => changeFilterButtonHandler(props.todolistId, 'Completed')}/>
          </ButtonGroup>
      </div>
    )
})
