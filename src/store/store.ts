import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./reducers/taskReducer/task-reducer";
import {todolistsReducer} from "./reducers/todolistReducer/todolists-reducer";



const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = legacy_createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>


//@ts-ignore
window.store = store;