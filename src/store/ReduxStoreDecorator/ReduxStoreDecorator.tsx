import {Provider} from "react-redux";
import {AppRootStateType} from "../store";
import React from "react";
import {v1} from "uuid";
import {applyMiddleware, combineReducers, legacy_createStore} from "@reduxjs/toolkit";
import {TaskPriorities, TaskStatuses} from "../../api/tasks -api/tasks-api";
import {tasksReducer} from "../reducers/taskReducer/task-reducer";
import {todolistsReducer} from "../reducers/todolistReducer/todolists-reducer";
import thunk from 'redux-thunk';


const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'All', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'All', addedDate: '', order: 0}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(), title: 'HTML&CSS', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: '', description: ''
            },
            {
                id: v1(), title: 'React', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId1', order: 0, addedDate: '', description: ''
            },
        ],
        ['todolistId2']: [
            {
                id: v1(), title: 'Milk', status: TaskStatuses.Completed, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '', description: ''
            },
            {
                id: v1(), title: 'Coffee', status: TaskStatuses.New, priority: TaskPriorities.Low,
                startDate: '', deadline: '', todoListId: 'todolistId2', order: 0, addedDate: '', description: ''
            },
        ],
    }
}

export const storyBookStore = legacy_createStore(combineReducers(
  {
      todolists: todolistsReducer.reducer,
      tasks: tasksReducer.reducer
  }), initialGlobalState, applyMiddleware(thunk)
)

export const ReduxStoreDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
};