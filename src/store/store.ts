import {tasksReducer} from "./reducers/taskReducer/task-reducer";
import {todolistsReducer} from "./reducers/todolistReducer/todolists-reducer";
import {configureStore} from "@reduxjs/toolkit";


// const rootReducer = combineReducers({
//     todolists: todolistsReducer,
//     tasks: tasksReducer
// })

export const store = configureStore({
    reducer: {
        todolists: todolistsReducer.reducer,
        tasks: tasksReducer.reducer
    },

})

// export type ActionType = TasksReducerActionType
export type AppRootStateType = ReturnType<typeof store.getState>


//@ts-ignore
window.store = store;