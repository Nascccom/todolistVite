import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {TodolistType} from "../../../api/todolist-api/todolists-api";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType} from "../../../api/tasks -api/tasks-api";
import {AppRootStateType} from "../../store";

type TasksStateType = {
    [key: string]: TaskType[]
}

export const tasksReducer = createSlice({
    name: 'tasks',
    // 'd6a00fdd-2582-4ddb-8f28-2b3c1022784f': [{
    //     description: '', id: v1(), title: 'NJJJJ', status: 0, priority: 0, startDate: '', deadline: '',
    //     todoListId: 'd6a00fdd-2582-4ddb-8f28-2b3c1022784f', order: 0, addedDate: ''
    // }]
    initialState: {} as TasksStateType,
    reducers: {
        removeTask: (state,
                     action: PayloadAction<{ todolistId: string, taskId: string }>) => {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter((t: TaskType) => t.id !== action.payload.taskId)
            }
        },
        addTask: (state,
                  action: PayloadAction<{ todolistId: string, task: TaskType }>) => {
            return {
                ...state,
                [action.payload.todolistId]: [...state[action.payload.todolistId], action.payload.task]
            }
        },
        updateTask: (state,
                     action: PayloadAction<{ todolistId: string, task: TaskType }>) => {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                  .map(t => t.id === action.payload.task.id
                    ? {...t, ...action.payload.task}
                    : t)
            }
        },
        addTodolist: (state,
                      action: PayloadAction<{ todolist: TodolistType }>) => {
            return {
                ...state,
                [action.payload.todolist.id]: []
            }
        },
        removeTodolist: (state,
                         action: PayloadAction<{ todolistId: string }>) => {
            let copyState = {...state}
            delete copyState[action.payload.todolistId]
            return copyState
        },
        setTodolists: (state,
                       action: PayloadAction<TodolistType[]>) => {
            let copyState = {...state}
            action.payload.forEach((todo: TodolistType) => copyState[todo.id] = [])
            return copyState
        },
        setTasks: (state,
                   action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) => {
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
    updateTask,
    setTasks
} = tasksReducer.actions

//thunks
export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksAPI.getTasks(todolistId)
      .then(res => {
          const tasks = res.data.items
          dispatch(setTasks({todolistId, tasks}))
      })
}
export const removeTasksTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    tasksAPI.deleteTask(todolistId, taskId)
      .then(res => {
          if (res.data.resultCode === 0) {
              dispatch(removeTask({todolistId, taskId}))
          }
      })
}
export const addTasksTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    tasksAPI.createTask(todolistId, title)
      .then(res => {
          if (res.data.resultCode === 0) {
              const task = res.data.data.item
              dispatch(addTask({todolistId, task}))
          }
      })
}

export const updateTaskTC = (todolistId: string, taskId: string, changingPart: Object) =>
  (dispatch: Dispatch, getState: () => AppRootStateType) => {
      const state = getState()
      const task = state.tasks[todolistId].find(t => t.id === taskId)

      if (task) {
          const newModel: UpdateTaskModelType = {
              title: task.title,
              description: task.description,
              deadline: task.deadline,
              startDate: task.startDate,
              status: task.status,
              priority: task.priority,
              ...changingPart
          }

          tasksAPI.updateTask(todolistId, taskId, newModel)
            .then(res => {

                if (res.data.resultCode === 0) {
                    const updatedTask: TaskType = res.data.data.item
                    dispatch(updateTask({todolistId, task: updatedTask}))
                }
            })
      }

      if (!task) {
          console.warn('this task did not found')
      }


  }

//types
export type UpdateTaskModelType = {
    title: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
