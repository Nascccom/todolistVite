import React, {memo, useCallback} from 'react';
import styles from './Task.module.css'
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {SuperCheckBox} from "../SuperCheckBox/SuperCheckBox";
import {TaskType} from "../../api/tasks -api/tasks-api";
import {useAppDispatch} from "../../hooks/useDispatch/useDispatch";

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = memo(({task, todolistId}: TaskPropsType) => {
    const dispatch = useAppDispatch()

    const removeTaskHandler = useCallback(() => {
        //  dispatch(removeTaskAC(props.todolistId, props.task.id))
    }, [dispatch, todolistId, task.id])

    const updateTaskTitleHandler = useCallback((newTitle: string) => {
        //  dispatch(updateTaskAC(props.todolistId,props.task.id, newTitle))
    }, [dispatch, todolistId, task.id])

    const changeCheckboxStatus = useCallback((checked: boolean) => {
        //   dispatch(changeToggleTaskAC(props.todolistId, props.task.id, checked))
    }, [dispatch, todolistId, task.id])

    return (
      <li className={task.completed ? styles.isDoneTask : ''}>
          <SuperCheckBox callBack={(checked) => changeCheckboxStatus(checked)}
                         checked={task.completed}/>

          <EditableSpan title={task.title}
                        callBack={updateTaskTitleHandler}/>

          <IconButton aria-label="delete"
                      onClick={removeTaskHandler}>
              <DeleteIcon/>
          </IconButton>
      </li>
    )
})