import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreDecorator} from "../../store/ReduxStoreDecorator/ReduxStoreDecorator";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeToggleTaskAC, removeTaskAC, TaskType, updateTaskAC} from "../../store/reducers/taskReducer/task-reducer";
import styles from "../Todolist/Todolist.module.css";
import {SuperCheckBox} from "../SuperCheckBox/SuperCheckBox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {AppRootStateType} from "../../store/store";
import {action} from '@storybook/addon-actions';


const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    decorators: [ReduxStoreDecorator],
    parameters: {
        docs: {
            canvas: { sourceState: 'shown' },
        }
    },
    argTypes: {

    }

}

export default meta;
type Story = StoryObj<typeof Task>;

type TaskReduxType = {
    todolistId: string
    callback?: () => void
}

const TaskRedux = ({todolistId, callback}: TaskReduxType) => {
    const task = useSelector<AppRootStateType, TaskType>(
      state => state.tasks[todolistId][1])
    const dispatch = useDispatch()

    const removeTaskHandler = () => {
        dispatch(removeTaskAC(todolistId, task.id))
    }

    const updateTaskTitleHandler = (newTitle: string) => {
        dispatch(updateTaskAC(todolistId, task.id, newTitle))
    }

    const changeCheckboxStatus = (checked: boolean) => {
        dispatch(changeToggleTaskAC(todolistId, task.id, checked))
    }

    return (
      <li className={task.isDone ? styles.isDone : ''}>
          <SuperCheckBox callBack={(checked) => changeCheckboxStatus(checked)}
                         checked={task.isDone}/>

          <EditableSpan title={task.title}
                        callBack={updateTaskTitleHandler}/>

          <IconButton aria-label="delete"
                      onClick={callback}>
              <DeleteIcon/>
          </IconButton>
      </li>
    )
}


export const TaskIsDone: Story = {
    render: () => <TaskRedux todolistId={'todolistId2'} callback={action('Task Removed')} />,
};

export const TaskNotIsDone: Story = {
    render: () => <TaskRedux todolistId={'todolistId1'} callback={action('Task Removed')} />,
};


