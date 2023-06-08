import {v1} from "uuid";
import {createSlice, Dispatch} from "@reduxjs/toolkit";
import {TodolistType} from "../../../api/todolist-api/todolists-api";
import {tasksAPI, TaskType} from "../../../api/tasks -api/tasks-api";

type TasksStateType = {
    [key: string]: TaskType[]
}

export const tasksReducer = createSlice({
    name: 'tasks',
    // 'd6a00fdd-2582-4ddb-8f28-2b3c1022784f': [{
    //     description: '', id: v1(), title: 'NJJJJ', completed: false, status: 0, priority: 0,
    //     startDate: '', deadline: '', todoListId: 'd6a00fdd-2582-4ddb-8f28-2b3c1022784f', order: 0, addedDate: ''
    // }]
    initialState: {} as TasksStateType,
    reducers: {
        removeTask: (state, action) => {
            let filteredTasks = state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            return {
                ...state,
                [action.payload.todolistId]: filteredTasks
            }
        },
        addTask: (state, action) => {
            const newTask = {id: v1(), title: action.payload.valueTitle, isDone: false}
            return {
                ...state,
                [action.payload.todolistID]:
                  [...state[action.payload.todolistID], newTask]
            }
        },
        changeTaskTitle: (state, action) => {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                  .map(el => el.id === action.payload.taskId
                    ? {...el, title: action.payload.newTitle}
                    : el)
            }
        },
        changeTaskToggle: (state, action) => {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID]
                  .map(el => el.id === action.payload.taskID
                    ? {...el, isDone: action.payload.checked}
                    : el)
            }
        },
        addTodolist: (state, action) => {
            return {
                ...state,
                [action.payload.todolistId]: []
            }
        },
        removeTodolist: (state, action) => {
            let copyState = {...state}
            delete copyState[action.payload.todolistID1]
            return copyState
        },
        setTodolists: (state, action) => {
            let copyState = {...state}
            action.payload.todolist.forEach((todo: TodolistType) => copyState[todo.id] = [])
            return copyState
        },
        setTasks: (state, action) => {
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            }
        }
    }
})

export const {
    removeTask,
    addTask,
    changeTaskTitle,
    changeTaskToggle,
    setTasks
} = tasksReducer.actions

export const getTasksTC = (todolistId: string) =>
  (dispatch: Dispatch) => {
      tasksAPI.getTasks(todolistId)
        .then(res => {
            dispatch(setTasks({todolistId, tasks: res.data.items}))
        })
  }

