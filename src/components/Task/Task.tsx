import React, {memo, useCallback} from 'react';
import styles from './../Todolist/Todolist.module.css'
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {changeToggleTaskAC, removeTaskAC, TaskType, updateTaskAC} from "../../store/reducers/taskReducer/task-reducer";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {SuperCheckBox} from "../SuperCheckBox/SuperCheckBox";

export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = memo((props: TaskPropsType) => {
    const dispatch = useDispatch()

    const removeTaskHandler = useCallback(() => {
        dispatch(removeTaskAC(props.todolistId, props.task.id))
    }, [dispatch, props.todolistId, props.task.id])

    const updateTaskTitleHandler = useCallback((newTitle: string) => {
        dispatch(updateTaskAC(props.todolistId,props.task.id, newTitle))
    }, [dispatch, props.todolistId, props.task.id])

    const changeCheckboxStatus = useCallback((checked: boolean) => {
        dispatch(changeToggleTaskAC(props.todolistId, props.task.id, checked))
    }, [ dispatch, props.todolistId, props.task.id])

    return (
      <li className={props.task.isDone ? styles.isDone : ''}>
          <SuperCheckBox callBack={(checked) => changeCheckboxStatus(checked)}
                         checked={props.task.isDone}/>

          <EditableSpan title={props.task.title}
                        callBack={updateTaskTitleHandler}/>

          <IconButton aria-label="delete"
                      onClick={removeTaskHandler}>
              <DeleteIcon/>
          </IconButton>
      </li>
    )
})