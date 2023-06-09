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
        addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            const todoWithFilter: TodolistDomainType = {
                ...action.payload.todolist,
                filter: 'All'
            }
            return [todoWithFilter, ...state];
        },
        changeTodolistTitle: (state,
                              action: PayloadAction<{ todolistId: string, newTitle: string }>) => {
            return state.map((todo: TodolistDomainType) => todo.id === action.payload.todolistId
              ? {...todo, title: action.payload.newTitle}
              : todo)
        },
        changeTodolistFilter: (state,
                               action: PayloadAction<{ todolistId: string, filterValue: FilterValuesType }>) => {
            return state.map((el) => el.id === action.payload.todolistId
              ? {...el, filter: action.payload.filterValue}
              : el)
        },
        setTodolists: (state, action: PayloadAction<TodolistType[]>) => {
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

export const getTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsAPI.getTodolists()
      .then(res => {
          dispatch(setTodolists(res.data))
      })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.removeTodolist(todolistId)
      .then(res => {
          if (res.data.resultCode === 0) {
              dispatch(removeTodolist({todolistId}))
          }
      })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
      .then(res => {
          if (res.data.resultCode === 0) {
              dispatch(addTodolist({todolist: res.data.data.item}))
          }
      })
}

export const changeTodolistTitleTC = (todolistId: string, newTitle: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolistTittle(todolistId, newTitle)
      .then(res => {
          if (res.data.resultCode === 0) {
              console.log(res.data)
              dispatch(changeTodolistTitle({todolistId, newTitle}))
          }
      })
}

