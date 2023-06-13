import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreDecorator} from "../../store/ReduxStoreDecorator/ReduxStoreDecorator";
import React, {useState} from "react";
import styles from "./Task.module.css";
import {SuperCheckBox} from "../SuperCheckBox/SuperCheckBox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {action} from '@storybook/addon-actions';
import {TaskStatuses, TaskType} from "../../api/tasks -api/tasks-api";
import {useAppSelector} from "../../hooks/useSelector/useSelector";


const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    decorators: [ReduxStoreDecorator],
    parameters: {
        docs: {
            canvas: {sourceState: 'shown'},
        }
    },
}

export default meta;
type Story = StoryObj<typeof Task>;

type TaskReduxType = {
    todolistId: string
}


const TaskRedux = ({todolistId}: TaskReduxType) => {
    const task = useAppSelector<TaskType>(state => state.tasks[todolistId][1])
    const [status, setStatus] = useState(TaskStatuses.New)

    const changeCheckboxStatus = () => {
        if (status === TaskStatuses.Completed) {
            setStatus(TaskStatuses.New)
        } else {
            setStatus(TaskStatuses.Completed)
        }
    }

    return (
      <li className={status === TaskStatuses.Completed ? styles.isDoneTask : ''}>
          <SuperCheckBox
            callBack={changeCheckboxStatus}
            checked={status === TaskStatuses.Completed}/>

          <EditableSpan title={task.title}
                        callBack={action('Tasks\'s title was changing')}/>
          <IconButton aria-label="delete"
                      onClick={action('Task Removed')}>
              <DeleteIcon/>
          </IconButton>
      </li>
    )
}

export const TaskIsDone: Story = {
    render: () => <TaskRedux todolistId={'todolistId2'} />,
};

export const TaskNotIsDone: Story = {
    render: () => <TaskRedux todolistId={'todolistId1'}  />,
};


