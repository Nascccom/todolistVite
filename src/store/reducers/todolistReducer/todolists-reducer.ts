import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";
import {todolistsAPI, TodolistType} from "../../../api/todolist-api/todolists-api";

export type TodolistDomainType = TodolistType & { filter: FilterValuesType }
export type FilterValuesType = 'All' | 'Active' | 'Completed';

export const todolistsReducer = createSlice({
    name: 'todolists',
    // {id: todolistId1, title: 'What to buy', order: 0, filter: 'All', addedDate: ''}
    initialState: [] as TodolistDomainType[],
    reducers: {
        removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
            return state.filter(todo => todo.id !== action.payload.todolistId);
        },
        addTodolist: (state, action) => {
            const newTodo: TodolistDomainType = {
                id: action.payload.todolistId,
                title: action.payload.newTodolist,
                addedDate: '',
                order: 0,
                filter: 'All'
            };
            return [...state, newTodo];
        },
        changeTodolistTitle: (state, action) => {
            state.map(el => el.id === action.payload.todolistID
              ? {...el, title: action.payload.newTodolistTitle}
              : el)
        },
        changeTodolistFilter: (state, action) => {
            return state.map((el) => el.id === action.payload.todolistID
              ? {...el, filter: action.payload.newFilter}
              : el)
        },
        setTodolists: (state, action) => {
            return action.payload.map((todo: TodolistType) => ({...todo, filter: 'All'}))
        }
    }
})

export const {
    removeTodolist,
    addTodolist,
    changeTodolistTitle,
    changeTodolistFilter,
    setTodolists
} = todolistsReducer.actions

export const getTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
          .then(res => {
              dispatch(setTodolists(res.data))
          })
    }
}
