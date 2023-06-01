import {v1} from 'uuid';
import {ActionType} from "../../store";

export type TodolistsReducerActionType =
  | ReturnType<typeof removeTodolistAC>
  | ReturnType<typeof addTodolistAC>
  | ReturnType<typeof changeTitleTodolistAC>
  | ReturnType<typeof changeFilterAC>

export type TodolistType = { id: string, title: string, filter: FilterValuesType }
export type FilterValuesType = 'All' | 'all' | 'Active' | 'Completed';

const initialState: TodolistType[] = []

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(todo => todo.id !== action.todolistID1);
        case 'ADD-TODOLIST':
            const newTodo: TodolistType = {
                id: action.todolistId,
                title: action.newTodolist,
                filter: 'all'
            };
            return [...state, newTodo];
        case 'CHANGE-TITLE-TODOLIST':
            return state.map(el => el.id === action.todolistID
              ? {...el, title: action.newTodolistTitle}
              : el)
        case "CHANGE-FILTER":
            return state.map((el) => el.id === action.todolistID
              ? {...el, filter: action.newFilter}
              : el)
        default:
            return state;
    }
};


//ActionCreators
export const removeTodolistAC = (todolistID1: string) => ({
    type: 'REMOVE-TODOLIST', todolistID1
} as const)

export const addTodolistAC = (newTodolist: string) => ({
    type: 'ADD-TODOLIST', newTodolist, todolistId: v1()
} as const)

export const changeTitleTodolistAC = (todolistID: string, newTodolistTitle: string) => ({
    type: 'CHANGE-TITLE-TODOLIST', todolistID, newTodolistTitle
} as const)

export const changeFilterAC = (todolistID: string, newFilter: FilterValuesType) => ({
    type: 'CHANGE-FILTER', todolistID, newFilter
} as const)

