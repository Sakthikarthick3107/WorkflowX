import { combineReducers, legacy_createStore as createStore , applyMiddleware } from "redux";
import { ThemeState, themeReducer } from "./theme/themeReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { TaskState, taskReducer } from "./task/taskReducer";
import { UIState, UiReducer } from "./UIManagement/UiReducer";
import { ProjectState, projectReducer } from "./project/projectReducer";

export interface RootState{
    theme : ThemeState,
    task : TaskState,
    ui : UIState,
    project : ProjectState
}

const middleware = [thunk];

const rootReducer = combineReducers({
    theme : themeReducer,
    task : taskReducer,
    ui : UiReducer,
    project :projectReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(...middleware)
    )
);

export default store;