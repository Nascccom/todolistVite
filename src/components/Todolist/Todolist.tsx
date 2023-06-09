import React, {memo, useCallback, useEffect, useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {InputLine} from "../InputLine/InputLine";
import {getTasksTC} from "../../store/reducers/taskReducer/task-reducer";
import {ButtonComponent} from "../Button/Button";
import {
    changeTodolistFilter,
    changeTodolistTitleTC, FilterValuesType, removeTodolistTC,
} from "../../store/reducers/todolistReducer/todolists-reducer";
import {Task} from "../Task/Task";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import ButtonGroup from "@mui/material/ButtonGroup";
import {useAppDispatch} from "../../hooks/useDispatch/useDispatch";
import {TaskType} from "../../api/tasks -api/tasks-api";
import {useAppSelector} from "../../hooks/useSelector/useSelector";

type PropsType = {
    todolistId: string
    title: string
    activeFilter: FilterValuesType
}

export const Todolist = memo(({todolistId, title, activeFilter}: PropsType) => {
    const tasks = useAppSelector<TaskType[]>(state => state.tasks[todolistId])
    const dispatch = useAppDispatch()
    const [activeButton, setActiveButton] = useState<FilterValuesType>('All')

    useEffect(() => {
        dispatch(getTasksTC(todolistId))
    }, [])


    const changeFilterHandler = useCallback((todolistId: string, filterValue: FilterValuesType) => {
        dispatch(changeTodolistFilter({todolistId, filterValue}))
        setActiveButton(filterValue)
    }, [dispatch])

    const deleteTodolistHandler = useCallback(() => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch, todolistId])

    const addTaskForTodolistHandler = useCallback((valueTitle: string) => {
        // dispatch(addTaskAC(props.todolistId, valueTitle))
    }, [dispatch, todolistId])

    const updateTodolistTitleHandler = useCallback((newTitleTodo: string) => {
        dispatch(changeTodolistTitleTC(todolistId, newTitleTodo))
    }, [dispatch, todolistId])

    const filteredTasks = () => {
        switch (activeFilter) {
            case 'Active':
                return tasks.filter(t => !t.completed);
            case 'Completed':
                return tasks.filter(t => t.completed);
            default:
                return tasks;
        }
    }

    const mappedTasks = filteredTasks()?.map(t => <Task key={t.id}
                                                        task={t}
                                                        todolistId={todolistId}/>)

    return (
      <div>
          <h3>
              <EditableSpan title={title}
                            callBack={updateTodolistTitleHandler}/>

              <IconButton aria-label="delete"
                          onClick={deleteTodolistHandler}>
                  <DeleteIcon/>
              </IconButton>
          </h3>
          <InputLine callBack={addTaskForTodolistHandler}/>

          <ul>
              {mappedTasks}
          </ul>

          <ButtonGroup size="large" variant="text" aria-label="large outlined button group" sx={ButtonGroupStyle}>
              <ButtonComponent buttonName={'All'}
                               color={activeButton === 'All' ? 'success' : "secondary"}
                               callBack={() => changeFilterHandler(todolistId, 'All')}/>
              <ButtonComponent buttonName={'Active'}
                               color={activeButton === 'Active' ? 'success' : "secondary"}
                               callBack={() => changeFilterHandler(todolistId, 'Active')}/>
              <ButtonComponent buttonName={'Completed'}
                               color={activeButton === 'Completed' ? 'success' : "secondary"}
                               callBack={() => changeFilterHandler(todolistId, 'Completed')}/>
          </ButtonGroup>
      </div>
    )
})

const ButtonGroupStyle = {
    display: "flex",
    justifyContent: "space-between",
    ".MuiButtonGroup-grouped:not(:last-of-type)": {
        border: 'none',
    }
}
