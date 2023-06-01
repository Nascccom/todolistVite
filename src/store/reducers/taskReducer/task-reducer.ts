import {v1} from "uuid";
import {ActionType} from "../../store";

export type TasksReducerActionType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof changeToggleTaskAC>

export type TasksStateType = {
    [key: string]: TaskType[]
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            let filteredTasks = state[action.todolistId].filter(t => t.id !== action.taskId)
            return {
                ...state,
                [action.todolistId]: filteredTasks
            }
        case "ADD-TASK":
            const newTask = {id: v1(), title: action.valueTitle, isDone: false}
            return {
                ...state,
                [action.todolistID]:
                  [...state[action.todolistID], newTask]
            }
        case "CHANGE-TITLE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                  .map(el => el.id === action.taskId
                    ? {...el, title: action.newTitle}
                    : el)
            }
        case "CHANGE-TOGGLE-TASK":
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                  .map(el => el.id === action.taskID
                    ? {...el, isDone: action.checked}
                    : el)
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case "REMOVE-TODOLIST":
            let copyState = {...state}
            delete copyState[action.todolistID1]
            return copyState
        default:
            return state;
    }
};

//ActionCreators
export const removeTaskAC = (todolistId: string, taskId: string) => ({
    type: 'REMOVE-TASK', todolistId, taskId
} as const)

export const addTaskAC = (todolistID: string, valueTitle: string) => ({
    type: 'ADD-TASK', todolistID, valueTitle
} as const)

export const updateTaskAC = (todolistId: string, taskId: string, newTitle: string) => ({
    type: 'CHANGE-TITLE-TASK', todolistId, taskId, newTitle
} as const)

export const changeToggleTaskAC = (todolistID: string, taskID: string, checked: boolean) => ({
    type: 'CHANGE-TOGGLE-TASK', todolistID, taskID, checked
} as const)


